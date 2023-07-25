import { ConflictException, Inject, Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { IReservationDao, RESERVATION_DAO } from './dao/dao.reservation.interface';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { reservationOpen } from './reservation.errors';

@Injectable()
export class ReservationsService {
    constructor(@Inject(RESERVATION_DAO) private reservationDao: IReservationDao) {}

    async create(data: CreateReservationDto): Promise<any> {
        const reservation = await this.reservationDao.getOneBy({
            design_element: data.design_element,
            closed: false,
        });

        if (reservation) throw new PreconditionFailedException(reservationOpen);
        const newReservation = await this.reservationDao.create(data);

        return newReservation;
    }

    async getBy(filter) {
        const reservation = await this.reservationDao.getBy(filter);

        return reservation;
    }

    async getById(id) {
        const reservation = await this.reservationDao.getById(id);

        return reservation;
    }

    async getOneBy(filter) {
        const reservation = await this.reservationDao.getOneBy(filter);

        return reservation;
    }

    async updateById(id: any, data: any): Promise<any> {
        const reservationDB = await this.reservationDao.getById(id);
        // todo: set cause on cancelled, rejected
        if (!reservationDB) throw new NotFoundException('Not found reservation');
        if (reservationDB.closed) throw new ConflictException('Reservation is closed');
        let update = false;

        if (reservationDB.status !== data.status && data.status === 'matched') {
            data.matched_at = new Date();
            update = true;
        } else if (reservationDB.status !== data.status && data.status !== 'matched') {
            data.closed = true;
            data.closed_at = new Date();
            update = true;
        }

        let reservationUpdated = reservationDB;
        if (update) {
            reservationUpdated = await this.reservationDao.updateById(id, data);
        }

        return reservationUpdated;
    }

    deleteById(id: any): Promise<any> {
        return this.reservationDao.deleteById(id);
    }
}
