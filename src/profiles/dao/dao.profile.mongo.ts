import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, defaultFields } from 'src/models/profile.model';
import { IProfileDao } from './dao.profile.interface';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Injectable()
export class ProfileMongoDao implements IProfileDao {
    constructor(@InjectModel(Profile.name) private readonly profileModel: Model<Profile>) {}

    async create(createProfileDto: CreateProfileDto): Promise<any> {
        const profile = await this.profileModel.create(createProfileDto);

        return profile;
    }

    getById(id: any): Promise<any> {
        return this.profileModel.findById(id, defaultFields).lean();
    }

    getOneBy(filter: any): Promise<any> {
        return this.profileModel.findOne(filter, defaultFields).lean();
    }

    getBy(filter: any): Promise<any> {
        return this.profileModel.find(filter, defaultFields).lean();
    }

    getAll(): Promise<any> {
        return this.profileModel.find({}, defaultFields).lean();
    }

    updateById(id: any, data: any): Promise<any> {
        return this.profileModel.findByIdAndUpdate(id, data);
    }

    deleteById(id: any): Promise<any> {
        return this.profileModel.findByIdAndDelete(id);
    }

    async isAllowedRole(role, roles: string[]) {
        const roleDB = await this.profileModel.findOne({ _id: role, code: { $in: roles } });

        if (roleDB) return true;

        return false;
    }
}
