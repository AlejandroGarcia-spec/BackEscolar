import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alummno } from './entities/alumno.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Maestro } from 'src/maestros/entities/maestro.entity';
import { Grupochido } from 'src/grupos/entities/grupo.entity';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alummno)
    private readonly alumnoRepository: Repository<Alummno>,

    @InjectRepository(Maestro)
    private readonly maestroRepository: Repository<Maestro>,

    @InjectRepository(Grupochido)
    private readonly grupoRepository: Repository<Grupochido>,
  ) {}

  async create(createAlumnoDto: CreateAlumnoDto) {
    const { grupoId, tutorId, ...rest } = createAlumnoDto;

    const alumnoData: DeepPartial<Alummno> = {
      ...rest,
      grupo: { id: grupoId },
    };

    if (tutorId) {
      alumnoData.tutor = { id: tutorId };
    }

    const alumno = this.alumnoRepository.create(alumnoData);
    return await this.alumnoRepository.save(alumno);
  }

  findAll() {
    return this.alumnoRepository.find({ relations: ['grupo'] });
  }

  async findOne(id: number) {
    return await this.alumnoRepository.findOne({
      where: { id },
      relations: ['tutor', 'grupo'],
    });
  }
  async findByTutor(tutorId: number) {
    return await this.alumnoRepository.find({
      where: {
        tutor: { id: tutorId },
      },
      relations: ['tutor', 'grupo'],
    });
  }
  async findByGrupo(grupoId: number) {
    return await this.alumnoRepository.find({
      where: {
        grupo: { id: grupoId },
      },
      relations: ['tutor', 'grupo'],
    });
  }

  async findOneByIdAndTutor(alumnoId: number, tutorId: number) {
    return this.alumnoRepository.findOne({
      where: {
        id: alumnoId,
        tutor: { id: tutorId },
      },
      relations: ['grupo', 'tutor'],
    });
  }


  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    await this.alumnoRepository.update(id, updateAlumnoDto);
    return await this.alumnoRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.alumnoRepository.delete(id);
    return `This action removes a #${id} alumno`;
  }
  async obtenerPorMaestro(maestroId: number) {
    const maestro = await this.maestroRepository.findOne({
      where: { id: maestroId },
      relations: ['grupo'],
    });

    if (!maestro) {
      throw new NotFoundException('Maestro no encontrado');
    }

    const grupo = await this.grupoRepository.findOne({
      where: { id: maestro.grupo.id },
      relations: ['alumnos', 'alumnos.tutor'], // <- AQUÍ ESTÁ EL CAMBIO
    });

    if (!grupo) {
      throw new NotFoundException('Grupo no encontrado para el maestro');
    }

    return grupo.alumnos;
  }
}
