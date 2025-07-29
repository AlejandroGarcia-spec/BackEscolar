import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { CreateTutoreDto } from './dto/create-tutore.dto';
import { UpdateTutoreDto } from './dto/update-tutore.dto';

@Controller('tutores')
export class TutoresController {
  constructor(private readonly tutoresService: TutoresService) {}

  @Post()
  create(@Body() createTutoreDto: CreateTutoreDto) {
    return this.tutoresService.create(createTutoreDto);
  }

  @Get()
  findAll() {
    return this.tutoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutoresService.findOne(+id);
  }

  @Patch(':id') // ← acepta un id como parámetro
  update(@Param('id') id: string, @Body() updateTutoreDto: UpdateTutoreDto) {
    return this.tutoresService.update(+id, updateTutoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutoresService.remove(+id);
  }
  @Put(':id')
  updatePut(@Param('id') id: string, @Body() updateTutoreDto: UpdateTutoreDto) {
    return this.tutoresService.update(+id, updateTutoreDto);
  }
}
