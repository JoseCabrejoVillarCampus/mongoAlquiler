import dotenv from 'dotenv';
import express from 'express';
import {generateToken, validateToken} from './middleware/fwt.js'
import storageEmpleado from './routes/empleado.js';
import { connect } from './db/db.mjs';
import cookieParser from 'cookie-parser';
import storageAutomovil from './routes/automovil.js';
import storageSucursal from './routes/sucursal.js';
import storageAlquiler from './routes/alquiler.js';
import storageReserva from './routes/reserva.js';
import storageSucursalAutomovil from './routes/sucursal_automovil.js';
import storageRegistroDevolucion from './routes/registro_devolucion.js';
import storageRegistroEntrega from './routes/registro_entrega.js';

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
appExpress.use("/automovil", validateToken,storageAutomovil);
appExpress.use("/sucursal", validateToken, storageSucursal);
appExpress.use("/alquiler", validateToken, storageAlquiler);
appExpress.use("/reserva", validateToken, storageReserva);
appExpress.use("/sucursal_automovil", validateToken, storageSucursalAutomovil);
appExpress.use("/registro_devolucion", validateToken, storageRegistroDevolucion);
appExpress.use("/registro_entrega", validateToken, storageRegistroEntrega);

const config =JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});

process.on('SIGINT', async () => {
    await closeDatabase();
    process.exit();
});