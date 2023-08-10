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
export class SucuAutomovil {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Sucursal_id = 0;
        this.ID_Automovil_id = 0;
        this.Cantidad_Disponible = 0;
    }
}
__decorate([
    Expose({ name: 'branchID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro branchID es obligatorio` }; } }),
    __metadata("design:type", Number)
], SucuAutomovil.prototype, "ID_Sucursal_id", void 0);
__decorate([
    Expose({ name: 'carID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro carID es obligatorio` }; } }),
    __metadata("design:type", Number)
], SucuAutomovil.prototype, "ID_Automovil_id", void 0);
__decorate([
    Expose({ name: 'quantity_available' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => {
            throw { status: 422, message: `El parametro 
    quantity_available es obligatorio` };
        } }),
    __metadata("design:type", Number)
], SucuAutomovil.prototype, "Cantidad_Disponible", void 0);
