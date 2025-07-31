import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { Alummno } from './entities/alumno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[TypeOrmModule.forFeature([Alummno])],
  controllers: [AlumnosController],
  providers: [AlumnosService],
  exports: [AlumnosService],

})
export class AlumnosModule {}
