import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Cliente {

    @Expose({ name: 'ID_Cliente' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro cliente es obligatorio` } } })
    cliente: number;

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

    @Expose({ name: 'Email' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro email es obligatorio` } } })
    email: string;

    constructor(data: Partial<Cliente>) {
        Object.assign(this, data);
        this.cliente = 0;
        this.nombre = "";
        this.apellido = "";
        this.identificacion = "";
        this.direccion = "";
        this.telefono = "";
        this.email = "";
        
    }
};