import { IsString, IsDateString, IsNumber } from 'class-validator';


export class CreateSalidaDto {

  @IsString()
  nombre_Recoge: string;

  @IsNumber()
  alumnoId: number;
}