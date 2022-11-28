import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginArgs } from 'src/user/dto/input/login.input';
import { CreateUserInput } from 'src/user/dto/input/create-user.input';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }


    @Mutation(() => User)
    async SignIn(@Args('loginArgs') loginArgs: LoginArgs) {
        return await this.authService.login(loginArgs);
    }

    @Mutation(() => User)
    async SignUp(@Args('createUserData') createUserData: CreateUserInput) {
        return await this.authService.createUser(createUserData);
    }
}
