import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Automovil {

    @Expose({ name: 'car' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro car es obligatorio` } } })
    ID_Automovil: number;

    @Expose({ name: 'brand' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}}) 
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro brand es obligatorio` } } })
    Marca: string;

    @Expose({ name: 'model' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro model es obligatorio` } } })
    Modelo: string;

    @Expose({ name: 'year' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro year es obligatorio` } } })
    Anio: number;

    @Expose({ name: 'tipe' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro tipe es obligatorio` } } })
    Tipo: string;

    @Expose({ name: 'stalls' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro stalls es obligatorio` } } })
    Capacidad: number;

    @Expose({ name: 'price' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro price es obligatorio` } } })
    Precio_Diario: number;

    constructor(data: Partial<Automovil>) {
        Object.assign(this, data);
        this.ID_Automovil = 0;
        this.Marca = "";
        this.Modelo = "";
        this.Anio = 0;
        this.Tipo = "";
        this.Capacidad = 0;
        this.Precio_Diario = 0;
        
    }

}