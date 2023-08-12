var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined, Matches, IsString } from 'class-validator';
export class RegisDevo {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Registro = 0;
        this.ID_Alquiler_id = 0;
        this.ID_Empleado_id = 0;
        this.Fecha_Devolucion = "1991-01-01";
        this.Combustible_Devuelto = 0;
        this.Kilometraje_Devuelto = 0;
        this.Monto_Adicional = 0;
    }
}
__decorate([
    Expose({ name: 'record' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro record es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "ID_Registro", void 0);
__decorate([
    Expose({ name: 'renID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro renID es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "ID_Alquiler_id", void 0);
__decorate([
    Expose({ name: 'employees' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro employees es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "ID_Empleado_id", void 0);
__decorate([
    Expose({ name: 'return_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro return_date debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro return_date es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], RegisDevo.prototype, "Fecha_Devolucion", void 0);
__decorate([
    Expose({ name: 'fuel_returned' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro fuel_returned es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "Combustible_Devuelto", void 0);
__decorate([
    Expose({ name: 'mileage_returned' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro mileage_returned es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "Kilometraje_Devuelto", void 0);
__decorate([
    Expose({ name: 'additional_amount' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro additional_amount es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "Monto_Adicional", void 0);
;
