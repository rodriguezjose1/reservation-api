import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.model';
import { USERS_DAO } from './dao/dao.user.interface';
import { UserMongoDao } from './dao/dao.user.mongo';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), ProfilesModule],
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: USERS_DAO,
            useClass: UserMongoDao,
        },
    ],
    exports: [UsersService],
})
export class UsersModule {}
