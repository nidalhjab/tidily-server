import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class ImgData {
    @Field(() => Int)
    id: number;

    @Field()
    @IsNotEmpty()
    img_file: string
}
