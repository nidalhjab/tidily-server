import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class WorkSpace {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column("text", { array: true })
    @Field(() => [String])
    members: string[];

    @Column()
    @Field(() => Int)
    userId: number

}