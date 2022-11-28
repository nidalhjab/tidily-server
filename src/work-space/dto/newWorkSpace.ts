import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";



@InputType()
export class WorkSpaceData {
    @Field()
    @IsNotEmpty()
    name: string

    @Field(() => [String])
    members: string[]

    @Field(() => Int)
    userId: number

}