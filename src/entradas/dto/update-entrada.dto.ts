import { IsInt, IsOptional, IsDateString } from 'class-validator';

export class UpdateEntradaDto {
  @IsOptional()
  @IsInt()
  alumnoId?: number;

  @IsOptional()
  @IsDateString()
  DateEntrada?: string;
}
