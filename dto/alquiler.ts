import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Alquiler {

    @Expose({ name: 'ID_Alquiler' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro alquilerID es obligatorio` } } })
    alquilerID: number;

    @Expose({ name: 'ID_Cliente_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro clienteID es obligatorio` } } })
    clienteID: number;

    @Expose({ name: 'ID_Automovil_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro automovilID es obligatorio` } } })
    automovilID: number;

    @Expose({ name: 'Fecha_Inicio' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro inicioReserva es obligatorio` } } })
    inicioReserva: Date;

    @Expose({ name: 'Fecha_Fin' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro finReserva es obligatorio` } } })
    finReserva: Date;

    @Expose({ name: 'Costo_Total' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro total es obligatorio` } } })
    total: number;

    @Expose({ name: 'Estado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro estado es obligatorio` } } })
    estado: string;

    constructor(data: Partial<Alquiler>) {
        Object.assign(this, data);
        this.alquilerID = 0;
        this.clienteID = 0;
        this.automovilID = 0;
        this.inicioReserva = new Date ;
        this.finReserva = new Date;
        this.total = 0;
        this.estado = "";
        
    }
};