import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Reserva {

    @Expose({ name: 'ID_Reserva' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro sucursal es obligatorio` } } })
    sucursalID: number;

    @Expose({ name: 'ID_Cliente_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro clienteID es obligatorio` } } })
    clienteID: number;

    @Expose({ name: 'ID_Automovil_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro automovilID es obligatorio` } } })
    automovilID: number;

    @Expose({ name: 'Fecha_Reserva' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro diaReserva es obligatorio` } } })
    diaReserva: Date;

    @Expose({ name: 'Fecha_Inicio' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro inicio es obligatorio` } } })
    inicio: Date;

    @Expose({ name: 'Fecha_Fin' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro finReserva es obligatorio` } } })
    finReserva: Date;

    @Expose({ name: 'Estado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro estado es obligatorio` } } })
    estado: string;

    constructor(data: Partial<Reserva>) {
        Object.assign(this, data);
        this.sucursalID = 0;
        this.clienteID = 0;
        this.automovilID = 0;
        this.diaReserva = new Date ;
        this.inicio = new Date;
        this.finReserva = new Date;
        this.estado = "";
        
    }
};