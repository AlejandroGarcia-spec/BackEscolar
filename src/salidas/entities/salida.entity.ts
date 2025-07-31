import { Alummno } from "src/alumnos/entities/alumno.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Salida {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Alummno,(alumno)=>alumno.salida)
    alumno:Alummno

    @CreateDateColumn()
    Date: Date;
    
    @Column()
    nombre_Recoge: string;
}
