import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { Reserva } from '../dtocontroller/reserva.js';
import { validate } from 'class-validator';
import { Router } from "express";
const appMiddlewareReservaVerify = Router();
const appDTODataReserva = Router();


appMiddlewareReservaVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data;
    const{ iat, exp, ...newPayload } = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(Reserva, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    if(!verify) res.status(406).send({status: 406, message: "No Autorizado"})
    next();
});
appDTODataReserva.use( async(req,res,next)=>{
    try {
        let data = plainToClass(Reserva, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data= undefined;
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
})

export { 
    appMiddlewareReservaVerify,
    appDTODataReserva
};