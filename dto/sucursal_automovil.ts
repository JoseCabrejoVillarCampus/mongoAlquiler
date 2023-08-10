import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class SucuAutomovil {

    @Expose({ name: 'ID_Sucursal_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro sucursal es obligatorio` } } })
    sucursalID: number;

    @Expose({ name: 'ID_Automovil_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro sucursal es obligatorio` } } })
    automovilID: number;

    @Expose({ name: 'Cantidad_Disponible' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    @IsDefined({ message: () => { throw { status: 422, message: `El parametro sucursal es obligatorio` } } })
    cantidad: number;

    constructor(data: Partial<SucuAutomovil>) {
        Object.assign(this, data);
        this.sucursalID = 0;
        this.automovilID = 0;
        this.cantidad = 0;
        
    }

}