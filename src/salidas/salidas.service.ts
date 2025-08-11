import { Injectable, NotFoundException } from '@nestjs/common';
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

  
  async findAll() {
    return this._salidaRepo.find({
      relations: ['alumno', 'alumno.grupo'], 
      order: {
        Date: 'DESC' 
      }
    });
  }

  async findOne(id: number) {
    const salida = await this._salidaRepo.findOne({
      where: { id },
      relations: ['alumno', 'alumno.grupo'] 
    });
    
    if (!salida) {
      throw new NotFoundException('Salida no encontrada');
    }
    
    return salida;
  }

  update(id: number, updateSalidaDto: UpdateSalidaDto) {
    return this._salidaRepo.update(id, updateSalidaDto);
  }

  remove(id: number) {
    return this._salidaRepo.delete(id);
  }
}
