import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { QRService } from './qr.service';
import { CreateQrDto } from './dto/create-qr.dto';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QRService) {}

  @Post('generar')
  async generarQR(@Body() dto: CreateQrDto) {
    return this.qrService.generarQR(dto);
  }

  @Get('verificar')
  async decodificarQR(@Query('token') token: string) {
    return this.qrService.decodificarQR(token);
  }
}
