import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Grupochido } from 'src/grupos/entities/grupo.entity';

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

  @IsNumber()
  @IsNotEmpty()
  grupoId: number; // <-- Aquí tienes un decorador para string pero es number en el tipo
  @IsOptional()
  @IsString()
  imagenBase64?: string;
}
