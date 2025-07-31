import { IsString } from 'class-validator';

export class DecodeQRDto {
  @IsString()
  token: string;
}