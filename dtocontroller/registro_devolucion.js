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
export class RegisDevo {
    constructor(data) {
        Object.assign(this, data);
        this.alquilerID = 0;
        this.alquiler = 0;
        this.empleado = 0;
        this.devolucionAuto = new Date;
        this.combustibleEntregado = 0;
        this.kilometraje = 0;
        this.adicionales = 0;
    }
}
__decorate([
    Expose({ name: 'ID_Registro' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro alquilerID es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "alquilerID", void 0);
__decorate([
    Expose({ name: 'ID_Alquiler_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro alquiler es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "alquiler", void 0);
__decorate([
    Expose({ name: 'ID_Empleado_id' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro empleado es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "empleado", void 0);
__decorate([
    Expose({ name: 'Fecha_Devolucion' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro devolucionAuto es obligatorio` }; } }),
    __metadata("design:type", Date)
], RegisDevo.prototype, "devolucionAuto", void 0);
__decorate([
    Expose({ name: 'Combustible_Devuelto' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro combustibleEntregado es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "combustibleEntregado", void 0);
__decorate([
    Expose({ name: 'Kilometraje_Devuelto' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro kilometraje es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "kilometraje", void 0);
__decorate([
    Expose({ name: 'Monto_Adicional' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro adicionales es obligatorio` }; } }),
    __metadata("design:type", Number)
], RegisDevo.prototype, "adicionales", void 0);
;
