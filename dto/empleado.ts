import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Empleado {

    @Expose({ name: 'ID_Empleado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro empleado es obligatorio` } } })
    empleado: number;

    @Expose({ name: 'Nombre' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro nombre es obligatorio` } } })
    nombre: string;

    @Expose({ name: 'Apellido' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro apellido es obligatorio` } } })
    apellido: string;

    @Expose({ name: 'DNI' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro identificacion es obligatorio` } } })
    identificacion: string;

    @Expose({ name: 'Direccion' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro direccion es obligatorio` } } })
    direccion: string;

    @Expose({ name: 'Telefono' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro telefono es obligatorio` } } })
    telefono: string;

    @Expose({ name: 'Cargo' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro ocupacion es obligatorio` } } })
    ocupacion: string;

    

    constructor(data: Partial<Empleado>) {
        Object.assign(this, data);
        this.empleado = 0;
        this.nombre = "";
        this.apellido = "";
        this.identificacion = "";
        this.direccion = "";
        this.telefono = "";
        this.ocupacion = "";
        
    }
};