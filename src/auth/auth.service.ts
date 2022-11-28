import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginArgs } from 'src/user/dto/input/login.input';
import { CreateUserInput } from 'src/user/dto/input/create-user.input';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private jwt: JwtService,
    ) { }

    async createUser(userData: CreateUserInput) {
        const email = userData.email;
        const phone = userData.phone;
        const validationInput = await Promise.all([
            this.userRepo.findOne({ where: { email } }),
            this.userRepo.findOne({ where: { phone } })
        ])
        if (validationInput[0]) {
            throw new HttpException('Email already exist', HttpStatus.CONFLICT);
        }
        else if (validationInput[1]) {
            throw new HttpException('Phone already exist', HttpStatus.CONFLICT);
        } else {
            const hash = bcrypt.hashSync(userData.password, 10);
            const newUser = this.userRepo.create({
                ...userData,
                password: hash
            });
            try {
                const response = await this.userRepo.save(newUser)
                return response
            }
            catch (err) {
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }
    }

    async login(credentials: LoginArgs) {
        const { email, password } = credentials;
        const existingUser = await this.userRepo.findOne({ where: { email } });
        if (!existingUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            throw new HttpException('Incorrect Password', HttpStatus.NOT_FOUND);
        }
        const token = await this.signToken(existingUser.id);
        existingUser.token = token;
        delete existingUser.password
        return existingUser

    }

    async signToken(userId: number) {
        const payload = {
            sub: userId,
        };
        const token = await this.jwt.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });
        return token
    }
}
