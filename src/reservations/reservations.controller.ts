import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JoiValidationPipe } from 'src/common/validations/joi.validator';
import { postReservation, putReservation } from './reservations.validators';
import { Roles } from 'src/auth/roles/roles';
import { Role } from 'src/auth/roles/roles.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role-auth.guard';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationervice: ReservationsService) {}

    @Post()
    @Roles(Role.Company)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body(new JoiValidationPipe(postReservation.body)) data: CreateReservationDto) {
        const reservation = await this.reservationervice.create(data);
        return {
            success: true,
            data: {
                reservation: reservation,
            },
        };
    }

    @Get()
    @Roles(Role.Company, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getBy(@Query() query) {
        const reservation = await this.reservationervice.getBy(query);

        return {
            success: true,
            data: {
                reservation: reservation,
            },
        };
    }

    @Put('/:id')
    @Get()
    @Roles(Role.Company)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateById(@Param('id') id, @Body(new JoiValidationPipe(putReservation.body)) body) {
        const reservation = await this.reservationervice.updateById(id, body);

        return {
            success: true,
            data: {
                reservation: reservation,
            },
        };
    }
}
