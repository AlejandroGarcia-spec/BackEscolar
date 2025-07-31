import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateQrDto } from './dto/create-qr.dto';
import { ConocidosService } from 'src/conocidos/conocidos.service';
import { AlumnosService } from 'src/alumnos/alumnos.service';
import { TokenExpiredError } from 'jsonwebtoken';


@Injectable()
export class QRService {
  constructor(
    private jwtService: JwtService,
    private conocidosService: ConocidosService,
    private alumnosService: AlumnosService,
  ) {}

  async generarQR(dto: CreateQrDto) {
    const alumno = await this.alumnosService.findOne(dto.alumnoId);
    const conocido = await this.conocidosService.findOne(dto.conocidoId);

    if (!alumno || !conocido) {
      throw new NotFoundException('Alumno o conocido no encontrado');
    }

    const payload = {
      alumnoId: alumno.id,
      conocidoId: conocido.id,
      nombreConocido: conocido.nombre,
      fotoConocido: conocido.foto,
      nombreAlumno: alumno.nombre,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '5m' });

    return { token }; // Lo puedes usar para generar el QR en el front
  }

 async decodificarQR(token: string) {
    try {
      const data = this.jwtService.verify(token);
      return data;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('El código QR ha expirado');
      } else {
        throw new UnauthorizedException('QR inválido');
      }
    }
  }
}
