import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { RegisDevo } from '../dtocontroller/registro_devolucion.js';
import { Router } from "express";
import { validate } from 'class-validator';
const appMiddlewareRegisDevoVerify = Router();
const appDTODataRegisDevo = Router();


appMiddlewareRegisDevoVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data;
    const{ iat, exp, ...newPayload } = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(RegisDevo, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    console.log(payload);
    console.log(clone);
    if(!verify) res.status(406).send({status: 406, message: "No Autorizado"})
    next();
});
appDTODataRegisDevo.use( async(req,res,next)=>{
    try {
        let data = plainToClass(RegisDevo, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data= undefined;
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
});

export { 
    appMiddlewareRegisDevoVerify,
    appDTODataRegisDevo
};