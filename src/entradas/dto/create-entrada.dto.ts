import { IsInt } from 'class-validator';

export class CreateEntradaDto {
  @IsInt()
  alumnoId: number;
}
