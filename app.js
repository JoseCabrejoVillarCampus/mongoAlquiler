import dotenv from 'dotenv';
import express from 'express';
import { appToken, appVerify } from './limit/token.js';
import storageSucursal from './routes/sucursal.js';
import storageAlquiler from './routes/alquiler.js';
import storageAutomovil from './routes/automovil.js';
import storageEmpleado from './routes/empleado.js';
import storageReserva from './routes/reserva.js';
import storageCliente from './routes/cliente.js';
import storageSucuAutomovil from './routes/sucursal_automovil.js';
import storageRegisDevo from './routes/registro_devolucion.js';
import storageRegisEnt from './routes/registro_entrega.js';

dotenv.config();
let app = express();

app.use(express.json());
app.use("/sucursal", appVerify, storageSucursal);
app.use("/alquiler", appVerify, storageAlquiler);
app.use("/automovil", appVerify, storageAutomovil);
app.use("/empleado", appVerify, storageEmpleado);
app.use("/reserva", appVerify, storageReserva);
app.use("/cliente", appVerify, storageCliente);
app.use("/sucursal_automovil", appVerify, storageSucuAutomovil);
app.use("/registro_devolucion", appVerify, storageRegisDevo);
app.use("/registro_entrega", appVerify, storageRegisEnt);
app.use("/token", appToken);



let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});