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
export class Alquiler {
    constructor(data) {
        Object.assign(this, data);
        this.alquilerID = 0;
        this.clienteID = 0;
        this.automovilID = 0;
        this.inicioReserva = new Date;
        this.finReserva = new Date;
        this.total = 0;
        this.estado = "";
    }
}
__decorate([
    Expose({ name: 'ID_Alquiler' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro alquilerID es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "alquilerID", void 0);
__decorate([
    Expose({ name: 'ID_Cliente_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro clienteID es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "clienteID", void 0);
__decorate([
    Expose({ name: 'ID_Automovil_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro automovilID es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "automovilID", void 0);
__decorate([
    Expose({ name: 'Fecha_Inicio' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro inicioReserva es obligatorio` }; } }),
    __metadata("design:type", Date)
], Alquiler.prototype, "inicioReserva", void 0);
__decorate([
    Expose({ name: 'Fecha_Fin' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro finReserva es obligatorio` }; } }),
    __metadata("design:type", Date)
], Alquiler.prototype, "finReserva", void 0);
__decorate([
    Expose({ name: 'Costo_Total' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro total es obligatorio` }; } }),
    __metadata("design:type", Number)
], Alquiler.prototype, "total", void 0);
__decorate([
    Expose({ name: 'Estado' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro estado es obligatorio` }; } }),
    __metadata("design:type", String)
], Alquiler.prototype, "estado", void 0);
;
