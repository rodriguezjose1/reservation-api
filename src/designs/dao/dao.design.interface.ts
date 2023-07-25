export const DESIGN_DAO = 'DESIGN_DAO';

export interface IDesignDao {
    create(data): Promise<any>;
    getById(id): Promise<any>;
    getOneBy(id): Promise<any>;
    getBy(id): Promise<any>;
    updateById(id, data): Promise<any>;
    deleteById(id): Promise<any>;
}
