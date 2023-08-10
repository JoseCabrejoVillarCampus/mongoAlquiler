import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Sucursal {

    @Expose({ name: 'ID_Sucursal' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro sucursal es obligatorio` } } })
    sucursal: number;

    @Expose({ name: 'Nombre' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro nombre es obligatorio` } } })
    nombre: string;

    @Expose({ name: 'Direccion' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro direccion es obligatorio` } } })
    direccion: string;

    @Expose({ name: 'Telefono' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El edad_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro telefono es obligatorio` } } })
    telefono: string;

    constructor(data: Partial<Sucursal>) {
        Object.assign(this, data);
        this.sucursal = 0;
        this.nombre = "";
        this.direccion = "";
        this.telefono="";
    }

}