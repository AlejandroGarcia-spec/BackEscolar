import { PartialType } from '@nestjs/mapped-types';
import { CreateEntradaDto } from './create-entrada.dto';
import { IsInt, IsOptional } from 'class-validator';


export class UpdateEntradaDto {
    @IsInt()
    @IsOptional()
    alumnoId?: number;
}
