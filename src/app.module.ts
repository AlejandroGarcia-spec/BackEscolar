import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposModule } from './grupos/grupos.module';
import { TutoresModule } from './tutores/tutores.module';
import { HorariosModule } from './horarios/horarios.module';
import { SalidasModule } from './salidas/salidas.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { MaestrosModule } from './maestros/maestros.module';
import { EntradasModule } from './entradas/entradas.module';
import { AdministradoresModule } from './administradores/administradores.module';
import { ConocidosModule } from './conocidos/conocidos.module';
import { QrModule } from './qr/qr.module';
@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql.railway.internal',
    port: 3306,
    username: 'root',
    password: 'HCWYmInGybXzChFAwuzvRFGJzrOVNutu',
    database: 'railway',
    synchronize: true,
    autoLoadEntities: true,
  }), GruposModule, TutoresModule, HorariosModule, SalidasModule, AlumnosModule, MaestrosModule, EntradasModule, AdministradoresModule, ConocidosModule, QrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
