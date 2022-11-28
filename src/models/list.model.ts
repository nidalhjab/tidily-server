import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class List {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    listName: string;

    @Column()
    @Field(() => Int)
    workSpaceId: number

    @Column()
    @Field(() => Int)
    userId: number;

}