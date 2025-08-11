import { Alummno } from "src/alumnos/entities/alumno.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Salida {
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Alummno, (alumno) => alumno.salida)
    @JoinColumn({ name: 'alumnoId' })
    alumno: Alummno

    @CreateDateColumn()
    Date: Date;

    @Column()
    nombre_Recoge: string;

    @Column()
    alumnoId: number;
}
