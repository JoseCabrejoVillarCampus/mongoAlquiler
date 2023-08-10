import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import {appMiddlewareSucursalVerify} from '../middleware/sucursalmiddleware.js';
let storageSucursal = Router();

storageSucursal.get('/', limitGet(),  async(req, res)=>{
    if(!req.rateLimit) return;
    // let {id} = req.body
    // { "_id": new ObjectId(id)}
    let db = await coneccion();
    let sucursal = db.collection("sucursal");
    let result = await sucursal.find().toArray();
    res.send(result)
});

storageSucursal.post('/', limitGet(), appMiddlewareSucursalVerify, async(req, res) => {
    let db = await coneccion();
    let sucursal = db.collection("sucursal");
    try {
        let result = await sucursal.insertOne(req.body);
        console.log(result);
        res.send("Sucursal Ingresada");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied['0']);
        res.send("No Fue Posible Ingresar la Sucursal");
    }
})

export default storageSucursal;