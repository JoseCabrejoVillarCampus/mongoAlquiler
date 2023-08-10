import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import {appMiddlewareReservaVerify, appDTODataReserva} from '../middleware/reservamiddleware.js';
let storageReserva = Router();

storageReserva.get('/', limitGet(), appMiddlewareReservaVerify , async(req, res)=>{
    if(!req.rateLimit) return;
    let db = await coneccion();
    let reserva = db.collection("reserva");
    let result = await reserva.find().toArray();
    res.send(result)
});

storageReserva.post('/', limitGet(), appMiddlewareReservaVerify, appDTODataReserva , async(req, res) => {
    let db = await coneccion();
    let reserva = db.collection("reserva");
    try {
        let result = await reserva.insertOne(req.body);
        console.log(result);
        res.send("reserva Ingresada");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied['0']);
        res.send("No Fue Posible Ingresar la reserva");
    }
})

export default storageReserva;