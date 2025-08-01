import { PartialType } from '@nestjs/mapped-types';
import { CreateMaestroDto } from './create-maestro.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Grupochido } from 'src/grupos/entities/grupo.entity';

export class UpdateMaestroDto {
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
  grupoId: number; 
  @IsOptional()
  @IsString()
  imagenBase64?: string;
}
