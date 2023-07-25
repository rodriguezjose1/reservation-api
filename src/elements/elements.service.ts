import { Inject, Injectable } from '@nestjs/common';
import { CreateElementDto } from './dto/create-element.dto';
import { IElementDao, ELEMENT_DAO } from './dao/dao.element.interface';

@Injectable()
export class ElementsService {
    constructor(@Inject(ELEMENT_DAO) private elementDao: IElementDao) {}

    async create(data: CreateElementDto): Promise<any> {
        const element = await this.elementDao.create(data);

        return element;
    }

    async getBy(filter) {
        const element = await this.elementDao.getBy(filter);

        return element;
    }

    async getById(id) {
        const element = await this.elementDao.getById(id);

        return element;
    }

    async getOneBy(filter) {
        const element = await this.elementDao.getOneBy(filter);

        return element;
    }
}
