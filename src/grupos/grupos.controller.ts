import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

@Controller('grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post('post')
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.gruposService.create(createGrupoDto);
  }

  @Get('getAll')
  findAll() {
    return this.gruposService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.gruposService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.gruposService.update(+id, updateGrupoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.gruposService.remove(+id);
  }
}
