import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareAlquilerVerify, appDTODataAlquiler, appDTOParamAlquiler} from '../middleware/alquilermiddleware.js';
import { processErrors } from '../common/Functions.js';
import { Alquiler } from '../dtocontroller/alquiler.js';
let storageAlquiler = Router();

let db = await coneccion();
let alquiler = db.collection("alquiler");

storageAlquiler.get('/:id?', limitGet(), appMiddlewareAlquilerVerify ,async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)
    ? await alquiler.find({}).toArray()
    : await alquiler.find({ "ID_Alquiler": parseInt(req.params.id)}).toArray();
    res.send(result)
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