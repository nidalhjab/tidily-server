import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @InjectRepository(User)
        private readonly userRepositry: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    async validate(payload: { sub: number }) {
        const user = await this.userRepositry.findOne({
            where: {
                id: payload.sub,
            },
        });

        return { ...user, password: undefined };
    }
}
