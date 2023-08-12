import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { SucuAutomovil } from '../dtocontroller/sucursal_automovil.js';
import { validate } from 'class-validator';
import { Router } from "express";
const appMiddlewareSucuAutomovilVerify = Router();
const appDTODataSucuAutomovil = Router();


appMiddlewareSucuAutomovilVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data; 
    const{ iat, exp, ...newPayload } = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(SucuAutomovil, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);

    console.log(payload);
    console.log(clone);

    if(!verify) res.status(406).send({status: 406, message: "No Autorizado"})
    next();
});

appDTODataSucuAutomovil.use( async(req,res,next)=>{
    try {
        let data = plainToClass(SucuAutomovil, req.body);
        await validate(data); 
        req.body = JSON.parse(JSON.stringify(data));
        req.data= undefined;
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
});

export { 
    appMiddlewareSucuAutomovilVerify,
    appDTODataSucuAutomovil
};