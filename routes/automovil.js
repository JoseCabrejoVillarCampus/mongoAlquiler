import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareAutomovilVerify, appDTODataAutomovil, appDTOParamAutomovil} from '../middleware/automovilmiddleware.js';
import { Automovil } from '../dtocontroller/automovil.js';
let storageAutomovil = Router();

let db = await coneccion();
let automovil = db.collection("automovil");

storageAutomovil.use(expressQueryBoolean());

const getAutomovilById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await automovil.aggregate([
            {
                $match: { "ID_Automovil": parseInt(id) }
            },
            {
                $project: {
                    "_id": 0,
                    "car": "$ID_Automovil",
                    "brand": "$Marca",
                    "model": "$Modelo",
                    "year": "$Anio",
                    "tipe": "$Tipo",
                    "stalls": "$Capacidad",
                    "price": "$Precio_Diario"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getAutomovilByCap = (capacidad)=>{
    return new Promise(async(resolve)=>{
        let result = await automovil.aggregate([
            {
                $match: { "Capacidad": {
                    $gt: parseInt(capacidad)
                } }
            },
            {
                $project: {
                    "_id": 0,
                    "car": "$ID_Automovil",
                    "brand": "$Marca",
                    "model": "$Modelo",
                    "year": "$Anio",
                    "tipe": "$Tipo",
                    "stalls": "$Capacidad",
                    "price": "$Precio_Diario"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getAutomovilByCapDis = (capdisponible)=>{
    return new Promise(async(resolve)=>{
        let result = await automovil.aggregate([{
            $match: {
                Capacidad: parseInt(capdisponible)
            }
        },
        {
            $lookup: {
                from: "alquiler",
                localField: "ID_Automovil",
                foreignField: "ID_Automovil_id",
                as: "alquileres_FK"
            }
        },
        {
            $project: {
                "_id": 0,
                "Precio_Diario": 0,
                "Anio": 0,
                "Tipo": 0,
            }
        },
        {
            $match: {
                "alquileres_FK.Estado": "Disponible"
            }
        },
        {
            $project: {
                "car": "$ID_Automovil",
                "brand": "$Marca",
                "model": "$Modelo",
                "stalls": "$Capacidad"
            }
        },
    ]).toArray();
    resolve(result);
    })
};
const getAutomovilAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await automovil.aggregate([
            {
                $project: {
                    "_id": 0,
                    "car": "$ID_Automovil",
                    "brand": "$Marca",
                    "model": "$Modelo",
                    "year": "$Anio",
                    "tipe": "$Tipo",
                    "stalls": "$Capacidad",
                    "price": "$Precio_Diario"
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getAutomovilOrder = ()=>{
    return new Promise(async(resolve)=>{
        let result = await automovil.aggregate([
            { $match: { Tipo: "suv" } }, 
            {
                $project: {
                    "_id": 0,
                    "car": "$ID_Automovil",
                    "brand": "$Marca",
                    "model": "$Modelo",
                    "year": "$Anio",
                    "tipe": "$Tipo",
                    "stalls": "$Capacidad",
                    "price": "$Precio_Diario"
                }
            },
            {
                $group: {
                    _id: "$brand",
                    automoviles: {
                    $push: "$$ROOT"
                    }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "marca_auto": "$_id",
                    "automoviles": "$automoviles",
                    
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageAutomovil.get("/", limitGet() ,appMiddlewareAutomovilVerify ,async(req, res)=>{
    try{
        const {id, capacidad , capdisponible} = req.query;
        if(id){
            const data = await getAutomovilById(id);
            res.send(data)
        }else if(capacidad) {
            const data = await getAutomovilByCap(capacidad);
            res.send(data);
        } else if (capdisponible) {
            const data = await getAutomovilByCapDis(capdisponible);
            res.send(data);
        }else {
            const data = await getAutomovilAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
storageAutomovil.get("/order", limitGet() ,appMiddlewareAutomovilVerify ,async(req, res)=>{
    try{
            const data = await getAutomovilOrder();
            res.send(data);
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
storageAutomovil.post('/', limitGet(), appMiddlewareAutomovilVerify, appDTODataAutomovil, async(req, res) => {
    if(!req.rateLimit) return;
    try {
        let result = await automovil.insertOne(req.body);
        console.log(result);
        res.send("automovil Ingresado");
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Automovil);

        res.send(err);
    }
});
storageAutomovil.put("/:id?", limitGet(), appMiddlewareAutomovilVerify, appDTODataAutomovil , appDTOParamAutomovil, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del automovil a modificar."})
    }else{
        try{
            let result = await automovil.updateOne(
                { "ID_Automovil": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageAutomovil.delete("/:id?", limitGet(), appMiddlewareAutomovilVerify, appDTOParamAutomovil, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del automovil a eliminar."})
    } else {
        try{
            let result = await automovil.deleteOne(
                { "ID_Automovil": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
export default storageAutomovil;