import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Automovil {

    @Expose({ name: 'ID_Automovil' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro automovilID es obligatorio` } } })
    automovilID: number;

    @Expose({ name: 'Marca' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro marca es obligatorio` } } })
    marca: string;

    @Expose({ name: 'Modelo' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro modelo es obligatorio` } } })
    modelo: string;

    @Expose({ name: 'Anio' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro anio es obligatorio` } } })
    anio: number;

    @Expose({ name: 'Tipo' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro tipo es obligatorio` } } })
    tipo: string;

    @Expose({ name: 'Capacidad' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro capacidad es obligatorio` } } })
    capacidad: number;

    @Expose({ name: 'Precio_Diario' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro precio es obligatorio` } } })
    precio: number;

    constructor(data: Partial<Automovil>) {
        Object.assign(this, data);
        this.automovilID = 0;
        this.marca = "";
        this.modelo = "";
        this.anio = 0;
        this.tipo = "";
        this.capacidad = 0;
        this.precio = 0;
        
    }

}