import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
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
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro initDate es obligatorio` } } })
    Fecha_Inicio: Date;

    @Expose({ name: 'endDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro endDate es obligatorio` } } })
    Fecha_Fin: Date;

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
        this.Fecha_Inicio = new Date ;
        this.Fecha_Fin = new Date;
        this.Costo_Total = 0;
        this.Estado = "";
        
    }
};