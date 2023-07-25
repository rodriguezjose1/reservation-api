import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Element, ElementSchema } from 'src/models/element.model';
import { ELEMENT_DAO } from './dao/dao.element.interface';
import { ElementMongoDao } from './dao/dao.element.mongo';
import { ElementsController } from './elements.controller';
import { ElementsService } from './elements.service';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Element.name, schema: ElementSchema }]), ProfilesModule],
    controllers: [ElementsController],
    providers: [
        ElementsService,
        {
            provide: ELEMENT_DAO,
            useClass: ElementMongoDao,
        },
    ],
    exports: [ElementsService],
})
export class ElementsModule {}
