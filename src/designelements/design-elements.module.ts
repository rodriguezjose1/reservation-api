import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignElement, DesignElementSchema } from 'src/models/designelement.model';
import { DESIGN_ELEMENT_DAO } from './dao/dao.designelement.interface';
import { DesignElementMongoDao } from './dao/dao.designelement.mongo';
import { DesignElementsController } from './design-elements.controller';
import { DesignElementsService } from './design-elements.service';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: DesignElement.name, schema: DesignElementSchema }]), ProfilesModule],
    controllers: [DesignElementsController],
    providers: [
        DesignElementsService,
        {
            provide: DESIGN_ELEMENT_DAO,
            useClass: DesignElementMongoDao,
        },
    ],
    exports: [DesignElementsService],
})
export class DesignElementsModule {}
