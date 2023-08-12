import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareRegisEntVerify, appDTODataRegisEnt, appDTOParamRegisEnt} from '../middleware/registro_entregamiddleware.js';
import { RegisEnt } from '../dtocontroller/registro_entrega.js';
let storageRegisEnt = Router();

let db = await coneccion();
let registro_entrega = db.collection("registro_entrega");

storageRegisEnt.get('/:id?', limitGet(), appMiddlewareRegisEntVerify ,async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)
    ? await registro_entrega.find({}).toArray()
    : await registro_entrega.find({"ID_Registro": parseInt(req.params.id)}).toArray();
    res.send(result)
});

storageRegisEnt.post('/', limitGet(), appMiddlewareRegisEntVerify, appDTODataRegisEnt , async(req, res) => {

    if(!req.rateLimit) return;
    try {
        let result = await registro_entrega.insertOne(req.body);
        console.log(result);
        res.send("registro_entrega Ingresado");
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, RegisEnt);

        res.send(err);
    }
});
storageRegisEnt.put("/:id?", limitGet(), appMiddlewareRegisEntVerify, appDTODataRegisEnt, appDTOParamRegisEnt, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del registro a modificar."})
    }else{
        try{
            let result = await registro_entrega.updateOne(
                { "ID_Registro": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageRegisEnt.delete("/:id?", limitGet(), appMiddlewareRegisEntVerify, appDTOParamRegisEnt, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del registro a eliminar."})
    } else {
        try{
            let result = await registro_entrega.deleteOne(
                { "ID_Registro": parseInt(req.params.id)}
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageRegisEnt;