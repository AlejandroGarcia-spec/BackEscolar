import { Injectable, NotFoundException, ConflictException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { Entrada } from './entities/entrada.entity';
import { Alummno } from 'src/alumnos/entities/alumno.entity';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { Tutore } from 'src/tutores/entities/tutore.entity';
import { In } from 'typeorm';
import { Salida } from 'src/salidas/entities/salida.entity';

@Injectable()
export class EntradasService {
  constructor(
    @InjectRepository(Entrada)
    private readonly entradaRepo: Repository<Entrada>,

    @InjectRepository(Salida)
    private readonly salidaRepo: Repository<Salida>,

    @InjectRepository(Alummno)
    private readonly alumnoRepo: Repository<Alummno>,

    @InjectRepository(Tutore)
    private readonly tutorRepo: Repository<Tutore>,
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


  async obtenerEntradasPorTutor(tutorId: number) {
    const tutor = await this.tutorRepo.findOne({
      where: { id: tutorId },
      relations: ['alumno','alumno.grupo'],
    });

    if (!tutor) {
      throw new Error('Tutor no encontrado');
    }

    const alumnosIds = tutor.alumno.map((al) => al.id);

    if (alumnosIds.length === 0) {
      return [];
    }

    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);
    const finDia = new Date();
    finDia.setHours(23, 59, 59, 999);

    const entradas = await this.entradaRepo.find({
      where: {
        alumno: { id: In(alumnosIds) },
        DateEntrada: Between(inicioDia, finDia),
      },
      relations: ['alumno'],
      order: { DateEntrada: 'DESC' },
    });

    // Obtener salidas del día para los mismos alumnos
    const salidas = await this.salidaRepo.find({
      where: {
        alumnoId: In(alumnosIds),
        Date: Between(inicioDia, finDia),
      },
      order: { Date: 'DESC' },
    });

    // Mapear salidas para acceso rápido
    const salidaMap = new Map<number, Salida>();
    salidas.forEach(salida => {
      salidaMap.set(salida.alumnoId, salida);
    });

    // Construir respuesta combinada
    const resultado = tutor.alumno.map(alumno => {
      const entrada = entradas.find(e => e.alumno.id === alumno.id);
      const salida = salidaMap.get(alumno.id);

      return {
        id: alumno.id,
        nombre: alumno.nombre + ' ' + alumno.apellido,
        grupo: alumno.grupo?.nombre || '',
        entrada: entrada || null,
        salida: salida
          ? { 
              DateSalida: salida.Date, 
              recogidoPor: salida.nombre_Recoge 
            }
          : null,
      };
    });

    return resultado;
  }

}
