import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Grupochido } from './entities/grupo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GruposService {
  @InjectRepository(Grupochido)
  private readonly grupoRepository: Repository<Grupochido>;

  create(createGrupoDto: CreateGrupoDto) {
    const grupo = this.grupoRepository.create(createGrupoDto);
    return this.grupoRepository.save(grupo);
  }

  findAll() {
    return this.grupoRepository.find();
  }

  findOne(id: number) {
    return this.grupoRepository.findOne({ where: { id } });
  }

  update(id: number, updateGrupoDto: UpdateGrupoDto) {
    return this.grupoRepository.update(id, updateGrupoDto);
  }

  async remove(id: number): Promise<string> {
    const grupo = await this.grupoRepository.findOne({
      where: { id },
      relations: ['alumnos', 'maestros'], // Asegúrate que están bien nombradas
    });

    if (!grupo) {
      throw new NotFoundException('Grupo no encontrado');
    }

    const tieneAlumnos = grupo.alumnos && grupo.alumnos.length > 0;
    const tieneMaestros = grupo.maestros && grupo.maestros.length > 0;

    if (tieneAlumnos || tieneMaestros) {
      throw new BadRequestException(
        'No se puede eliminar el grupo porque tiene alumnos o maestros asignados.',
      );
    }

    await this.grupoRepository.remove(grupo);

    return 'Grupo eliminado correctamente';
  }
}
