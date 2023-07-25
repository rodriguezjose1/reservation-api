class IPhone {
    country_code_number: string;
    country_code_string: string;
    number: string;
}

export class IUserBase {
    name: string;
    lastname: string;
    username: string;
    password_salt: string;
    password_hash: string;
    email: string;
    phone: IPhone;
}
