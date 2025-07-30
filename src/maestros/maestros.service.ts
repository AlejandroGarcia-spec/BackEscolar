import { Injectable } from '@nestjs/common';
import { CreateMaestroDto } from './dto/create-maestro.dto';
import { UpdateMaestroDto } from './dto/update-maestro.dto';
import { Repository } from 'typeorm';
import { Maestro } from './entities/maestro.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MaestrosService {
  @InjectRepository(Maestro)
  private maestroRepository: Repository<Maestro>;

  create(createMaestroDto: CreateMaestroDto) {
    const maestro = this.maestroRepository.create(createMaestroDto);
    return this.maestroRepository.save(maestro);
  }

  // maestros.service.ts
  async findAll(): Promise<Maestro[]> {
    return this.maestroRepository.find({
      relations: ['grupo'], // <- Esto asegura que se incluya el objeto grupo completo
    });
  }

  async findOne(id: number) {
    return this.maestroRepository.findOne({
      where: { id },
      relations: ['grupo'],
    });
  }

  update(id: number, updateMaestroDto: UpdateMaestroDto) {
    return this.maestroRepository.update(id, updateMaestroDto);
  }

  remove(id: number) {
    return this.maestroRepository.delete(id);
  }
  async validateMaestro(
    correo: string,
    contrasena: string,
  ): Promise<Maestro | null> {
    const maestro = await this.maestroRepository
      .createQueryBuilder('maestro')
      .addSelect('maestro.contrasena')
      .where('maestro.correo = :correo', { correo })
      .getOne();

    if (!maestro) return null;

    if (maestro.contrasena === contrasena) {
      return maestro;
    }

    return null;
  }

  async findByCorreo(correo: string): Promise<Maestro | null> {
    return await this.maestroRepository.findOne({ where: { correo } });
  }
}
