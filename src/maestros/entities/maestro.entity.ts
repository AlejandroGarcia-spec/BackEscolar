import { Alummno } from "src/alumnos/entities/alumno.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    grupo: string;

    // @OneToMany(()=>Alummno,(alumno)=>alumno.tutor)
    // alumno:Alummno

    @CreateDateColumn()
    createdAt: Date;
}
