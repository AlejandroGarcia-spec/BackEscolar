import { IsNumber } from 'class-validator';

export class CreateQrDto {
  @IsNumber()
  alumnoId: number;

  @IsNumber()
  conocidoId: number;
}