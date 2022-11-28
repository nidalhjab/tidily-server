import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";



@InputType()
export class GetUserWorkSpaces {
    @Field(() => Int)
    @IsNotEmpty()
    userId: number


}