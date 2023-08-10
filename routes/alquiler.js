import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import {appMiddlewareAlquilerVerify} from '../middleware/alquilermiddleware.js';
let storageAlquiler = Router();

storageAlquiler.get('/', limitGet(),  async(req, res)=>{
    if(!req.rateLimit) return;
    let db = await coneccion();
    let alquiler = db.collection("alquiler");
    let result = await alquiler.find().toArray();
    res.send(result)
});

storageAlquiler.post('/', limitGet(), appMiddlewareAlquilerVerify, async(req, res) => {
    let db = await coneccion();
    let alquiler = db.collection("alquiler");
    try {
        let result = await alquiler.insertOne(req.body);
        console.log(result);
        res.send("alquiler Ingresada");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied['0']);
        res.send("No Fue Posible Ingresar la alquiler");
    }
})

export default storageAlquiler;