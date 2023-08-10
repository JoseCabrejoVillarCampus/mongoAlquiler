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
import { IsDefined } from 'class-validator';
export class Automovil {
    constructor(data) {
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
__decorate([
    Expose({ name: 'car' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro car es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "ID_Automovil", void 0);
__decorate([
    Expose({ name: 'brand' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}}) 
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro brand es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "Marca", void 0);
__decorate([
    Expose({ name: 'model' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro model es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "Modelo", void 0);
__decorate([
    Expose({ name: 'year' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro year es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "Anio", void 0);
__decorate([
    Expose({ name: 'tipe' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro tipe es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "Tipo", void 0);
__decorate([
    Expose({ name: 'stalls' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro stalls es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "Capacidad", void 0);
__decorate([
    Expose({ name: 'price' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro price es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "Precio_Diario", void 0);
