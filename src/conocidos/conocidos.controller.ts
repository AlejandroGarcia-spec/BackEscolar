import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConocidosService } from './conocidos.service';
import { CreateConocidoDto } from './dto/create-conocido.dto';
import { UpdateConocidoDto } from './dto/update-conocido.dto';

@Controller('conocidos')
export class ConocidosController {
  constructor(private readonly conocidosService: ConocidosService) { }

  @Post('new')
  create(@Body() createConocidoDto: CreateConocidoDto) {
    return this.conocidosService.create(createConocidoDto);
  }

  @Get('get')
  findAll() {
    return this.conocidosService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.conocidosService.findOne(+id);
  }

  @Get('conocidos/tutor/:tutorId')
  findConocidosByTutor(@Param('tutorId') tutorId: number) {
    return this.conocidosService.findByTutorId(tutorId);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateConocidoDto: UpdateConocidoDto) {
    return this.conocidosService.update(+id, updateConocidoDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.conocidosService.remove(+id);
  }
}
