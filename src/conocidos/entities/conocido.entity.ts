import { Tutore } from "src/tutores/entities/tutore.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conocido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    @Column()
    apellido: string;
    
    @ManyToOne(() => Tutore, (tutore) => tutore.conocido)
    tutor: Tutore

    @Column({ type: 'longtext', nullable: true })
    foto: string;


}
