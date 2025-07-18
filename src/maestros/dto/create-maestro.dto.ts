import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Grupochido } from "src/grupos/entities/grupo.entity";

export class CreateMaestroDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

   @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsNotEmpty()
    @IsNumber()
    telefono: number;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsString()
    @IsNotEmpty()
    contrasena: string;
    
    @IsNotEmpty()
    grupo: Grupochido;
}
