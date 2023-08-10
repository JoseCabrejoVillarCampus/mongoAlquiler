import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import {appMiddlewareEmpleadoVerify, appDTODataEmpleado} from '../middleware/empleadomiddleware.js';
let storageEmpleado = Router();

storageEmpleado.get('/', limitGet(), appMiddlewareEmpleadoVerify , async(req, res)=>{
    if(!req.rateLimit) return;
    let db = await coneccion();
    let empleado = db.collection("empleado");
    let result = await empleado.find().toArray();
    res.send(result)
});

storageEmpleado.post('/', limitGet(), appMiddlewareEmpleadoVerify, appDTODataEmpleado ,async(req, res) => {
    let db = await coneccion();
    let empleado = db.collection("empleado");
    try {
        let result = await empleado.insertOne(req.body);
        console.log(result);
        res.send("empleado Ingresado");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied['0']);
        res.send("No Fue Posible Ingresar el empleado");
    }
})

export default storageEmpleado;