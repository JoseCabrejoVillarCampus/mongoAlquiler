import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareSucuAutomovilVerify, appDTODataSucuAutomovil, appDTOParamSucuAutomovil} from '../middleware/sucursal_automovilmiddleware.js';
import { SucuAutomovil } from '../dtocontroller/sucursal_automovil.js';
import { Automovil } from '../dtocontroller/automovil.js';
let storageSucuAutomovil = Router();

let db = await coneccion();
let sucursal_automovil = db.collection("sucursal_automovil");

storageSucuAutomovil.get('/:id?', limitGet(), appMiddlewareSucuAutomovilVerify ,  async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await sucursal_automovil.find({}).toArray()
    : await sucursal_automovil.find({ "ID_Sucursal_id": parseInt(req.params.id)}).toArray();
    res.send(result); 
});

storageSucuAutomovil.post("/", limitGet(), appMiddlewareSucuAutomovilVerify, appDTODataSucuAutomovil, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await sucursal_automovil.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Automovil);

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