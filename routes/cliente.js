import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import {appMiddlewareClienteVerify, appDTODataCliente} from '../middleware/clientemiddleware.js';
let storageCliente = Router();

storageCliente.get('/', limitGet(), appMiddlewareClienteVerify , async(req, res)=>{
    if(!req.rateLimit) return;
    let db = await coneccion();
    let cliente = db.collection("cliente");
    let result = await cliente.find().toArray();
    res.send(result)
});

storageCliente.post('/', limitGet(), appMiddlewareClienteVerify, appDTODataCliente ,async(req, res) => {
    let db = await coneccion();
    let cliente = db.collection("cliente");
    try {
        let result = await cliente.insertOne(req.body);
        console.log(result);
        res.send("cliente Ingresada");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied['0']);
        res.send("No Fue Posible Ingresar el cliente");
    }
})

export default storageCliente;