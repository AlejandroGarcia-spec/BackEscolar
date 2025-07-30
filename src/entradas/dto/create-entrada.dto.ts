import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateEntradaDto {
  @IsInt()
  @IsNotEmpty()
  alumnoId: number;
}
