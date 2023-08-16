import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareSucursalVerify, appDTODataSucursal, appDTOParamSucursal} from '../middleware/sucursalmiddleware.js';
import { processErrors } from '../common/Functions.js';
import { Sucursal } from '../dtocontroller/sucursal.js';
let storageSucursal = Router();

let db = await coneccion();
let sucursal = db.collection("sucursal");

storageSucursal.use(expressQueryBoolean());

const getSucursalById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await sucursal.find({ID_Sucursal: parseInt(id)}).toArray();
    resolve(result);
    })
};
const getSucursalAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await sucursal.find({}).toArray();
        resolve(result);
    })
};

storageSucursal.get("/", limitGet() ,appMiddlewareSucursalVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id} = req.query;
        if(id){
            const data = await getSucursalById(id);
            res.send(data)
        }else {
            const data = await getSucursalAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});


storageSucursal.post("/", limitGet(), appMiddlewareSucursalVerify, appDTODataSucursal, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await sucursal.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Sucursal);

        res.send(err);
    }
});
storageSucursal.put("/:id?", limitGet(), appMiddlewareSucursalVerify, appDTODataSucursal , appDTOParamSucursal, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la sucursal a modificar."})
    }else{
        try{
            let result = await sucursal.updateOne(
                { "ID_Sucursal": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageSucursal.delete("/:id?", limitGet(), appMiddlewareSucursalVerify, appDTOParamSucursal, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la sucursal a eliminar."})
    } else {
        try{
            let result = await sucursal.deleteOne(
                { "ID_Sucursal": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageSucursal;