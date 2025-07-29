import { Maestro } from 'src/maestros/entities/maestro.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Alummno } from 'src/alumnos/entities/alumno.entity';

@Entity()
export class Grupochido {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @OneToMany(() => Alummno, (alumno) => alumno.grupo)
  alumnos: Alummno[];

  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(() => Maestro, (maestro) => maestro.grupo)
  maestros: Maestro[];
}
