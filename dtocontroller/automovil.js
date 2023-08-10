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
        this.automovilID = 0;
        this.marca = "";
        this.modelo = "";
        this.anio = 0;
        this.tipo = "";
        this.capacidad = 0;
        this.precio = 0;
    }
}
__decorate([
    Expose({ name: 'ID_Automovil' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro automovilID es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "automovilID", void 0);
__decorate([
    Expose({ name: 'Marca' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro marca es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "marca", void 0);
__decorate([
    Expose({ name: 'Modelo' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro modelo es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "modelo", void 0);
__decorate([
    Expose({ name: 'Anio' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro anio es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "anio", void 0);
__decorate([
    Expose({ name: 'Tipo' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro tipo es obligatorio` }; } }),
    __metadata("design:type", String)
], Automovil.prototype, "tipo", void 0);
__decorate([
    Expose({ name: 'Capacidad' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro capacidad es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "capacidad", void 0);
__decorate([
    Expose({ name: 'Precio_Diario' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro precio es obligatorio` }; } }),
    __metadata("design:type", Number)
], Automovil.prototype, "precio", void 0);
