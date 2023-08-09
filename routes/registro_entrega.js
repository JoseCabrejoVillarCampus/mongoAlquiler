import session from 'express-session';
import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import { MongoClient, ObjectId } from 'mongodb';
import { getDB } from '../db/db.mjs';

const storageRegistroEntrega = Router();
let con = undefined;

storageRegistroEntrega.use(session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: true,   
}));


storageRegistroEntrega.use("/:id?", async (req, res, next) => {
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
storageRegistroEntrega.get("/:id?", async (req, res) => {
    const db = await getDB();
    const id = req.params.id
    let response;
    
    response = (id) ? await getOne(db, id) : await getAll(db); 
    res.json(response); 
});

const getAll = async(db) => {
    const collection = db.collection('registro_entrega');
    const registro_entregas = await collection.find().toArray();
    return registro_entregas 
}

const getOne = async(db, id) => {
    const collection = db.collection('registro_entrega');
    const registro_entrega = await collection.findOne({_id: new ObjectId(id)});
    return registro_entrega
}

export default storageRegistroEntrega;