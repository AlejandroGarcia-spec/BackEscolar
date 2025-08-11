import { IsString, IsDateString, IsNumber, IsNumberString, isNotEmpty, IsNotEmpty } from 'class-validator';


export class CreateSalidaDto {

  @IsString()
  @IsNotEmpty()
  nombre_Recoge: string;
  
  @IsNumber()
  @IsNotEmpty()
  alumnoId: number;
}