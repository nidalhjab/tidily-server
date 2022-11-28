import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImgData } from './dto/input/uploadImg.input';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepo: Repository<User>) { }

    async findById(id: number) {
        const user = await this.userRepo.findOne({ where: { id } })
        return user;
    }

    async addPhoto(data: ImgData) {
        const { id, img_file } = data;
        const existingUser = await this.userRepo.findOne({ where: { id } });
        if (!existingUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        existingUser.img_file = img_file;
        try {
            const resp = await this.userRepo.save(existingUser)
            return { ...resp, password: undefined }
        }
        catch (err: any) {
            return { error: err }
        }
    }

}
