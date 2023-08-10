import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class RegisEnt {

    @Expose({ name: 'recordID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro recordID es obligatorio` } } })
    ID_Registro: number;

    @Expose({ name: 'rentID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro rentID es obligatorio` } } })
    ID_Alquiler_id: number;

    @Expose({ name: 'ID_Empleado_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro empleado es obligatorio` } } })
    ID_Empleado_id: number;

    @Expose({ name: 'Fecha_Entrega' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro entregaAuto es obligatorio` } } })
    Fecha_Entrega: Date;

    @Expose({ name: 'Combustible_Entregado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro combustible es obligatorio` } } })
    Combustible_Entregado: number;

    @Expose({ name: 'Kilometraje_Entregado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro kilometraje es obligatorio` } } })
    Kilometraje_Entregado: number;

    constructor(data: Partial<RegisEnt>) {
        Object.assign(this, data);
        this.ID_Registro = 0;
        this.ID_Alquiler_id = 0;
        this.ID_Empleado_id = 0;
        this.Fecha_Entrega = new Date ;
        this.Combustible_Entregado = 0;
        this.Kilometraje_Entregado = 0;
        
    }
};