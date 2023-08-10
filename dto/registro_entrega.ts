import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class RegisEnt {

    @Expose({ name: 'ID_Registro' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro alquilerID es obligatorio` } } })
    alquilerID: number;

    @Expose({ name: 'ID_Alquiler_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro alquiler es obligatorio` } } })
    alquiler: number;

    @Expose({ name: 'ID_Empleado_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro empleado es obligatorio` } } })
    empleado: number;

    @Expose({ name: 'Fecha_Entrega' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro entregaAuto es obligatorio` } } })
    entregaAuto: Date;

    @Expose({ name: 'Combustible_Entregado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro combustible es obligatorio` } } })
    combustible: number;

    @Expose({ name: 'Kilometraje_Entregado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro kilometraje es obligatorio` } } })
    kilometraje: number;

    constructor(data: Partial<RegisEnt>) {
        Object.assign(this, data);
        this.alquilerID = 0;
        this.alquiler = 0;
        this.empleado = 0;
        this.entregaAuto = new Date ;
        this.combustible = 0;
        this.kilometraje = 0;
        
    }
};