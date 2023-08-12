import { Expose, Transform } from 'class-transformer';
import { IsDefined, Matches, IsString } from 'class-validator';
export class RegisDevo {

    @Expose({ name: 'record' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro record es obligatorio` } } })
    ID_Registro: number;

    @Expose({ name: 'renID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro renID es obligatorio` } } })
    ID_Alquiler_id: number;

    @Expose({ name: 'employees' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro employees es obligatorio` } } })
    ID_Empleado_id: number;

    @Expose({ name: 'return_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsString ({ message: 'El parametro return_date debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro return_date es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    Fecha_Devolucion: string;

    @Expose({ name: 'fuel_returned' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro fuel_returned es obligatorio` } } })
    Combustible_Devuelto: number;

    @Expose({ name: 'mileage_returned' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro mileage_returned es obligatorio` } } })
    Kilometraje_Devuelto: number;

    @Expose({ name: 'additional_amount' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro additional_amount es obligatorio` } } })
    Monto_Adicional: number;

    constructor(data: Partial<RegisDevo>) {
        Object.assign(this, data);
        this.ID_Registro = 0;
        this.ID_Alquiler_id = 0;
        this.ID_Empleado_id = 0;
        this.Fecha_Devolucion = "1991-01-01" ;
        this.Combustible_Devuelto = 0;
        this.Kilometraje_Devuelto = 0;
        this.Monto_Adicional = 0;
    }
};