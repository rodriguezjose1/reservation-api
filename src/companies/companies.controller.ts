import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/common/validations/joi.validator';
import { CompaniesService } from './companies.service';
import { postCompanySchema } from './companies.validators';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Roles } from 'src/auth/roles/roles';
import { Role } from 'src/auth/roles/roles.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role-auth.guard';

@Controller('companies')
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompaniesController {
    constructor(private readonly companysService: CompaniesService) {}

    @Post()
    async create(@Body(new JoiValidationPipe(postCompanySchema.body)) createCompanyDto: CreateCompanyDto) {
        const company = await this.companysService.create(createCompanyDto);
        return {
            success: true,
            data: { company },
        };
    }

    @Get()
    async getAll() {
        const companys = await this.companysService.getAll();
        return {
            success: true,
            data: { companys },
        };
    }
}
