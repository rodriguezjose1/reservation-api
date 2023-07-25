export const ELEMENT_DAO = 'ELEMENT_DAO';

export interface IElementDao {
    create(data): Promise<any>;
    getById(id): Promise<any>;
    getOneBy(id): Promise<any>;
    getBy(id): Promise<any>;
    updateById(id, data): Promise<any>;
    deleteById(id): Promise<any>;
}
