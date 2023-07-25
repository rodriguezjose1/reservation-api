import { Inject, Injectable } from '@nestjs/common';
import { COMPANIES_DAO, ICompanyDao } from './dao/dao.company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
    constructor(@Inject(COMPANIES_DAO) private companyDao: ICompanyDao) {}

    async create(data: CreateCompanyDto): Promise<any> {
        data.code = data.name
            .toLocaleLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/^a-zA-Z0-9 ]/g, '')
            .replace(/ /g, '_');
        const company = await this.companyDao.create(data);

        return company;
    }

    async get(id) {
        const company = await this.companyDao.getById(id);

        return company;
    }

    async getById(id) {
        const company = await this.companyDao.getById(id);

        return company;
    }

    async getOneBy(filter) {
        const company = await this.companyDao.getOneBy(filter);

        return company;
    }

    async getAll() {
        const companies = await this.companyDao.getAll();

        return companies;
    }
}
