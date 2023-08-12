import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { Parametros } from '../dtocontroller/parametros.js';
import { DTO } from '../limit/token.js';
import { Router } from "express";
import { validate } from 'class-validator';

const appMiddlewareRegisDevoVerify = Router();
const appDTODataRegisDevo = Router();
const appDTOParamRegisDevo = Router();

appMiddlewareRegisDevoVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data;
    const{ iat, exp, ...newPayload } = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(DTO("regisdevo").class, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    req.data= undefined;
    console.log(payload);
    console.log(clone);
    if(!verify) res.status(406).send({status: 406, message: "No Autorizado"})
    next();
});
appDTODataRegisDevo.use( async(req,res,next)=>{
    try {
        let data = plainToClass(DTO("regisdevo").class, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data= undefined;
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
});
appDTOParamRegisDevo.use("/:id", async(req, res, next)=>{
    try {
        let parametro   = plainToClass(Parametros, req.params);
        await validate (parametro);
        next();
    } catch (error) {
        res.status(error.status).send(error);
    }
})
export { 
    appMiddlewareRegisDevoVerify,
    appDTODataRegisDevo,
    appDTOParamRegisDevo
};