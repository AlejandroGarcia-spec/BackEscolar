import { Injectable } from '@nestjs/common';
import { CreateTutoreDto } from './dto/create-tutore.dto';
import { UpdateTutoreDto } from './dto/update-tutore.dto';
import { Repository } from 'typeorm';
import { Tutore } from './entities/tutore.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TutoresService {
  @InjectRepository(Tutore)
  private readonly tutoreRepository: Repository<Tutore>;

  async create(createTutoreDto: CreateTutoreDto) {
    const tutore = this.tutoreRepository.create(createTutoreDto);
    return await this.tutoreRepository.save(tutore);
  }

  async findAll() {
    return await this.tutoreRepository.find();
  }

  async findOne(id: number) {
    return await this.tutoreRepository.findOneBy({ id });
  }

  async update(id: number, updateTutoreDto: UpdateTutoreDto) {
    return await this.tutoreRepository.update(id, updateTutoreDto);
  }

  async remove(id: number) {
    return await this.tutoreRepository.delete(id);
  }
  async validateTutor(
    correo: string,
    contrasena: string,
  ): Promise<Tutore | null> {
    const tutor = await this.tutoreRepository.findOne({ where: { correo } });
    if (!tutor) return null;
    if (tutor.contrasena === contrasena) {
      return tutor;
    }
    return null;
  }
  async findByCorreo(correo: string): Promise<Tutore | null> {
    return await this.tutoreRepository.findOne({ where: { correo } });
  }
  findAllWithAlumnos(): Promise<Tutore[]> {
    return this.tutoreRepository.find({
      relations: ['alumno'],
    });
  }
}
