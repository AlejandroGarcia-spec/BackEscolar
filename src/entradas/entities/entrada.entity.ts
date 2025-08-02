import { Alummno } from 'src/alumnos/entities/alumno.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Entrada {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Alummno, (alumno) => alumno.entrada, { onDelete: 'CASCADE' })
  alumno: Alummno;

  @CreateDateColumn()
  DateEntrada: Date;
}
