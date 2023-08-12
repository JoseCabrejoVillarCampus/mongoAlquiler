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
export class Reserva {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Reserva = 0;
        this.ID_Cliente_id = 0;
        this.ID_Automovil_id = 0;
        this.Fecha_Reserva = "1991-01-01";
        this.Fecha_Inicio = "1991-01-01";
        this.Fecha_Fin = "1991-01-01";
        this.Estado = "";
    }
}
__decorate([
    Expose({ name: 'bookingID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro bookingID es obligatorio` }; } }),
    __metadata("design:type", Number)
], Reserva.prototype, "ID_Reserva", void 0);
__decorate([
    Expose({ name: 'clientID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro clientID es obligatorio` }; } }),
    __metadata("design:type", Number)
], Reserva.prototype, "ID_Cliente_id", void 0);
__decorate([
    Expose({ name: 'carID' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro carID es obligatorio` }; } }),
    __metadata("design:type", Number)
], Reserva.prototype, "ID_Automovil_id", void 0);
__decorate([
    Expose({ name: 'reservation_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro reservation_date debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro reservation_date es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Reserva.prototype, "Fecha_Reserva", void 0);
__decorate([
    Expose({ name: 'start_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro start_date debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro start_date es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Reserva.prototype, "Fecha_Inicio", void 0);
__decorate([
    Expose({ name: 'end_date' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsString({ message: 'El parametro end_date debe ser un string' }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro end_date es obligatorio` }; } }),
    Matches(/^\d{4}-\d{2}-\d{2$}/, { message: 'Error' }),
    __metadata("design:type", String)
], Reserva.prototype, "Fecha_Fin", void 0);
__decorate([
    Expose({ name: 'estate' })
    // @IsNumber({}, { message: () => { throw { status: 422, message: `El cedula_usuario no cumple con el formato, debe ser un numero`}}})
    ,
    IsDefined({ message: () => { throw { status: 422, message: `El parametro estate es obligatorio` }; } }),
    __metadata("design:type", String)
], Reserva.prototype, "Estado", void 0);
;
