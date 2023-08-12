import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches} from 'class-validator';
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
    @IsString ({ message: 'El parametro reservation_date debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro reservation_date es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    Fecha_Reserva: string;

    @Expose({ name: 'start_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsString ({ message: 'El parametro start_date debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro start_date es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    Fecha_Inicio: string;

    @Expose({ name: 'end_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsString ({ message: 'El parametro end_date debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro end_date es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    Fecha_Fin: string;

    @Expose({ name: 'estate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro estate es obligatorio` } } })
    Estado: string;

    constructor(data: Partial<Reserva>) {
        Object.assign(this, data);
        this.ID_Reserva = 0;
        this.ID_Cliente_id = 0;
        this.ID_Automovil_id = 0;
        this.Fecha_Reserva = "1991-01-01";
        this.Fecha_Inicio = "1991-01-01";
        this.Fecha_Fin = "1991-01-01";
        this.Estado = "";
        
    }
};