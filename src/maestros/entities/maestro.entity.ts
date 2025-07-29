import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grupochido } from 'src/grupos/entities/grupo.entity';

@Entity()
export class Maestro {
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

  @Column({ select: false })
  contrasena: string;

  @ManyToOne(() => Grupochido, (grupo) => grupo.maestros)
  grupo: Grupochido;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'longtext', nullable: true })
  imagenBase64: string;
  @Column()
  grupoId: number; // <-- campo explícito de FK
}
