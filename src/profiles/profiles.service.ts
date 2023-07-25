import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { IProfileDao, PROFILES_DAO } from './dao/dao.profile.interface';

@Injectable()
export class ProfilesService {
    constructor(@Inject(PROFILES_DAO) private profileDao: IProfileDao) {}

    async create(createProfileDto: CreateProfileDto): Promise<any> {
        const profile = await this.profileDao.create(createProfileDto);

        return profile;
    }

    async get(id) {
        const profile = await this.profileDao.getById(id);

        return profile;
    }

    async getById(id) {
        const profile = await this.profileDao.getById(id);

        return profile;
    }

    async getOneBy(filter) {
        const profile = await this.profileDao.getOneBy(filter);

        return profile;
    }

    async getAll() {
        const profile = await this.profileDao.getAll();

        return profile;
    }

    isAllowedRole(role, roles: string[]) {
        return this.profileDao.isAllowedRole(role, roles);
    }
}
