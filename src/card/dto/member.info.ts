import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class MemberInfo {
    @Field(() => Int)
    @IsNotEmpty()
    userId: number;

    @Field(() => Int)
    @IsNotEmpty()
    listId: number;

    @Field(() => Int)
    @IsNotEmpty()
    workSpaceId: number;

    @Field()
    @IsNotEmpty()
    memberName: string

}