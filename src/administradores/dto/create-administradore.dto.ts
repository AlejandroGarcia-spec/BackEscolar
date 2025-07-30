import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdministradoreDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  correo: string;
  @IsString()
  @IsNotEmpty()
  contrasena: string;
}
