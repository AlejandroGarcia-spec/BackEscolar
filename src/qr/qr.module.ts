import { Module } from '@nestjs/common';
import { QRService } from './qr.service';
import { QrController } from './qr.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConocidosModule } from 'src/conocidos/conocidos.module';
import { AlumnosModule } from 'src/alumnos/alumnos.module';


@Module({
  imports: [
    JwtModule.register({
      secret: 'CLAVE_SECRETA_123',
      signOptions: { expiresIn: '3h' },
    }),
    ConocidosModule,
    AlumnosModule
  ],
  controllers: [QrController],
  providers: [QRService],
})
export class QrModule { }
