import { Entrada } from 'src/entradas/entities/entrada.entity';
import { Grupochido } from 'src/grupos/entities/grupo.entity';
import { Salida } from 'src/salidas/entities/salida.entity';
import { Tutore } from 'src/tutores/entities/tutore.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Alummno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column({ type: 'longtext', nullable: true })
  imagenBase64: string;

  @Column({ nullable: true })
  tutorId: number;

  @ManyToOne(() => Tutore, (tutor) => tutor.alumno, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'tutorId' })
  tutor: Tutore;

  @ManyToOne(() => Grupochido, (grupo) => grupo.alumnos, { nullable: false })
  grupo: Grupochido;

  @Column()
  grupoId: number;

  @OneToMany(() => Entrada, (entrada) => entrada.alumno)
  entrada: Entrada[];

  @OneToMany(() => Salida, (salida) => salida.alumno)
  salida: Salida[];

  @CreateDateColumn()
  createdAt: Date;
}
