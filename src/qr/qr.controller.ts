import { Controller, Get, Post, Body, Query, Param, ParseIntPipe } from '@nestjs/common';
import { QRService } from './qr.service';
import { CreateQrDto } from './dto/create-qr.dto';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QRService) { }

  @Post('generar')
  async generarQR(@Body() dto: CreateQrDto) {
    return this.qrService.generarQR(dto);
  }

  @Get('verificar')
  async decodificarQR(@Query('token') token: string) {
    return this.qrService.decodificarQR(token);
  }

  @Get('tutores/:tutorId/alumnos/:alumnoId/datos-qr')
  obtenerDatosQR(
    @Param('tutorId', ParseIntPipe) tutorId: number,
    @Param('alumnoId', ParseIntPipe) alumnoId: number,
  ) {
    return this.qrService.obtenerDatosParaQR(tutorId, alumnoId);
  }

}
