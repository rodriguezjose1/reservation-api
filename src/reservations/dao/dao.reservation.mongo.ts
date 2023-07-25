import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from 'src/models/reservation.model';
import { IReservationDao } from './dao.reservation.interface';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { IGetOneBy } from './dao.reservation.interfaces';

@Injectable()
export class ReservationMongoDao implements IReservationDao {
    constructor(@InjectModel(Reservation.name) private readonly reservationModel: Model<Reservation>) {}

    async create(data: CreateReservationDto): Promise<any> {
        const reservation = await this.reservationModel.create(data);

        return reservation;
    }

    getById(id: any): Promise<any> {
        return this.reservationModel.findById(id).lean();
    }

    getOneBy(filter: IGetOneBy): Promise<any> {
        return this.reservationModel.findOne(filter).lean();
    }

    getBy(filter: any): Promise<any> {
        return this.reservationModel.find(filter).lean();
    }

    updateById(id: any, data: any): Promise<any> {
        return this.reservationModel.findByIdAndUpdate(id, data, { new: true });
    }

    deleteById(id: any): Promise<any> {
        return this.reservationModel.findByIdAndDelete(id);
    }
}
