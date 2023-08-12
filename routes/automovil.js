import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareAutomovilVerify, appDTODataAutomovil, appDTOParamAutomovil} from '../middleware/automovilmiddleware.js';
import { Automovil } from '../dtocontroller/automovil.js';
let storageAutomovil = Router();

let db = await coneccion();
let automovil = db.collection("automovil");

storageAutomovil.get('/:id?', limitGet(), appMiddlewareAutomovilVerify, async(req, res)=>{
    
    if(!req.rateLimit) return;
    let result = (!req.params.id)
    ? await automovil.find({}).toArray()
    : await automovil.find({ "ID_Automovil": parseInt(req.params.id)}).toArray();
    res.send(result)
});

storageAutomovil.post('/', limitGet(), appMiddlewareAutomovilVerify, appDTODataAutomovil, async(req, res) => {
    if(!req.rateLimit) return;
    try {
        let result = await automovil.insertOne(req.body);
        console.log(result);
        res.send("automovil Ingresado");
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Sucursal);

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