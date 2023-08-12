import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class RegisEnt {

    @Expose({ name: 'recordID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro recordID es obligatorio` } } })
    ID_Registro: number;

    @Expose({ name: 'rentID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro rentID es obligatorio` } } })
    ID_Alquiler_id: number;

    @Expose({ name: 'employed' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro employed es obligatorio` } } })
    ID_Empleado_id: number;

    @Expose({ name: 'delivery_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsString ({ message: 'El parametro delivery_date debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro delivery_date es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    Fecha_Entrega: string;

    @Expose({ name: 'delivery_fuel' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro delivery_fuel es obligatorio` } } })
    Combustible_Entregado: number;

    @Expose({ name: 'delivery_km' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro delivery_km es obligatorio` } } })
    Kilometraje_Entregado: number;

    constructor(data: Partial<RegisEnt>) {
        Object.assign(this, data);
        this.ID_Registro = 0;
        this.ID_Alquiler_id = 0;
        this.ID_Empleado_id = 0;
        this.Fecha_Entrega = "1991-01-01" ;
        this.Combustible_Entregado = 0;
        this.Kilometraje_Entregado = 0;
    }
};