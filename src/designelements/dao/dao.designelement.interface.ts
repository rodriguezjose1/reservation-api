export const DESIGN_ELEMENT_DAO = 'DESIGN_ELEMENT_DAO';

export interface IDesignElementDao {
    create(data): Promise<any>;
    getById(id): Promise<any>;
    getOneBy(id): Promise<any>;
    getBy(id): Promise<any>;
    updateById(id, data): Promise<any>;
    deleteById(id): Promise<any>;
}
