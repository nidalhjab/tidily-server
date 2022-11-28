import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column({ unique: true })
    @Field()
    phone: string;

    @Column()
    @Field()
    password: string;

    @Column({ default: null, nullable: true })
    @Field({ nullable: true })
    img_file: string | null;

    @Field()
    token?: string
}