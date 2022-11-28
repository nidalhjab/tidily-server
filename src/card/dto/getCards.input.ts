import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class GetUserCards {
    @Field(() => Int)
    @IsNotEmpty()
    userId: number;

    @Field(() => Int)
    @IsNotEmpty()
    workSpaceId: number;

}