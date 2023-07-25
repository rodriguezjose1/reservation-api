import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, defaultFields } from 'src/models/company.model';
import { ICompanyDao } from './dao.company.interface';
import { CreateCompanyDto } from '../dto/create-company.dto';

@Injectable()
export class CompanyMongoDao implements ICompanyDao {
    constructor(@InjectModel(Company.name) private readonly companyModel: Model<Company>) {}

    async create(createCompanyDto: CreateCompanyDto): Promise<any> {
        const company = await this.companyModel.create(createCompanyDto);

        return company;
    }

    getById(id: any): Promise<any> {
        return this.companyModel.findById(id, defaultFields).lean();
    }

    getOneBy(filter: any): Promise<any> {
        return this.companyModel.findOne(filter, defaultFields).lean();
    }

    getBy(filter: any): Promise<any> {
        return this.companyModel.find(filter, defaultFields).lean();
    }

    getAll(): Promise<any> {
        return this.companyModel.find({}, defaultFields).lean();
    }

    updateById(id: any, data: any): Promise<any> {
        return this.companyModel.findByIdAndUpdate(id, data);
    }

    deleteById(id: any): Promise<any> {
        return this.companyModel.findByIdAndDelete(id);
    }
}
