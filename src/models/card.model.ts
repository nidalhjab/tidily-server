import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Card {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field(() => Int)
    listId: number;

    @Column()
    @Field(() => Int)
    workSpaceId: number;

    @Column()
    @Field(() => Int)
    userId: number;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    comment: string;

    @Column("text", { array: true, nullable: true, default: null })
    @Field(() => [String] || null, { nullable: true, defaultValue: null })
    memberName: string[] | null;

}