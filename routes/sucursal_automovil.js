import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareSucuAutomovilVerify, appDTODataSucuAutomovil, appDTOParamSucuAutomovil} from '../middleware/sucursal_automovilmiddleware.js';
import { SucuAutomovil } from '../dtocontroller/sucursal_automovil.js';
import { Automovil } from '../dtocontroller/automovil.js';
let storageSucuAutomovil = Router();

let db = await coneccion();
let sucursal_automovil = db.collection("sucursal_automovil");

storageSucuAutomovil.use(expressQueryBoolean());

const getSucuAutomovilById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await sucursal_automovil.aggregate([
            {
                $match: { "ID_Sucursal_id": parseInt(id) }
            },
            {
                $project: {
                    "_id": 0,
                    "branchID": "$ID_Sucursal_id",
                    "carID": "$ID_Automovil_id",
                    "quantity_available": "$Cantidad_Disponible"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

const getSucuAutoDisponible = ()=>{
    return new Promise(async(resolve)=>{
        let result = await sucursal_automovil.aggregate([{
            $lookup: {
                from: "sucursal",
                localField: "ID_Sucursal_id",
                foreignField: "ID_Sucursal",
                as: "sucursal_FK"
            }
        },
        {
            $unwind: "$sucursal_FK"
        },
        {
            $group: {
                _id: "$_id",
                Cantidad_Disponible: {
                    $first: "$Cantidad_Disponible"
                },
                sucursal_FK: {
                    $push: "$sucursal_FK"
                }
            }
        },
        {
            $addFields: {
                "ID_Sucursal": "$sucursal_FK.ID_Sucursal",
                "Nombre": "$sucursal_FK.Nombre",
                "Direccion": "$sucursal_FK.Direccion",
                "Telefono": "$sucursal_FK.Telefono",
            }
        },
        {
            $project: {
                "_id": 0,
                "branchID": "$ID_Sucursal",
                "name": "$Nombre",
                "address": "$Direccion",
                "phonenumber": "$Telefono", 
            }
        },
    ]).toArray();
        resolve(result);
    })
};

const getSucuAutomovilAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await sucursal_automovil.aggregate([
            {
                $project: {
                    "_id": 0,
                    "branchID": "$ID_Sucursal_id",
                    "carID": "$ID_Automovil_id",
                    "quantity_available": "$Cantidad_Disponible"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getSucuAutomovilAddress = () => {
    return new Promise(async (resolve) => {
        let result = await sucursal_automovil.aggregate([
            {
                $lookup: {
                    from: "sucursal",
                    localField: "ID_Sucursal_id",
                    foreignField: "ID_Sucursal",
                    as: "sucursal_FK"
                },
            },
            {
                $unwind: "$sucursal_FK"
            },
            {
                $project: {
                    "ID_Automovil_id": 0,
                    "sucursal_FK._id": 0,
                    "sucursal_FK.ID_Sucursal": 0,
                    "sucursal_FK.Telefono": 0,
                }
            },
            {
                $group: {
                    _id: "$sucursal_FK.Nombre",
                    Cantidad_Disponible: {
                        $sum: "$Cantidad_Disponible"
                    },
                    sucursal_FK: {
                        $first: "$sucursal_FK"
                    }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "brand": "$_id", 
                    "quantity_available":"$Cantidad_Disponible",
                    "address": "$sucursal_FK.Direccion" 
                }
            }
        ]).toArray();
        resolve(result);
    })
};


storageSucuAutomovil.get("/", limitGet() ,appMiddlewareSucuAutomovilVerify ,async(req, res)=>{
    try{
        const {id} = req.query;
        if(id){
            const data = await getSucuAutomovilById(id);
            res.send(data)
        } else {
            const data = await getSucuAutomovilAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
storageSucuAutomovil.get("/disponibilidad", limitGet() ,appMiddlewareSucuAutomovilVerify ,async(req, res)=>{
    try {
        const data = await getSucuAutoDisponible();
            res.send(data);
    } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
storageSucuAutomovil.get("/direccion", limitGet() ,appMiddlewareSucuAutomovilVerify ,async(req, res)=>{
    try {
        const data = await getSucuAutomovilAddress();
            res.send(data);
    } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});

storageSucuAutomovil.post("/", limitGet(), appMiddlewareSucuAutomovilVerify, appDTODataSucuAutomovil, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await sucursal_automovil.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, SucuAutomovil);

        res.send(err);
    }
});
storageSucuAutomovil.put("/:id?", limitGet(), appMiddlewareSucuAutomovilVerify, appDTODataSucuAutomovil , appDTOParamSucuAutomovil, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal_automovil a modificar."})
    }else{
        try{
            let result = await sucursal.updateOne(
                { "ID_Sucursal_id": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageSucuAutomovil.delete("/:id?", limitGet(), appMiddlewareSucuAutomovilVerify, appDTOParamSucuAutomovil, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal_automovil a eliminar."})
    } else {
        try{
            let result = await sucursal_automovil.deleteOne(
                { "ID_Sucursal_id": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageSucuAutomovil;