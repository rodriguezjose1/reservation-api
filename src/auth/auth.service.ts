import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getByUsernameWithPass(username);

        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password_hash);
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            delete user.password_hash;
            return user;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            user,
            access_token: this.jwtService.sign(payload, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }),
            refresh_token: this.jwtService.sign(payload, {
                secret: process.env.REFRESH_TOKEN_SECRET,
                expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
            }),
        };
    }
}
