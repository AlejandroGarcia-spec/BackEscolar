import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConocidoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  parentesco: string;

  @IsInt()
  @IsNotEmpty()
  tutorId: number;

  @IsString()
  @IsNotEmpty()
  foto: string;
}