import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';

@Controller('entradas')
export class EntradasController {
  constructor(private readonly entradasService: EntradasService) { }

  @Post('new')
  create(@Body() createEntradaDto: CreateEntradaDto) {
    return this.entradasService.create(createEntradaDto);
  }

  @Get('get')
  findAll() {
    return this.entradasService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.entradasService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateEntradaDto: UpdateEntradaDto) {
    return this.entradasService.update(+id, updateEntradaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.entradasService.remove(+id);
  }

  @Get('grupo/:grupoId')
  findByGrupo(@Param('grupoId') grupoId: string) {
    return this.entradasService.findByGrupoId(+grupoId);
  }


  @Get('hijos/:tutorId')
  async obtenerEntradasHijos(@Param('tutorId') tutorId: number) {
    return this.entradasService.obtenerEntradasPorTutor(tutorId);
  }
}
