import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class RegisDevo {

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

    @Expose({ name: 'Fecha_Devolucion' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro devolucionAuto es obligatorio` } } })
    devolucionAuto: Date;

    @Expose({ name: 'Combustible_Devuelto' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro combustibleEntregado es obligatorio` } } })
    combustibleEntregado: number;

    @Expose({ name: 'Kilometraje_Devuelto' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro kilometraje es obligatorio` } } })
    kilometraje: number;

    @Expose({ name: 'Monto_Adicional' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro adicionales es obligatorio` } } })
    adicionales: number;

    constructor(data: Partial<RegisDevo>) {
        Object.assign(this, data);
        this.alquilerID = 0;
        this.alquiler = 0;
        this.empleado = 0;
        this.devolucionAuto = new Date ;
        this.combustibleEntregado = 0;
        this.kilometraje = 0;
        this.adicionales = 0;
        
    }
};