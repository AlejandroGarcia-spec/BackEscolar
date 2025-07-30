import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { CreateAdministradoreDto } from './dto/create-administradore.dto';
import { UpdateAdministradoreDto } from './dto/update-administradore.dto';

@Controller('administradores')
export class AdministradoresController {
  constructor(
    private readonly administradoresService: AdministradoresService,
  ) {}

  @Post('post')
  create(@Body() createAdministradoreDto: CreateAdministradoreDto) {
    return this.administradoresService.create(createAdministradoreDto);
  }

  @Get('getAll')
  findAll() {
    return this.administradoresService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.administradoresService.findOne(+id);
  }
  @Get('perfil/:correo')
  async getPerfil(@Param('correo') correo: string) {
    return await this.administradoresService.findByCorreo(correo);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateAdministradoreDto: UpdateAdministradoreDto,
  ) {
    return this.administradoresService.update(+id, updateAdministradoreDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.administradoresService.remove(+id);
  }

  @Post('login/admin')
  async loginAdmin(@Body() body: { correo: string; contrasena: string }) {
    const admin = await this.administradoresService.validateAdmin(
      body.correo,
      body.contrasena,
    );
    if (!admin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return { admin }; // o devuelve token si usas JWT
  }
}
