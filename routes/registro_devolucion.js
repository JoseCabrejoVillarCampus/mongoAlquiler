import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import {appMiddlewareRegisDevoVerify, appDTODataRegisDevo} from '../middleware/registro_devolucionmiddleware.js';
let storageRegisDevo = Router();

storageRegisDevo.get('/', limitGet(), appMiddlewareRegisDevoVerify, async(req, res)=>{
    if(!req.rateLimit) return;
    let db = await coneccion();
    let registro_devolucion = db.collection("registro_devolucion");
    let result = await registro_devolucion.find().toArray();
    res.send(result)
});

storageRegisDevo.post('/', limitGet(), appMiddlewareRegisDevoVerify, appDTODataRegisDevo, async(req, res) => {
    let db = await coneccion();
    let registro_devolucion = db.collection("registro_devolucion");
    try {
        let result = await registro_devolucion.insertOne(req.body);
        console.log(result);
        res.send("registro_devolucion Ingresado");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied['0']);
        res.send("No Fue Posible Ingresar el registro_devolucion");
    }
})

export default storageRegisDevo;