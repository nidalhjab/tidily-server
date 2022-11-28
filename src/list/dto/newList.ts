import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class ListArgs {
    @Field(() => Int)
    @IsNotEmpty()
    userId: number;

    @Field(() => Int)
    @IsNotEmpty()
    workSpaceId: number;

    @Field()
    @IsNotEmpty()
    listName: string

    @Field(() => Int, { nullable: true })
    listId?: number
}