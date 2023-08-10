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
export class Empleado {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Empleado = 0;
        this.Nombre = "";
        this.Apellido = "";
        this.DNI = "";
        this.Direccion = "";
        this.Telefono = "";
        this.Cargo = "";
    }
}
__decorate([
    Expose({ name: 'employee' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro employee es obligatorio` }; } }),
    __metadata("design:type", Number)
], Empleado.prototype, "ID_Empleado", void 0);
__decorate([
    Expose({ name: 'name' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro name es obligatorio` }; } }),
    __metadata("design:type", String)
], Empleado.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'surname' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro surname es obligatorio` }; } }),
    __metadata("design:type", String)
], Empleado.prototype, "Apellido", void 0);
__decorate([
    Expose({ name: 'identification' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro identification es obligatorio` }; } }),
    __metadata("design:type", String)
], Empleado.prototype, "DNI", void 0);
__decorate([
    Expose({ name: 'address' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro address es obligatorio` }; } }),
    __metadata("design:type", String)
], Empleado.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: 'phonenumber' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro phonenumber es obligatorio` }; } }),
    __metadata("design:type", String)
], Empleado.prototype, "Telefono", void 0);
__decorate([
    Expose({ name: 'ocupation' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro ocupation es obligatorio` }; } }),
    __metadata("design:type", String)
], Empleado.prototype, "Cargo", void 0);
;
