import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareClienteVerify, appDTODataCliente, appDTOParamCliente} from '../middleware/clientemiddleware.js';
import { Cliente } from '../dtocontroller/cliente.js';
let storageCliente = Router();

let db = await coneccion();
let cliente = db.collection("cliente");

storageCliente.get('/:id?', limitGet(), appMiddlewareClienteVerify ,  async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await cliente.find({}).toArray()
    : await cliente.find({ "ID_Cliente": parseInt(req.params.id)}).toArray();
    res.send(result);
});

storageCliente.post("/", limitGet(), appMiddlewareClienteVerify, appDTODataCliente, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await cliente.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Sucursal);

        res.send(err);
    }
});
storageCliente.put("/:id?", limitGet(), appMiddlewareClienteVerify, appDTODataCliente , appDTOParamCliente, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del cliente a modificar."})
    }else{
        try{
            let result = await cliente.updateOne(
                { "ID_Cliente": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageCliente.delete("/:id?", limitGet(), appMiddlewareClienteVerify, appDTOParamCliente, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del cliente a eliminar."})
    } else {
        try{
            let result = await cliente.deleteOne(
                { "ID_Cliente": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageCliente;