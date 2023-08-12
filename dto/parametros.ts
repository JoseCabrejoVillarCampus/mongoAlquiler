import { Expose, Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class Parametros{
    @IsInt()
    @Expose({name: "id"})
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value)) 
        return (value); else throw {status:400, message: "el dato del parámetro id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
    id: number;
    constructor(data: Partial<Parametros>){
        Object.assign(this, data);
        this.id = 1;
    }
}