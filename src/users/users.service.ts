import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserDao, USERS_DAO } from './dao/dao.user.interface';
import * as bcrypt from 'bcrypt';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class UsersService {
    constructor(@Inject(USERS_DAO) private userDao: IUserDao, private profilesService: ProfilesService) {}

    async signup(data): Promise<any> {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        let user = await this.userDao.create({
            ...data,
            password_hash: hashedPassword,
        });

        user = user.toJSON();
        delete user.password_salt;
        delete user.password_hash;

        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.signup(createUserDto);

        return user;
    }

    async get(id) {
        const user = await this.userDao.getById(id);

        return user;
    }

    async getById(id) {
        const user = await this.userDao.getById(id);

        return user;
    }

    async getOneBy(filter) {
        const user = await this.userDao.getOneBy(filter);

        return user;
    }

    async getByUsernameWithPass(username) {
        const user = await this.userDao.getByUsernameWithPass(username);

        return user;
    }

    async getAll() {
        const user = await this.userDao.getAll();

        return user;
    }
}
