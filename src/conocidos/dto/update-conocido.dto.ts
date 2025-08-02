import { PartialType } from '@nestjs/mapped-types';
import { CreateConocidoDto } from './create-conocido.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateConocidoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsInt()
  @IsOptional()
  tutorId?: number;

  @IsString()
  @IsOptional()
  foto?: string;
}
