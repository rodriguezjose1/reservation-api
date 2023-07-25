import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Element } from 'src/models/element.model';
import { IElementDao } from './dao.element.interface';
import { CreateElementDto } from '../dto/create-element.dto';

@Injectable()
export class ElementMongoDao implements IElementDao {
    constructor(@InjectModel(Element.name) private readonly elementModel: Model<Element>) {}

    async create(data: CreateElementDto): Promise<any> {
        const element = await this.elementModel.create(data);

        return element;
    }

    getById(id: any): Promise<any> {
        return this.elementModel.findById(id).lean();
    }

    getOneBy(filter: any): Promise<any> {
        return this.elementModel.findOne(filter).lean();
    }

    getBy(filter: any): Promise<any> {
        return this.elementModel.find(filter).lean();
    }

    updateById(id: any, data: any): Promise<any> {
        return this.elementModel.findByIdAndUpdate(id, data);
    }

    deleteById(id: any): Promise<any> {
        return this.elementModel.findByIdAndDelete(id);
    }
}
