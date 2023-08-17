import { Router } from 'express';
import { coneccion } from "../db/atlas.js";
import { limitGet } from '../limit/config.js';
import { plainToClass } from 'class-transformer';
import { DTO } from '../limit/token.js';
import expressQueryBoolean from 'express-query-boolean';
import {appMiddlewareReservaVerify, appDTODataReserva, appDTOParamReserva} from '../middleware/reservamiddleware.js';
import { Reserva } from '../dtocontroller/reserva.js';
let storageReserva = Router();

let db = await coneccion();
let reserva = db.collection("reserva");

storageReserva.use(expressQueryBoolean());

const getReservaById = (id)=>{
    return new Promise(async(resolve)=>{
        let result = await reserva.aggregate([
            {
                $match: { "ID_Reserva": parseInt(id) }
            },
            {
                $project: {
                    "_id": 0,
                    "bookingID": "$ID_Reserva",
                    "clientID": "$ID_Cliente_id",
                    "carID": "$ID_Automovil_id",
                    "reservation_date": "$Fecha_Reserva",
                    "start_date": "$Fecha_Inicio",
                    "end_date": "$Fecha_Fin",
                    "estate": "$Estado"
                }
            }
        ]).toArray();
    resolve(result);
    })
};
const getReservaByClient = (cliente) => {
    return new Promise(async (resolve) => {
        let result = await reserva.aggregate([
            {
                $match: {
                    ID_Cliente_id: parseInt(cliente)
                }
            },
            {
                $lookup: {
                    from: "cliente",
                    localField: "ID_Cliente_id",
                    foreignField: "ID_Cliente",
                    as: "cliente_FK"
                }
            },
            {
                $unwind: "$cliente_FK"
            },
            {
                $addFields: {
                    "ClienteID": "$cliente_FK.ID_Cliente",
                    "Nombre": "$cliente_FK.Nombre",
                    "Apellido": "$cliente_FK.Apellido",
                    "DNI": "$cliente_FK.DNI",
                    "Direccion": "$cliente_FK.Direccion",
                    "Telefono": "$cliente_FK.Telefono",
                    "Email": "$cliente_FK.Email"
                }
            },
            {
                $match: {
                    Estado: "Apartado"
                }
            },
            {
                $project: {
                    "_id": 0,
                    "bookingID": "$ID_Reserva",
                    "state": "$Estado",
                    "client": "$ClienteID",
                    "name": "$Nombre", 
                    "surname": "$Apellido", 
                    "identification": "$DNI",
                }
            },
        ]).toArray();
        resolve(result);
    });
};

const getReservaDataClienByID = (reservacliente)=>{
    return new Promise(async(resolve)=>{
        let result = await reserva.aggregate([{
            $match: {
                ID_Reserva: parseInt(reservacliente)
            }
        },
        {
            $lookup: {
                from: "cliente",
                localField: "ID_Cliente_id",
                foreignField: "ID_Cliente",
                as: "cliente_FK"
            }
        },
        {
            $project: {
                "ID_Automovil_id": 0,
                "Fecha_Reserva":0,
                "Fecha_Inicio":0,
                "Fecha_Fin":0
            }
        },
        {
            $group: {
                _id: "$_id",
                ID_Reserva: {
                    $first: "$ID_Reserva"
                },
                ID_Cliente_id: {
                    $first: "$ID_Cliente_id"
                },
                Estado: {
                    $first: "$Estado"
                },
                cliente_FK: {
                    $push: "$cliente_FK"
                },
            }
        },
        {
            $project: {
                "_id":0,
                "ID_Cliente_id":0,
                "cliente_FK._id": 0,
                "Fecha_Reserva":0
            }
        }
    ]).toArray();
        resolve(result);
    })
};
const getReservaAll = ()=>{
    return new Promise(async(resolve)=>{
        let result = await reserva.aggregate([
            {
                $project: {
                    "_id": 0,
                    "bookingID": "$ID_Reserva",
                    "clientID": "$ID_Cliente_id",
                    "carID": "$ID_Automovil_id",
                    "reservation_date": "$Fecha_Reserva",
                    "start_date": "$Fecha_Inicio",
                    "end_date": "$Fecha_Fin",
                    "estate": "$Estado"
                }
            }
        ]).toArray();
        resolve(result);
    })
};

storageReserva.get("/", limitGet() ,appMiddlewareReservaVerify ,async(req, res)=>{
    console.log(req.query);
    try{
        const {id, cliente, reservacliente} = req.query;
        if(id){
            const data = await getReservaById(id);
            res.send(data)
        }else if(cliente) {
            const data = await getReservaByClient(cliente);
            res.send(data);
        }else if(reservacliente) {
            const data = await getReservaDataClienByID(reservacliente);
            res.send(data);
        }else {
            const data = await getReservaAll();
            res.send(data);
        }
    }catch(err){
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    } 
});

storageReserva.post("/", limitGet(), appMiddlewareReservaVerify, appDTODataReserva, async(req, res)=>{

    if(!req.rateLimit) return;
    try{
        let result = await reserva.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        const err = plainToClass(DTO("mongo").class, error.errInfo.details.schemaRulesNotSatisfied)

        const errorList = processErrors(err, Reserva);

        res.send(err);
    }
});
storageReserva.put("/:id?", limitGet(), appMiddlewareReservaVerify, appDTODataReserva , appDTOParamReserva, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.send({message: "Para realizar el método update es necesario ingresar el id de la reserva a modificar."})
    }else{
        try{
            let result = await reserva.updateOne(
                { "ID_Reserva": parseInt(req.params.id)},
                { $set: req.body }
            );
            res.send(result)
        } catch (error){
            res.status(422).send(error)
        }
    }
});
storageReserva.delete("/:id?", limitGet(), appMiddlewareReservaVerify, appDTOParamReserva, async(req, res)=>{
    if(!req.rateLimit) return;
    if(!req.params.id){
        res.status(404).send({message: "Para realizar el método delete es necesario ingresar el id de la reserva a eliminar."})
    } else {
        try{
            let result = await reserva.deleteOne(
                { "ID_Reserva": parseInt(req.params.id) }
            );
            res.status(200).send(result)
        } catch (error){
            res.status(422).send(error)
        }
    } 
}); 
export default storageReserva;