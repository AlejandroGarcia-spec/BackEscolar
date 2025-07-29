import { Entrada } from "src/entradas/entities/entrada.entity";
import { Grupochido } from "src/grupos/entities/grupo.entity";
import { Salida } from "src/salidas/entities/salida.entity";
import { Tutore } from "src/tutores/entities/tutore.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Alummno {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    apellidoP: string;
    @Column()
    apellidoM: string;

    @ManyToOne(()=>Tutore,(tutore)=>tutore.alumno)
    tutor:Tutore

    @ManyToOne(()=>Grupochido,(grupo)=>grupo.alumno)
    grupo:Grupochido
    
    @OneToMany(()=>Entrada,(entrada)=>entrada.alumno)
    entrada:Entrada

    @OneToMany(()=>Salida,(salida)=>salida.alumno)
    salida:Salida

    @CreateDateColumn()
    createdAt: Date;


}
