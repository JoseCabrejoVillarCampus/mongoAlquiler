import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareEmpleadoVerify, appDTODataEmpleado, appDTOParamEmpleado} from '../middleware/empleadomiddleware.js';
import { Empleado } from '../dtocontroller/empleado.js';
let storageEmpleado = Router();

let db = await coneccion();
let empleado = db.collection("empleado");

storageEmpleado.get('/:id?', limitGet(), appMiddlewareEmpleadoVerify ,  async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await empleado.find({}).toArray()
    : await empleado.find({ "ID_Empleado": parseInt(req.params.id)}).toArray();
    res.send(result);
});

storageEmpleado.post("/", limitGet(), appMiddlewareEmpleadoVerify , appDTODataEmpleado, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await empleado.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Sucursal);

        res.send(err);
    }
});
storageEmpleado.put("/:id?", limitGet(), appMiddlewareEmpleadoVerify, appDTODataEmpleado , appDTOParamEmpleado, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del empleado a modificar."})
    }else{
        try{
            let result = await empleado.updateOne(
                { "ID_Empleado": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageEmpleado.delete("/:id?", limitGet(), appMiddlewareEmpleadoVerify, appDTOParamEmpleado, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del empleado a eliminar."})
    } else {
        try{
            let result = await empleado.deleteOne(
                { "ID_Empleado": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageEmpleado;