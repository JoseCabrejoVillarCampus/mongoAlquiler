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
export class Sucursal {
    constructor(data) {
        Object.assign(this, data);
        this.sucursal = 0;
        this.nombre = "";
        this.direccion = "";
        this.telefono = "";
    }
}
__decorate([
    Expose({ name: 'ID_Sucursal' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro sucursal es obligatorio` }; } }),
    __metadata("design:type", Number)
], Sucursal.prototype, "sucursal", void 0);
__decorate([
    Expose({ name: 'Nombre' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro nombre es obligatorio` }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'Direccion' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro direccion es obligatorio` }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "direccion", void 0);
__decorate([
    Expose({ name: 'Telefono' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El edad_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro telefono es obligatorio` }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "telefono", void 0);
