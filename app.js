import dotenv from 'dotenv';
import express from 'express';
import {generateToken, validateToken} from './middleware/fwt.js'
import storageEmpleado from './routes/empleado.js';
import { connect } from './db/db.mjs';
import cookieParser from 'cookie-parser';

dotenv.config();
const appExpress = express();

appExpress.use(cookieParser());
appExpress.get("/token", generateToken, (req,res)=>{
    res.send({token: req.token})
});

(async () =>{
    await connect();
})();

appExpress.use("/empleado", validateToken,storageEmpleado);

const config =JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});

process.on('SIGINT', async () => {
    await closeDatabase();
    process.exit();
});