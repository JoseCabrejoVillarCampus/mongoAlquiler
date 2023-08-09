import session from 'express-session';
import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import { MongoClient, ObjectId } from 'mongodb';
import { getDB } from '../db/db.mjs';

const storageSucursalAutomovil = Router();
let con = undefined;

storageSucursalAutomovil.use(session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: true,   
}));


storageSucursalAutomovil.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder();
        const payload = { body: req.body, params: req.params, id: req.params.id  };
        const jwtconstructor = new SignJWT(payload);
        const jwt = await jwtconstructor 
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY)); 
        req.body = payload.body;
        req.session.jwt = jwt;
        const maxAgeInSeconds = 3600;
        res.cookie('token', jwt, { httpOnly: true, maxAge: maxAgeInSeconds * 1000 });
        next();  
    } catch (err) { 
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500); 
    }
});
storageSucursalAutomovil.get("/:id?", async (req, res) => {
    const db = await getDB();
    const id = req.params.id
    let response;
    
    response = (id) ? await getOne(db, id) : await getAll(db); 
    res.json(response); 
});

const getAll = async(db) => {
    const collection = db.collection('sucursal_automovil');
    const sucursal_automoviles = await collection.find().toArray();
    return sucursal_automoviles 
}

const getOne = async(db, id) => {
    const collection = db.collection('sucursal_automovil');
    const sucursal_automovil = await collection.findOne({_id: new ObjectId(id)});
    return sucursal_automovil
}
export default storageSucursalAutomovil;