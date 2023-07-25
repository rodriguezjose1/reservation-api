export const COMPANIES_DAO = 'COMPANIES_DAO';

export interface ICompanyDao {
    create(data): Promise<any>;
    getById(id): Promise<any>;
    getOneBy(id): Promise<any>;
    getBy(id): Promise<any>;
    getAll(): Promise<any>;
    updateById(id, data): Promise<any>;
    deleteById(id): Promise<any>;
}
