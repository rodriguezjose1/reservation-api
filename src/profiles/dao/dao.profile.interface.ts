export const PROFILES_DAO = 'PROFILES_DAO';

export interface IProfileDao {
    create(data): Promise<any>;
    getById(id): Promise<any>;
    getOneBy(id): Promise<any>;
    getBy(id): Promise<any>;
    getAll(): Promise<any>;
    updateById(id, data): Promise<any>;
    deleteById(id): Promise<any>;
    isAllowedRole(role, roles: string[]): Promise<any>;
}
