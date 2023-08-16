import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareAlquilerVerify, appDTODataAlquiler, appDTOParamAlquiler} from '../middleware/alquilermiddleware.js';
import { processErrors } from '../common/Functions.js';
import { Alquiler } from '../dtocontroller/alquiler.js';
let storageAlquiler = Router();

let db = await coneccion();
let alquiler = db.collection("alquiler");

storageAlquiler.use(expressQueryBoolean());

const getAlquilerById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await alquiler.find({
                ID_Alquiler: parseInt(id)
        }).toArray();
    resolve(result);
    })
};
const getCostoTotalById = (costo)=>{
    return new Promise(async(resolve)=>{
        let result = await alquiler.aggregate([
            {
                $project: {
                    _id: 0,
                    ID_Automovil_id: 0,
                    Fecha_Inicio:0,
                    Fecha_Fin: 0,
                    Estado: 0
                }
            },
            {
                $match: {
                    "ID_Alquiler": {$eq: parseInt(costo)}
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getAlquilerEstado = (estado)=>{
    return new Promise(async(resolve)=>{
        let result = await alquiler.find({
            Estado: estado
        }).toArray();
        resolve(result);
    })
};
const getAlquilerByFecha = (date)=>{
    return new Promise(async(resolve)=>{
        console.log(date);
        let result = await alquiler.find({Fecha_Inicio: date}).toArray(); 
        resolve(result);
    })
};
const getAlquilerTotal = ()=>{
    return new Promise(async(resolve)=>{
        let result = await alquiler.aggregate([
            {$count: 'ID_Alquiler'},
            {
                $project: {
                    'Total de Alquileres' : '$ID_Alquiler'
                }
            }
        ]).toArray();
        resolve(result);
    })
};
const getAlquilerAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await alquiler.find({}).toArray();
        resolve(result);
    })
};
const getAlquilerDateBetween = () => {
    return new Promise(async (resolve) => {
        const startDate = new Date("2023-09-02T05:00:00Z");
        const endDate = new Date("2023-11-13T05:00:00Z");

        let result = await alquiler.find({
            Fecha_Inicio: {
                $gte: startDate,
                $lte: endDate
            }
        }).toArray();

        resolve(result);
    });
};

storageAlquiler.get("/", limitGet() ,appMiddlewareAlquilerVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id , estado, costo, date } = req.query;
        if(id){
            const data = await getAlquilerById(id);
            res.send(data)
        }else if (estado) {
            const data = await getAlquilerEstado(estado);
            res.send(data);
        }else if (costo) {
            const data = await getCostoTotalById(costo);
            res.send(data);
        }else if (date) {
            const data = await getAlquilerByFecha(date);
            res.send(data);
        }else {
            const data = await getAlquilerAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});
storageAlquiler.get("/total", limitGet() ,appMiddlewareAlquilerVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const data = await getAlquilerTotal();
        res.send(data)
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});
storageAlquiler.get("/datesbetween", limitGet() ,appMiddlewareAlquilerVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const data = await getAlquilerDateBetween();
        res.send(data)
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});
storageAlquiler.post('/', limitGet(), appMiddlewareAlquilerVerify, appDTODataAlquiler , async(req, res) => {
    if(!req.rateLimit) return;
    try{
        let result = await alquiler.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Alquiler);

        res.send(err);
    }
});
storageAlquiler.put("/:id?", limitGet(), appMiddlewareAlquilerVerify, appDTODataAlquiler , appDTOParamAlquiler, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del alquiler a modificar."})
    }else{
        try{
            let result = await alquiler.updateOne(
                { "ID_Alquiler": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageAlquiler.delete("/:id?", limitGet(), appMiddlewareAlquilerVerify, appDTOParamAlquiler, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del alquiler a eliminar."})
    } else {
        try{
            let result = await alquiler.deleteOne(
                { "ID_Alquiler": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
}); 
export default storageAlquiler;