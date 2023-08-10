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
export class RegisEnt {
    constructor(data) {
        Object.assign(this, data);
        this.alquilerID = 0;
        this.alquiler = 0;
        this.empleado = 0;
        this.entregaAuto = new Date;
        this.combustible = 0;
        this.kilometraje = 0;
    }
}
__decorate([
    Expose({ name: 'ID_Registro' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro alquilerID es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisEnt.prototype, "alquilerID", void 0);
__decorate([
    Expose({ name: 'ID_Alquiler_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro alquiler es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisEnt.prototype, "alquiler", void 0);
__decorate([
    Expose({ name: 'ID_Empleado_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro empleado es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisEnt.prototype, "empleado", void 0);
__decorate([
    Expose({ name: 'Fecha_Entrega' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro entregaAuto es obligatorio` }; } }),
    __metadata("design:type", Date)
], RegisEnt.prototype, "entregaAuto", void 0);
__decorate([
    Expose({ name: 'Combustible_Entregado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro combustible es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisEnt.prototype, "combustible", void 0);
__decorate([
    Expose({ name: 'Kilometraje_Entregado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro kilometraje es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisEnt.prototype, "kilometraje", void 0);
;
