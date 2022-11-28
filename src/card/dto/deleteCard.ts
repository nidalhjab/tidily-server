import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteCardArgs {
    @Field(() => Int)
    @IsNotEmpty()
    userId: number;

    @Field(() => Int)
    @IsNotEmpty()
    cardId: number;

}