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
import { IsDefined, IsString, Matches } from 'class-validator';
export class RegisEnt {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Registro = 0;
        this.ID_Alquiler_id = 0;
        this.ID_Empleado_id = 0;
        this.Fecha_Entrega = "1991-01-01";
        this.Combustible_Entregado = 0;
        this.Kilometraje_Entregado = 0;
    }
}
__decorate([
    Expose({ name: 'recordID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro recordID es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisEnt.prototype, "ID_Registro", void 0);
__decorate([
    Expose({ name: 'rentID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro rentID es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisEnt.prototype, "ID_Alquiler_id", void 0);
__decorate([
    Expose({ name: 'employed' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro employed es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisEnt.prototype, "ID_Empleado_id", void 0);
__decorate([
    Expose({ name: 'delivery_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro delivery_date debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro delivery_date es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], RegisEnt.prototype, "Fecha_Entrega", void 0);
__decorate([
    Expose({ name: 'delivery_fuel' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro delivery_fuel es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisEnt.prototype, "Combustible_Entregado", void 0);
__decorate([
    Expose({ name: 'delivery_km' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro delivery_km es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisEnt.prototype, "Kilometraje_Entregado", void 0);
;
