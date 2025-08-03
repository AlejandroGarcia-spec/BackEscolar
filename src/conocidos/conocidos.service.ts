import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConocidoDto } from './dto/create-conocido.dto';
import { UpdateConocidoDto } from './dto/update-conocido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conocido } from './entities/conocido.entity';
import { Repository } from 'typeorm';
import { Tutore } from 'src/tutores/entities/tutore.entity';

@Injectable()
export class ConocidosService {
  constructor(
    @InjectRepository(Conocido)
    private _conocidoRepo: Repository<Conocido>,

    @InjectRepository(Tutore)
    private _tutoreRepo: Repository<Tutore>,
  ) {}

  async create(createConocidoDto: CreateConocidoDto): Promise<Conocido> {
    const tutor = await this._tutoreRepo.findOne({
      where: { id: createConocidoDto.tutorId },
    });

    if (!tutor) throw new NotFoundException('Tutor no encontrado');

    const conocido = this._conocidoRepo.create({
      nombre: createConocidoDto.nombre,
      apellido: createConocidoDto.apellido,
      foto: createConocidoDto.foto,
      tutor,
    });

    return this._conocidoRepo.save(conocido);
  }

  findAll(): Promise<Conocido[]> {
    return this._conocidoRepo.find({ relations: ['tutor'] });
  }

  async findOne(id: number): Promise<Conocido> {
    const conocido = await this._conocidoRepo.findOne({
      where: { id },
      relations: ['tutor'],
    });

    if (!conocido) throw new NotFoundException('Conocido no encontrado');

    return conocido;
  }

  async findByTutorId(tutorId: number) {
  return this._conocidoRepo.find({
    where: { tutor: { id: tutorId } },
    relations: ['tutor'],
  });
}

  async update(id: number, dto: UpdateConocidoDto): Promise<Conocido> {
    const conocido = await this.findOne(id);

    if (dto.tutorId) {
      const tutor = await this._tutoreRepo.findOne({
        where: { id: dto.tutorId },
      });
      if (!tutor) throw new NotFoundException('Tutor no encontrado');
      conocido.tutor = tutor;
    }

    Object.assign(conocido, dto);
    return this._conocidoRepo.save(conocido);
  }

  async remove(id: number): Promise<void> {
    const conocido = await this.findOne(id);
    await this._conocidoRepo.remove(conocido);
  }
}