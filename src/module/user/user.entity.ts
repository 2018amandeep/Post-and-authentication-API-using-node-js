import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type:'varchar'
    })
    name: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column()
    createdAt: number

    @Column()
    updatedAt: number
}