import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { RegisEnt } from '../dtocontroller/registro_entrega.js';
import { Router } from "express";
import { validate } from 'class-validator';
const appMiddlewareRegisEntVerify = Router();
const appDTODataRegisEnt = Router();


appMiddlewareRegisEntVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data;
    const{ iat, exp, ...newPayload } = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(RegisEnt, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    if(!verify) res.status(406).send({status: 406, message: "No Autorizado"})
    next();
});

appDTODataRegisEnt.use( async(req,res,next)=>{
    try {
        let data = plainToClass(RegisEnt, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data= undefined;
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
});

export { 
    appMiddlewareRegisEntVerify,
    appDTODataRegisEnt
};