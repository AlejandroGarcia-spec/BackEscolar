import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTutoreDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;
  @IsString()
  @IsNotEmpty()
  correo: string;
  @IsString()
  @IsNotEmpty()
  contrasena: string;
  @IsOptional()
  @IsString()
  imagenBase64?: string;
}
