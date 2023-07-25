import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
    company: string;
    user: string;
    design_element: string;
    date_start: Date;
    date_end: Date;
}
