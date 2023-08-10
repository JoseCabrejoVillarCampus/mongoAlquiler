import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import {appMiddlewareAutomovilVerify, appDTODataAutomovil} from '../middleware/automovilmiddleware.js';
let storageAutomovil = Router();

storageAutomovil.get('/', limitGet(), appMiddlewareAutomovilVerify, async(req, res)=>{
    if(!req.rateLimit) return;
    let db = await coneccion();
    let automovil = db.collection("automovil");
    let result = await automovil.find().toArray(); 
    res.send(result)
});

storageAutomovil.post('/', limitGet(), appMiddlewareAutomovilVerify, appDTODataAutomovil, async(req, res) => {
    let db = await coneccion();
    let automovil = db.collection("automovil");
    try {
        let result = await automovil.insertOne(req.body);
        console.log(result);
        res.send("automovil Ingresado");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied['0']);
        res.send("No Fue Posible Ingresar el automovil");
    }
})

export default storageAutomovil;