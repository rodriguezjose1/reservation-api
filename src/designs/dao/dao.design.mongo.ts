import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Design } from 'src/models/design.model';
import { IDesignDao } from './dao.design.interface';
import { CreateDesignDto } from '../dto/create-design.dto';

@Injectable()
export class DesignMongoDao implements IDesignDao {
    constructor(@InjectModel(Design.name) private readonly designModel: Model<Design>) {}

    async create(data: CreateDesignDto): Promise<any> {
        const design = await this.designModel.create(data);

        return design;
    }

    getById(id: any): Promise<any> {
        return this.designModel.findById(id).lean();
    }

    getOneBy(filter: any): Promise<any> {
        return this.designModel.findOne(filter).lean();
    }

    getBy(filter: any): Promise<any> {
        return this.designModel.find(filter).lean();
    }

    updateById(id: any, data: any): Promise<any> {
        return this.designModel.findByIdAndUpdate(id, data);
    }

    deleteById(id: any): Promise<any> {
        return this.designModel.findByIdAndDelete(id);
    }
}
