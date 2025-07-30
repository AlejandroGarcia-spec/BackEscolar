import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrada } from './entities/entrada.entity';
import { Alummno } from 'src/alumnos/entities/alumno.entity';

@Injectable()
export class EntradasService {
  constructor(
    @InjectRepository(Entrada)
    private _entradaRepo: Repository<Entrada>,

    @InjectRepository(Alummno)
    private _alumnoRepo: Repository<Alummno>,
  ) { }

  async create(createEntradaDto: CreateEntradaDto): Promise<Entrada> {
    const alumno = await this._alumnoRepo.findOne({
      where: { id: createEntradaDto.alumnoId },
    });

    if (!alumno) {
      throw new NotFoundException('Alumno no encontrado');
    }

    const entrada = this._entradaRepo.create({
      alumno,
    });

    return this._entradaRepo.save(entrada);
  }

  findAll(): Promise<Entrada[]> {
    return this._entradaRepo.find({ relations: ['alumno'] });
  }

  async findOne(id: number): Promise<Entrada> {
    const entrada = await this._entradaRepo.findOne({
      where: { id },
      relations: ['alumno'],
    });

    if (!entrada) {
      throw new NotFoundException('Entrada no encontrada');
    }

    return entrada;
  }

  async update(id: number, updateEntradaDto: UpdateEntradaDto): Promise<Entrada> {
    const entrada = await this.findOne(id);

    if (updateEntradaDto.alumnoId) {
      const alumno = await this._alumnoRepo.findOne({
        where: { id: updateEntradaDto.alumnoId },
      });
      if (!alumno) throw new NotFoundException('Alumno no encontrado');
      entrada.alumno = alumno;
    }

    return this._entradaRepo.save(entrada);
  }

  async remove(id: number): Promise<void> {
    const entrada = await this.findOne(id);
    await this._entradaRepo.remove(entrada);
  }
}


