import { Inject, Injectable } from '@nestjs/common';
import { CreateDesignElementDto } from './dto/create-design-element.dto';
import { IDesignElementDao, DESIGN_ELEMENT_DAO } from './dao/dao.designelement.interface';

@Injectable()
export class DesignElementsService {
    constructor(@Inject(DESIGN_ELEMENT_DAO) private designElementDao: IDesignElementDao) {}

    async create(data: CreateDesignElementDto): Promise<any> {
        const designElement = await this.designElementDao.create(data);

        return designElement;
    }

    async getBy(filter) {
        const designElement = await this.designElementDao.getBy(filter);

        return designElement;
    }

    async getById(id) {
        const designElement = await this.designElementDao.getById(id);

        return designElement;
    }

    async getOneBy(filter) {
        const designElement = await this.designElementDao.getOneBy(filter);

        return designElement;
    }
}
