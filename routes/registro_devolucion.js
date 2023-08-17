import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareRegisDevoVerify, appDTODataRegisDevo, appDTOParamRegisDevo} from '../middleware/registro_devolucionmiddleware.js';
import { RegisDevo } from '../dtocontroller/registro_devolucion.js';
let storageRegisDevo = Router();

let db = await coneccion();
let registro_devolucion = db.collection("registro_devolucion");

storageRegisDevo.use(expressQueryBoolean());

const getRegisDevoById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await registro_devolucion.aggregate([
            {
                $match: { "ID_Registro": parseInt(id) }
            },
            {
                $project: {
                    "_id": 0,
                    "record": "$ID_Registro",
                    "renID": "$ID_Alquiler_id",
                    "employees": "$ID_Empleado_id",
                    "return_date": "$Fecha_Devolucion",
                    "fuel_returned": "$Combustible_Devuelto",
                    "mileage_returned": "$Kilometraje_Devuelto",
                    "additional_amount": "$Monto_Adicional"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getRegisDevoAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await registro_devolucion.aggregate([
            {
                $project: {
                    "_id": 0,
                    "record": "$ID_Registro",
                    "renID": "$ID_Alquiler_id",
                    "employees": "$ID_Empleado_id",
                    "return_date": "$Fecha_Devolucion",
                    "fuel_returned": "$Combustible_Devuelto",
                    "mileage_returned": "$Kilometraje_Devuelto",
                    "additional_amount": "$Monto_Adicional"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getRegisDevoAlmostOneAlquiler = ()=>{
    return new Promise(async(resolve)=>{
        let result = await registro_devolucion.aggregate([{
            $lookup: {
                from: "alquiler",
                localField: "ID_Alquiler_id",
                foreignField: "ID_Alquiler",
                as: "alquiler_FK",
            }
        },
        {
            $unwind: "$alquiler_FK"
        },
        {
            $lookup: {
                from: "cliente",
                localField: "alquiler_FK.ID_Cliente_id",
                foreignField: "ID_Cliente",
                as: "cliente_FK",
            }
        },
        {
            $group: {
                _id: "$_id",
                ID_Registro: {
                    $first: "$ID_Registro"
                },
                ID_Alquiler_id: {
                    $first: "$ID_Alquiler_id"
                },
                ID_Empleado_id: {
                    $first: "$ID_Empleado_id"
                },
                Fecha_Devolucion: {
                    $first: "$Fecha_Devolucion"
                },
                Combustible_Devuelto: {
                    $first: "$Combustible_Devuelto"
                },
                Kilometraje_Devuelto: {
                    $first: "$Kilometraje_Devuelto"
                },
                Monto_Adicional: {
                    $first: "$Monto_Adicional"
                },
                alquiler_FK: {
                    $first: "$alquiler_FK"
                },
                cliente_FK: {
                    $first: "$cliente_FK"
                }
            }
        },
        {
            $project: {
                "_id": 0,
                "record": "$ID_Registro",
                "renID": "$ID_Alquiler_id",
                "employees": "$ID_Empleado_id",
                "Rent": {
                    "rentID": "$alquiler_FK.ID_Alquiler",
                },
                "Cliente": {
                    "client": "$cliente_FK.ID_Cliente",
                    "name": "$cliente_FK.Nombre",
                    "surname": "$cliente_FK.Apellido",
                    "identification": "$cliente_FK.DNI",
                }
            }
        },
    ]).toArray();
        resolve(result);
    })
};

storageRegisDevo.get("/", limitGet() ,appMiddlewareRegisDevoVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id} = req.query;
        if(id){
            const data = await getRegisDevoById(id);
            res.send(data)
        }else {
            const data = await getRegisDevoAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});
storageRegisDevo.get("/almostonerent", limitGet() ,appMiddlewareRegisDevoVerify ,async(req, res)=>{
    try{
            const data = await getRegisDevoAlmostOneAlquiler();
            res.send(data);
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});

storageRegisDevo.post('/', limitGet(), appMiddlewareRegisDevoVerify, appDTODataRegisDevo, async(req, res) => {
    if(!req.rateLimit) return;
    try {
        let result = await registro_devolucion.insertOne(req.body);
        res.status(201).send(result);
    } catch (error) {
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, RegisDevo);

        res.send(err);
    }
});
storageRegisDevo.put("/:id?", limitGet(), appMiddlewareRegisDevoVerify, appDTODataRegisDevo , appDTOParamRegisDevo, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del registro a modificar."})
    }else{
        try{
            let result = await registro_devolucion.updateOne(
                { "ID_Registro": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageRegisDevo.delete("/:id?", limitGet(), appMiddlewareRegisDevoVerify, appDTOParamRegisDevo, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del registro a eliminar."})
    } else {
        try{
            let result = await registro_devolucion.deleteOne(
                { "ID_Registro": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageRegisDevo;