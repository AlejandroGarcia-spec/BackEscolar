import { Injectable } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alummno } from './entities/alumno.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class AlumnosService {
  @InjectRepository(Alummno)
  private readonly alumnoRepository: Repository<Alummno>;
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

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    await this.alumnoRepository.update(id, updateAlumnoDto);
    return await this.alumnoRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.alumnoRepository.delete(id);
    return `This action removes a #${id} alumno`;
  }
}
