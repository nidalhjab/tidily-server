import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { ImgData } from './dto/input/uploadImg.input';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }
    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return this.userService.findById(user.id);
    }

    @Mutation(() => User)
    async uploadImg(@Args('imgInfo') imgInfo: ImgData) {
        return this.userService.addPhoto(imgInfo);
    }

}
