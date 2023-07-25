import { IGetOneBy } from './dao.reservation.interfaces';

export const RESERVATION_DAO = 'RESERVATION_DAO';

export interface IReservationDao {
    create(data): Promise<any>;
    getById(id): Promise<any>;
    getOneBy(filter: IGetOneBy): Promise<any>;
    getBy(id): Promise<any>;
    updateById(id, data): Promise<any>;
    deleteById(id): Promise<any>;
}
