import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareRegisDevoVerify, appDTODataRegisDevo, appDTOParamRegisDevo} from '../middleware/registro_devolucionmiddleware.js';
import { RegisDevo } from '../dtocontroller/registro_devolucion.js';
let storageRegisDevo = Router();

let db = await coneccion();
let registro_devolucion = db.collection("registro_devolucion");

storageRegisDevo.get('/:id?', limitGet(), appMiddlewareRegisDevoVerify, async(req, res)=>{
    
    if(!req.rateLimit) return;
    let result = (!req.params.id)
    ? await registro_devolucion.find({}).toArray()
    : await registro_devolucion.find({"ID_Registro": parseInt(req.params.id)}).toArray();
    res.send(result)
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