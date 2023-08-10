import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class SucuAutomovil {

    @Expose({ name: 'branchID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro branchID es obligatorio` } } })
    ID_Sucursal_id: number;

    @Expose({ name: 'carID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro carID es obligatorio` } } })
    ID_Automovil_id: number;

    @Expose({ name: 'quantity_available' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro 
    quantity_available es obligatorio` } } })
    Cantidad_Disponible: number;

    constructor(data: Partial<SucuAutomovil>) {
        Object.assign(this, data);
        this.ID_Sucursal_id = 0;
        this.ID_Automovil_id = 0;
        this.Cantidad_Disponible = 0;
        
    }

}