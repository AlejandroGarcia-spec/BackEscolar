import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { Alummno } from './entities/alumno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maestro } from 'src/maestros/entities/maestro.entity';
import { Grupochido } from 'src/grupos/entities/grupo.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Alummno, Maestro, Grupochido])],
  controllers: [AlumnosController],
  providers: [AlumnosService],
})
export class AlumnosModule {}
