import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Design, DesignSchema } from 'src/models/design.model';
import { DESIGN_DAO } from './dao/dao.design.interface';
import { DesignMongoDao } from './dao/dao.design.mongo';
import { DesignsController } from './designs.controller';
import { DesignsService } from './designs.service';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Design.name, schema: DesignSchema }]), ProfilesModule],
    controllers: [DesignsController],
    providers: [
        DesignsService,
        {
            provide: DESIGN_DAO,
            useClass: DesignMongoDao,
        },
    ],
    exports: [DesignsService],
})
export class DesignsModule {}
