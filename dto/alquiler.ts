import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsString, Matches } from 'class-validator';
export class Alquiler {

    @Expose({ name: 'rent' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro rent es obligatorio` } } })
    ID_Alquiler: number;

    @Expose({ name: 'client' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro client es obligatorio` } } })
    ID_Cliente_id: number;

    @Expose({ name: 'car' }) 
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro car es obligatorio` } } })
    ID_Automovil_id: number;

    @Expose({ name: 'initDate' }) 
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsString ({ message: 'El parametro initDate debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro initDate es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    Fecha_Inicio: string;

    @Expose({ name: 'endDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsString ({ message: 'El parametro endDate debe ser un string'})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro endDate es obligatorio` } } })
    @Matches(/^\d{4}-\d{2}-\d{2$}/,{message: 'Error'})
    Fecha_Fin: string;

    @Expose({ name: 'totalCost' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro totalCost es obligatorio` } } })
    Costo_Total: number;

    @Expose({ name: 'estate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro estate es obligatorio` } } })
    Estado: string;

    constructor(data: Partial<Alquiler>) {
        Object.assign(this, data);
        this.ID_Alquiler = 0;
        this.ID_Cliente_id = 0;
        this.ID_Automovil_id = 0;
        this.Fecha_Inicio = "1991-01-01" ;
        this.Fecha_Fin = "1991-01-01";
        this.Costo_Total = 0;
        this.Estado = "";
        
    }
};