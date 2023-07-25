import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from 'src/models/company.model';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { COMPANIES_DAO } from './dao/dao.company.interface';
import { CompanyMongoDao } from './dao/dao.company.mongo';

@Module({
    imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]), ProfilesModule],
    controllers: [CompaniesController],
    providers: [
        CompaniesService,
        {
            provide: COMPANIES_DAO,
            useClass: CompanyMongoDao,
        },
    ],
    exports: [CompaniesService],
})
export class CompaniesModule {}
