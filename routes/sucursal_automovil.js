import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import {appMiddlewareSucuAutomovilVerify, appDTODataSucuAutomovil} from '../middleware/sucursal_automovilmiddleware.js';
let storageSucuAutomovil = Router();

storageSucuAutomovil.get('/', limitGet(), appMiddlewareSucuAutomovilVerify ,async(req, res)=>{
    if(!req.rateLimit) return;
    // let {id} = req.body
    // { "_id": new ObjectId(id)}
    let db = await coneccion();
    let sucursal_automovil = db.collection("sucursal_automovil");
    let result = await sucursal_automovil.find().toArray();
    res.send(result)
});

storageSucuAutomovil.post('/', limitGet(), appMiddlewareSucuAutomovilVerify, appDTODataSucuAutomovil ,async(req, res) => {
    let db = await coneccion();
    let sucursal_automovil = db.collection("sucursal_automovil");
    try {
        let result = await sucursal_automovil.insertOne(req.body);
        console.log(result);
        res.send("sucursal_automovil Ingresada");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied['0']);
        res.send("No Fue Posible Ingresar la sucursal_automovil");
    }
})

export default storageSucuAutomovil;