import { Alummno } from "src/alumnos/entities/alumno.entity";
import { Conocido } from "src/conocidos/entities/conocido.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    parentesco: string;
    @Column()
    email: string;
    @Column()
    contrasena: string;
    
    @OneToMany(()=>Conocido,(conocido)=>conocido.tutor)
    conocido:Conocido

    @OneToMany(()=>Alummno,(alumno)=>alumno.tutor)
    alumno:Alummno

    @CreateDateColumn()
    createdAt: Date;
}
