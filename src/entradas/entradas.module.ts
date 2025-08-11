import { Module } from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { EntradasController } from './entradas.controller';
import { Entrada } from './entities/entrada.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alummno } from 'src/alumnos/entities/alumno.entity';
import { Salida } from 'src/salidas/entities/salida.entity';
import { Tutore } from 'src/tutores/entities/tutore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrada, Alummno,Salida,Tutore])],
  controllers: [EntradasController],
  providers: [EntradasService],
})
export class EntradasModule {}
