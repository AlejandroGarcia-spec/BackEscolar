import { Alummno } from 'src/alumnos/entities/alumno.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Tutore {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  telefono: number;
  @Column()
  correo: string;
  @Column()
  contrasena: string;
  @OneToMany(() => Alummno, (alumno) => alumno.tutor)
  alumno: Alummno[];
  @CreateDateColumn()
  createdAt: Date;
  @Column({ type: 'longtext', nullable: true })
  imagenBase64: string;
}
