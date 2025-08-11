import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { Entrada } from './entities/entrada.entity';
import { Alummno } from 'src/alumnos/entities/alumno.entity';
import { UpdateEntradaDto } from './dto/update-entrada.dto';

@Injectable()
export class EntradasService {
  constructor(
    @InjectRepository(Entrada)
    private readonly entradaRepo: Repository<Entrada>,

    @InjectRepository(Alummno)
    private readonly alumnoRepo: Repository<Alummno>,
  ) { }

  async create(createEntradaDto: CreateEntradaDto) {
    const alumno = await this.alumnoRepo.findOne({
      where: { id: createEntradaDto.alumnoId },
    });
    if (!alumno) {
      throw new NotFoundException('Alumno no encontrado');
    }

    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);
    const finDia = new Date();
    finDia.setHours(23, 59, 59, 999);

    const yaExiste = await this.entradaRepo.findOne({
      where: {
        alumno: { id: createEntradaDto.alumnoId },
        DateEntrada: Between(inicioDia, finDia),
      },
    });

    if (yaExiste) {
      throw new ConflictException(
        'El alumno ya tiene una entrada registrada hoy.',
      );
    }

    const entrada = this.entradaRepo.create({ alumno });
    return this.entradaRepo.save(entrada);
  }
  findAll() {
    return this.entradaRepo.find({ relations: ['alumno'] });
  }

  findOne(id: number) {
    return this.entradaRepo.findOne({ where: { id }, relations: ['alumno'] });
  }

  async findByGrupoId(grupoId: number) {
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);
    const finDia = new Date();
    finDia.setHours(23, 59, 59, 999);

    return this.entradaRepo.find({
      where: {
        alumno: { grupoId: grupoId },
        DateEntrada: Between(inicioDia, finDia),
      },
      relations: ['alumno'],
    });
  }

  async update(id: number, updateEntradaDto: UpdateEntradaDto) {
    const entrada = await this.entradaRepo.findOneBy({ id });
    if (!entrada) throw new NotFoundException('Entrada no encontrada');

    Object.assign(entrada, updateEntradaDto);
    return this.entradaRepo.save(entrada);
  }

  async remove(id: number) {
    const entrada = await this.entradaRepo.findOneBy({ id });
    if (!entrada) throw new NotFoundException('Entrada no encontrada');

    return this.entradaRepo.remove(entrada);
  }
}
