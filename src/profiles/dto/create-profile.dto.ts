import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    name: string;
}
