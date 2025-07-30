import { Module } from '@nestjs/common';
import { ConocidosService } from './conocidos.service';
import { ConocidosController } from './conocidos.controller';
import { Conocido } from './entities/conocido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutore } from 'src/tutores/entities/tutore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conocido,Tutore])],
  controllers: [ConocidosController],
  providers: [ConocidosService],
})
export class ConocidosModule {}
