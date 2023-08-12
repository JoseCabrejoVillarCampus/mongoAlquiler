import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { Parametros } from '../dtocontroller/parametros.js';
import { DTO } from '../limit/token.js';
import {validate} from 'class-validator';
import { Router } from "express";

const appMiddlewareClienteVerify = Router()
const appDTODataCliente = Router(); 
const appDTOParamCliente = Router();

appMiddlewareClienteVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data;
    const{ iat, exp, ...newPayload } = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(DTO("cliente").class, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);
    req.data=undefined;
    if(!verify) res.status(406).send({status: 406, message: "No Autorizado"})
    next();
}
);

appDTODataCliente.use( async(req,res,next)=>{
    try {
        let data = plainToClass(DTO("cliente").class, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data= undefined;
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
});
appDTOParamCliente.use("/:id", async (req, res, next)=>{
    try{
        let parametro = plainToClass(Parametros, req.params);
        await validate(parametro);
        next();
    }catch (error){
        res.status(error.status).send(error);
    }
});
export { 
    appMiddlewareClienteVerify,
    appDTODataCliente,
    appDTOParamCliente
};