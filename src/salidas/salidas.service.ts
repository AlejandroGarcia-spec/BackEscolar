import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salida } from './entities/salida.entity';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { UpdateSalidaDto } from './dto/update-salida.dto';

@Injectable()
export class SalidasService {
  constructor(
    @InjectRepository(Salida)
    private _salidaRepo: Repository<Salida>,
  ) {}

  create(createSalidaDto: CreateSalidaDto) {
    const salida = this._salidaRepo.create(createSalidaDto);
    return this._salidaRepo.save(salida);
  }

  findAll() {
    return this._salidaRepo.find();
  }

  findOne(id: number) {
    return this._salidaRepo.findOne({ where: { id } });
  }

  update(id: number, updateSalidaDto: UpdateSalidaDto) {
    return this._salidaRepo.update(id, updateSalidaDto);
  }

  remove(id: number) {
    return this._salidaRepo.delete(id);
  }
}
