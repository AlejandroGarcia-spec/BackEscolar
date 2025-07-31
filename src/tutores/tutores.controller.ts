import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { CreateTutoreDto } from './dto/create-tutore.dto';
import { UpdateTutoreDto } from './dto/update-tutore.dto';
import { Tutore } from './entities/tutore.entity';

@Controller('tutores')
export class TutoresController {
  constructor(private readonly tutoresService: TutoresService) {}

  @Post()
  create(@Body() createTutoreDto: CreateTutoreDto) {
    return this.tutoresService.create(createTutoreDto);
  }

  @Get()
  async findAll(): Promise<Tutore[]> {
    return this.tutoresService.findAllWithAlumnos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutoresService.findOne(+id);
  }

  @Patch(':id')
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
  @Post('login/tutor')
  async loginTutor(@Body() body: { correo: string; contrasena: string }) {
    const tutor = await this.tutoresService.validateTutor(
      body.correo,
      body.contrasena,
    );
    if (!tutor) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return { tutor };
  }
  @Get('perfil/:correo')
  async getPerfil(@Param('correo') correo: string) {
    return await this.tutoresService.findByCorreo(correo);
  }
}
