import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class Post extends BaseEntity{

    @PrimaryGeneratedColumn({
        comment: "The post identifier"
    })
    id: number

    @Column({
        type: 'varchar'
    })
    title: string

    @Column({
        type: 'text'
    })
    body: string

    @Column({
        type: 'text',
        default: "active"
    })
    status: string

    @Column({
        type: 'int'
    })
    createdBy:number

    @Column({
        type: 'int'
    })
    latitude:number

    @Column({
        type: 'int'
    })
    longitude:number
}