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
  ) { }

 

  async obtenerDatosParaQR(tutorId: number, alumnoId: number) {
    const conocidos = await this.conocidosService.findByTutorId(tutorId);

    if (!conocidos || conocidos.length === 0) {
      throw new NotFoundException('No se encontraron conocidos para este tutor');
    }

    const alumno = await this.alumnosService.findOneByIdAndTutor(alumnoId, tutorId);


    if (!alumno) {
      throw new NotFoundException('No se encontró el alumno relacionado con este tutor');
    }

    return conocidos.map(k => ({
      idConocido: k.id,
      nombreConocido: k.nombre,
      apellidoConocido: k.apellido,
      parentesco:k.parentesco,
      fotoConocido: k.foto,
      alumno: {
        idAlumno: alumno.id,
        nombreAlumno: alumno.nombre,
        nombreTutor: alumno.tutor.nombre,
        grupo: alumno.grupo ? {
          idGrupo: alumno.grupo.id,
          nombreGrupo: alumno.grupo.nombre,
        } : null,
      },
    }));
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
