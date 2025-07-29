import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTutoreDto {
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
  email: string;
  @IsString()
  @IsNotEmpty()
  contrasena: string;
  @IsOptional()
  @IsString()
  imagenBase64?: string;
}
