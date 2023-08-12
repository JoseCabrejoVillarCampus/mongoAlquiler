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
export class Alquiler {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Alquiler = 0;
        this.ID_Cliente_id = 0;
        this.ID_Automovil_id = 0;
        this.Fecha_Inicio = "1991-01-01";
        this.Fecha_Fin = "1991-01-01";
        this.Costo_Total = 0;
        this.Estado = "";
    }
}
__decorate([
    Expose({ name: 'rent' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro rent es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "ID_Alquiler", void 0);
__decorate([
    Expose({ name: 'client' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro client es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "ID_Cliente_id", void 0);
__decorate([
    Expose({ name: 'car' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro car es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "ID_Automovil_id", void 0);
__decorate([
    Expose({ name: 'initDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro initDate debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro initDate es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Alquiler.prototype, "Fecha_Inicio", void 0);
__decorate([
    Expose({ name: 'endDate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro initDate debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro endDate es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Alquiler.prototype, "Fecha_Fin", void 0);
__decorate([
    Expose({ name: 'totalCost' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro totalCost es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "Costo_Total", void 0);
__decorate([
    Expose({ name: 'estate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro estate es obligatorio` }; } }),
    __metadata("design:type", String)
], Alquiler.prototype, "Estado", void 0);
;
