import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, defaultFields } from 'src/models/user.model';
import { IUserDao } from './dao.user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserMongoDao implements IUserDao {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.userModel.create(createUserDto);

        return user;
    }

    getByUsernameWithPass(username: any): Promise<any> {
        return this.userModel
            .findOne({ username }, { ...defaultFields, password_hash: 1 })
            .populate('profile')
            .lean();
    }

    getById(id: any): Promise<any> {
        return this.userModel.findById(id, defaultFields).populate('profile').lean();
    }

    getOneBy(filter: any): Promise<any> {
        return this.userModel.findOne(filter, defaultFields).lean();
    }

    getBy(filter: any): Promise<any> {
        return this.userModel.find(filter, defaultFields).lean();
    }

    getAll(): Promise<any> {
        return this.userModel.find({}, defaultFields).lean();
    }

    updateById(id: any, data: any): Promise<any> {
        return this.userModel.findByIdAndUpdate(id, data);
    }

    deleteById(id: any): Promise<any> {
        return this.userModel.findByIdAndDelete(id);
    }
}
