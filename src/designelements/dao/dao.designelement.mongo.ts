import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultFields as reservationDF } from 'src/models/reservation.model';
import { DesignElement, defaultFields } from 'src/models/designelement.model';
import { IDesignElementDao } from './dao.designelement.interface';
import { CreateDesignElementDto } from '../dto/create-design-element.dto';

@Injectable()
export class DesignElementMongoDao implements IDesignElementDao {
    constructor(@InjectModel(DesignElement.name) private readonly designElementModel: Model<DesignElement>) {}

    async create(data: CreateDesignElementDto): Promise<any> {
        const designElement = await this.designElementModel.create(data);

        return designElement;
    }

    getById(id: any): Promise<any> {
        return this.designElementModel.findById(id).lean();
    }

    getOneBy(filter: any): Promise<any> {
        return this.designElementModel.findOne(filter).lean();
    }

    async getBy(filter: any): Promise<any> {
        console.time('req');
        const result = await this.designElementModel.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: 'reservations',
                    let: { de_id: '$_id' },
                    pipeline: [
                        { $match: { $expr: { $and: [{ $eq: ['$design_element', '$$de_id'] }, { $eq: ['$closed', false] }] } } },
                        { $project: reservationDF },
                    ],
                    as: 'reservation',
                },
            },
            { $unwind: { path: '$reservation', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    ...defaultFields,
                    reservation: {
                        $cond: {
                            if: { $not: ['$reservation'] },
                            then: null,
                            else: '$reservation',
                        },
                    },
                },
            },
        ]);
        console.timeEnd('req');

        return result;
    }

    // async getBy(filter: any): Promise<any> {
    //     console.time('req');
    //     const result = await this.designElementModel.find(filter).populate('reservations', ['user']).lean();
    //     console.timeEnd('req');

    //     return result;
    // }

    updateById(id: any, data: any): Promise<any> {
        return this.designElementModel.findByIdAndUpdate(id, data);
    }

    deleteById(id: any): Promise<any> {
        return this.designElementModel.findByIdAndDelete(id);
    }
}
