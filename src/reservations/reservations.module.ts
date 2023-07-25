import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Reservation, ReservationSchema } from 'src/models/reservation.model';
import { RESERVATION_DAO } from './dao/dao.reservation.interface';
import { ReservationMongoDao } from './dao/dao.reservation.mongo';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]), ProfilesModule],
    controllers: [ReservationsController],
    providers: [
        ReservationsService,
        {
            provide: RESERVATION_DAO,
            useClass: ReservationMongoDao,
        },
    ],
    exports: [ReservationsService],
})
export class ReservationsModule {}
