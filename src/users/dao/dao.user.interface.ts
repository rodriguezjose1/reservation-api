export const USERS_DAO = 'USERS_DAO';

export interface IUserDao {
    create(data): Promise<any>;
    getById(id): Promise<any>;
    getOneBy(id): Promise<any>;
    getBy(id): Promise<any>;
    getAll(): Promise<any>;
    getByUsernameWithPass(username): Promise<any>;
    updateById(id, data): Promise<any>;
    deleteById(id): Promise<any>;
}
