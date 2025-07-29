import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsOptional()
  @IsString()
  correo?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  imagenBase64?: string;
  @IsNumber()
  @IsNotEmpty()
  grupoId: number; // <-- Aquí tienes un decorador para string pero es number en el tipo
  @IsNotEmpty()
  @IsNumber()
  tutorId?: number;
}
