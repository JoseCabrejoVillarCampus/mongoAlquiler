import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import {appMiddlewareRegisEntVerify} from '../middleware/registro_entregamiddleware.js';
let storageRegisEnt = Router();

storageRegisEnt.get('/', limitGet(),  async(req, res)=>{
    if(!req.rateLimit) return;
    let db = await coneccion();
    let registro_entrega = db.collection("registro_entrega");
    let result = await registro_entrega.find().toArray();
    res.send(result)
});

storageRegisEnt.post('/', limitGet(), appMiddlewareRegisEntVerify, async(req, res) => {
    let db = await coneccion();
    let registro_entrega = db.collection("registro_entrega");
    try {
        let result = await registro_entrega.insertOne(req.body);
        console.log(result);
        res.send("registro_entrega Ingresado");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied['0']);
        res.send("No Fue Posible Ingresar el registro_entrega");
    }
})

export default storageRegisEnt;