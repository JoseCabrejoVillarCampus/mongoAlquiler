import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Reserva {

    @Expose({ name: 'bookingID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro bookingID es obligatorio` } } })
    ID_Reserva: number;

    @Expose({ name: 'clientID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro clientID es obligatorio` } } })
    ID_Cliente_id: number;

    @Expose({ name: 'carID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro carID es obligatorio` } } })
    ID_Automovil_id: number;

    @Expose({ name: 'reservation_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro reservation_date
    es obligatorio` } } })
    Fecha_Reserva: Date;

    @Expose({ name: 'start_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro start_date es obligatorio` } } })
    Fecha_Inicio: Date;

    @Expose({ name: 'end_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro end_date es obligatorio` } } })
    Fecha_Fin: Date;

    @Expose({ name: 'estate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro estate es obligatorio` } } })
    Estado: string;

    constructor(data: Partial<Reserva>) {
        Object.assign(this, data);
        this.ID_Reserva = 0;
        this.ID_Cliente_id = 0;
        this.ID_Automovil_id = 0;
        this.Fecha_Reserva = new Date ;
        this.Fecha_Inicio = new Date;
        this.Fecha_Fin = new Date;
        this.Estado = "";
        
    }
};