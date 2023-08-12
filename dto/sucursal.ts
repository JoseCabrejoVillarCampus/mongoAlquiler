import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Sucursal {

    @Expose({ name: 'branchID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro branchID es obligatorio` } } })
    ID_Sucursal: number;

    @Expose({ name: 'name' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro name es obligatorio` } } })
    Nombre: string; 

    @Expose({ name: 'address' })
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro address es obligatorio` } } })
    Direccion: string;

    @Expose({ name: 'phoneNumber' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El edad_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro phoneNumber es obligatorio` } } })
    Telefono: string;

    @Expose({name: 'ID_Sucursal'})
    BranchId: number

    @Expose({name : 'Nombre'})
    name: string

    @Expose({name: 'Direccion'})
    address: string

    @Expose({name: 'Telefono'})
    phoneNumber: number

    constructor(data: Partial<Sucursal>) {
        Object.assign(this, data);
        this.ID_Sucursal = 0;
        this.Nombre = "";
        this.Direccion = "";
        this.Telefono="";

        this.BranchId = 0;
        this.name = "";
        this.address = "";
        this.phoneNumber = 0;
    }

}