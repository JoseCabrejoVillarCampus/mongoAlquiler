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
        this.ID_Sucursal = 0;
        this.Nombre = "";
        this.Direccion = "";
        this.Telefono = "";
        this.BranchId = 0;
        this.name = "";
        this.address = "";
        this.phoneNumber = 0;
    }
}
__decorate([
    Expose({ name: 'branchID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro branchID es obligatorio` }; } }),
    __metadata("design:type", Number)
], Sucursal.prototype, "ID_Sucursal", void 0);
__decorate([
    Expose({ name: 'name' })
    // @IsString({ message: () => { throw { status: 422, message: `El nombre_usuario no cumple con el formato, debe ser un string`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro name es obligatorio` }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'address' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro address es obligatorio` }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: 'phoneNumber' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El edad_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro phoneNumber es obligatorio` }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "Telefono", void 0);
__decorate([
    Expose({ name: 'ID_Sucursal' }),
    __metadata("design:type", Number)
], Sucursal.prototype, "BranchId", void 0);
__decorate([
    Expose({ name: 'Nombre' }),
    __metadata("design:type", String)
], Sucursal.prototype, "name", void 0);
__decorate([
    Expose({ name: 'Direccion' }),
    __metadata("design:type", String)
], Sucursal.prototype, "address", void 0);
__decorate([
    Expose({ name: 'Telefono' }),
    __metadata("design:type", Number)
], Sucursal.prototype, "phoneNumber", void 0);
