import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class GetUserLists {
    @Field(() => Int)
    @IsNotEmpty()
    userId: number;

    @Field(() => Int)
    @IsNotEmpty()
    workSpaceId: number

}