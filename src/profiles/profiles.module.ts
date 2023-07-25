import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/models/profile.model';
import { PROFILES_DAO } from './dao/dao.profile.interface';
import { ProfileMongoDao } from './dao/dao.profile.mongo';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])],
    controllers: [ProfilesController],
    providers: [
        ProfilesService,
        {
            provide: PROFILES_DAO,
            useClass: ProfileMongoDao,
        },
    ],
    exports: [ProfilesService],
})
export class ProfilesModule {}
