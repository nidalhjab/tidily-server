import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CardsUpdates {

    @Field(() => Int)
    @IsNotEmpty()
    id: number;

    @Field(() => Int)
    @IsNotEmpty()
    listId: number;
    @Field(() => Int)
    @IsNotEmpty()
    userId: number;
    @Field()
    @IsNotEmpty()
    title: string;

    @Field()
    @IsNotEmpty()
    description: string;

    @Field({ nullable: true })
    comment: string;
}

