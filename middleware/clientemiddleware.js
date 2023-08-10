import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { Cliente } from '../dtocontroller/cliente.js';
import {validate} from 'class-validator';
import { Router } from "express";
const appMiddlewareClienteVerify = Router()
const appDTODataCliente = Router();

appMiddlewareClienteVerify.use(async(req,res,next) => {
    if(!req.rateLimit) return;
    let {payload} = req.data;
    delete payload.iat;
    delete payload.exp;
    
    let clone = JSON.stringify(classToPlain(plainToClass(Cliente, {}, { ignoreDecorators: true })));
    let verify = clone === JSON.stringify(payload);

    console.log(payload);
    console.log(clone);

    if(!verify) res.status(406).send({status: 406, message: "No Autorizado"})
    next();
}
);

appDTODataCliente.use( async(req,res,next)=>{
    try {
        let data = plainToClass(Cliente, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data= undefined;
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
})

export { 
    appMiddlewareClienteVerify,
    appDTODataCliente
};