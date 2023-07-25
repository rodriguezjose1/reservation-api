import { Inject, Injectable } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { IDesignDao, DESIGN_DAO } from './dao/dao.design.interface';

@Injectable()
export class DesignsService {
    constructor(@Inject(DESIGN_DAO) private designDao: IDesignDao) {}

    async create(data: CreateDesignDto): Promise<any> {
        const design = await this.designDao.create(data);

        return design;
    }

    async getBy(filter) {
        const design = await this.designDao.getBy(filter);

        return design;
    }

    async getById(id) {
        const design = await this.designDao.getById(id);

        return design;
    }

    async getOneBy(filter) {
        const design = await this.designDao.getOneBy(filter);

        return design;
    }
}
