import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import mongoose from 'mongoose';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configuration } from './common/config/env.config';
import { AllExceptionsFilter } from './common/exceptions/all.exceptions.filter';
import { CompaniesModule } from './companies/companies.module';
import { DesignElementsModule } from './designelements/design-elements.module';
import { DesignsModule } from './designs/designs.module';
import { ElementsModule } from './elements/elements.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';

mongoose.set('debug', true);

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 1,
            limit: 2,
        }),
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/.env_${process.env.NODE_ENV}`,
            load: [configuration],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('mongoUriConnection'),
                autoIndex: false,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        ProfilesModule,
        AuthModule,
        DesignsModule,
        ElementsModule,
        DesignElementsModule,
        ReservationsModule,
        CompaniesModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
