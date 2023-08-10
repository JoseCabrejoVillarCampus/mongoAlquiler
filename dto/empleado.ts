import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Empleado {

    @Expose({ name: 'employee' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro employee es obligatorio` } } })
    ID_Empleado: number;

    @Expose({ name: 'name' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro name es obligatorio` } } })
    Nombre: string;

    @Expose({ name: 'surname' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro surname es obligatorio` } } })
    Apellido: string;

    @Expose({ name: 'identification' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro identification es obligatorio` } } })
    DNI: string;

    @Expose({ name: 'address' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro address es obligatorio` } } })
    Direccion: string;

    @Expose({ name: 'phonenumber' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro phonenumber es obligatorio` } } })
    Telefono: string;

    @Expose({ name: 'ocupation' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro ocupation es obligatorio` } } })
    Cargo: string;

    

    constructor(data: Partial<Empleado>) {
        Object.assign(this, data);
        this.ID_Empleado = 0;
        this.Nombre = "";
        this.Apellido = "";
        this.DNI = "";
        this.Direccion = "";
        this.Telefono = "";
        this.Cargo = "";
        
    }
};