import { ApiProperty } from '@nestjs/swagger';

class IPhone {
    country_code_number: string;
    country_code_string: string;
    number: string;
}

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: IPhone;

    profile;
}
