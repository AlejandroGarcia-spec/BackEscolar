import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConocidoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsInt()
  @IsNotEmpty()
  tutorId: number;

  @IsString()
  @IsOptional()
  foto?: string;
}