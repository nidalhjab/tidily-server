import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CardInfo {
    @Field(() => Int)
    @IsNotEmpty()
    userId: number;

    @Field(() => Int)
    @IsNotEmpty()
    listId: number;


    @Field(() => [String], { nullable: true, defaultValue: null })
    memberName: string[];

    @Field(() => Int)
    @IsNotEmpty()
    workSpaceId: number;

    @Field()
    @IsNotEmpty()
    title: string;

    @Field()
    @IsNotEmpty()
    description: string;

    @Field({ nullable: true })
    comment: string;
}

