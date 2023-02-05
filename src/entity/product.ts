import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

//exportar o model da tabela de produtos - gerado pelo decorator
@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    image: string;

    @Column({default: 0})
    likes: number;

}