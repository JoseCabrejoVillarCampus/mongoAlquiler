import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean'; 
import {appMiddlewareClienteVerify, appDTODataCliente, appDTOParamCliente} from '../middleware/clientemiddleware.js';
import { Cliente } from '../dtocontroller/cliente.js';
let storageCliente = Router();

let db = await coneccion();
let cliente = db.collection("cliente");

storageCliente.use(expressQueryBoolean());

const getClienteById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await cliente.find({ "ID_Cliente": parseInt(id)}).toArray();
        resolve(result);
    })
};
const getClienteAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await cliente.find({}).toArray();
        resolve(result);
    })
};
const getClienteByEstado = (estado)=>{
    return new Promise(async(resolve)=>{
        let result = await cliente.aggregate([{
            $lookup: {
                from: "alquiler",
                localField: "ID_Cliente",
                foreignField: "ID_Cliente_id",
                as: "alquiler_FK",
            }
        },
        {
            $project: {
                "alquiler_FK._id": 0,
                "alquiler_FK.ID_Cliente_id": 0,
                "alquiler_FK.ID_Automovil_id": 0,
                "alquiler_FK.Costo_Total": 0,
            }
        },
        {
            $unwind: "$alquiler_FK"
        },
        {
            $match: {
                "alquiler_FK.Estado": {
                    $eq: estado
                }
            }
        },
        {
            $group: {
                _id: "$_id",
                ID_Cliente: {
                    $first: "$ID_Cliente"
                },
                Nombre: {
                    $first: "$Nombre"
                },
                Apellido: {
                    $first: "$Apellido"
                },
                DNI: {
                    $first: "$DNI"
                },
                Direccion: {
                    $first: "$Direccion"
                },
                Telefono: {
                    $first: "$Telefono"
                },
                Email: {
                    $first: "$Email"
                },
                alquiler_FK: {
                    $push: "$alquiler_FK"
                }
            }
        }
    ]).toArray();
        resolve(result);
    })
};
const getClienteByDocumento = (documento) => {
    return new Promise(async (resolve) => {
        let result = await cliente.aggregate([
            {
                $match: {
                    [`DNI.${documento}`]: { $exists: true }
                }
            }
        ]).toArray();
        resolve(result);
    });
};
const getClienteAllWithCar = ()=>{
    return new Promise(async(resolve)=>{
        let result = await cliente.aggregate([{
            $lookup: {
                from: "alquiler",
                localField: "ID_Cliente",
                foreignField: "ID_Cliente_id",
                as: "alquiler_FK",
            }
        },
        {
            $project: {
                "alquiler_FK._id": 0,
                "alquiler_FK.ID_Cliente_id": 0,
                "alquiler_FK.Costo_Total": 0,
                "alquiler_FK.Fecha_Inicio": 0,
                "alquiler_FK.Fecha_Fin": 0,
            }
        },
        {
            $unwind: "$alquiler_FK"
        },
        {
            $lookup: {
                from: "automovil",
                localField: "alquiler_FK.ID_Automovil_id",
                foreignField: "ID_Automovil",
                as: "automovil_FK",
            }
        },
        {
            $project: {
                "automovil_FK._id": 0,
                "automovil_FK.ID_Automovil": 0,
                "automovil_FK._id": 0,
                "automovil_FK.Precio_Diario": 0
            }
        },
        {
            $match: {
                "alquiler_FK.Estado": {
                    $eq: "Disponible"
                }
            }
        },
        {
            $group: {
                _id: "$_id",
                ID_Cliente: {
                    $first: "$ID_Cliente"
                },
                Nombre: {
                    $first: "$Nombre"
                },
                Apellido: {
                    $first: "$Apellido"
                },
                DNI: {
                    $first: "$DNI"
                },
                Direccion: {
                    $first: "$Direccion"
                },
                Telefono: {
                    $first: "$Telefono"
                },
                Email: {
                    $first: "$Email"
                },
                alquiler_FK: {
                    $push: "$alquiler_FK"
                },
                automovil_FK: {
                    $push: "$automovil_FK"
                }
            }
        }
    ]).toArray();
        resolve(result);
    })
};
storageCliente.get("/", limitGet() ,appMiddlewareClienteVerify ,async(req, res)=>{
    try{
        const {id , estado, documento} = req.query;
        if(id){
            const data = await getClienteById(id);
            res.send(data)
        } else if (estado) {
            const data = await getClienteByEstado(estado);
            res.send(data);
        }  else if (documento) {
            const data = await getClienteByDocumento(documento);
            res.send(data);
        }else {
            const data = await getClienteAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
storageCliente.get("/reservaspendientes", limitGet() ,appMiddlewareClienteVerify ,async(req, res)=>{
    try{
        const data = await getClienteAllWithCar();
        res.send(data)
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
})



storageCliente.post("/", limitGet(), appMiddlewareClienteVerify, appDTODataCliente, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await cliente.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Sucursal);

        res.send(err);
    }
});
storageCliente.put("/:id?", limitGet(), appMiddlewareClienteVerify, appDTODataCliente , appDTOParamCliente, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id del cliente a modificar."})
    }else{
        try{
            let result = await cliente.updateOne(
                { "ID_Cliente": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageCliente.delete("/:id?", limitGet(), appMiddlewareClienteVerify, appDTOParamCliente, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id del cliente a eliminar."})
    } else {
        try{
            let result = await cliente.deleteOne(
                { "ID_Cliente": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageCliente;