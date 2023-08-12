import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import {appMiddlewareReservaVerify, appDTODataReserva, appDTOParamReserva} from '../middleware/reservamiddleware.js';
import { Reserva } from '../dtocontroller/reserva.js';
let storageReserva = Router();

let db = await coneccion();
let reserva = db.collection("reserva");

storageReserva.get('/:id?', limitGet(), appMiddlewareReservaVerify ,  async(req, res)=>{

    if(!req.rateLimit) return;
    let result = (!req.params.id)     
    ? await reserva.find({}).toArray()
    : await reserva.find({ "ID_Reserva": parseInt(req.params.id)}).toArray();
    res.send(result);
});

storageReserva.post("/", limitGet(), appMiddlewareReservaVerify, appDTODataReserva, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await reserva.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Sucursal);

        res.send(err);
    }
});
storageReserva.put("/:id?", limitGet(), appMiddlewareReservaVerify, appDTODataReserva , appDTOParamReserva, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la reserva a modificar."})
    }else{
        try{
            let result = await reserva.updateOne(
                { "ID_Reserva": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageReserva.delete("/:id?", limitGet(), appMiddlewareReservaVerify, appDTOParamReserva, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la reserva a eliminar."})
    } else {
        try{
            let result = await reserva.deleteOne(
                { "ID_Reserva": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageReserva;