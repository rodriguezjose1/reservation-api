import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { DesignsService } from './designs.service';
import { CreateDesignDto } from './dto/create-design.dto';
import { JoiValidationPipe } from 'src/common/validations/joi.validator';
import { postDesign } from './designs.validators';
import { Roles } from 'src/auth/roles/roles';
import { Role } from 'src/auth/roles/roles.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role-auth.guard';

@Controller('designs')
export class DesignsController {
    constructor(private readonly designervice: DesignsService) {}

    @Post()
    @Roles(Role.Company)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body(new JoiValidationPipe(postDesign.body)) data: CreateDesignDto) {
        const design = await this.designervice.create(data);
        return {
            success: true,
            data: {
                design_element: design,
            },
        };
    }

    @Get()
    @Roles(Role.Company)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getBy(@Query() query) {
        const designs = await this.designervice.getBy(query);

        return {
            success: true,
            data: {
                designs,
            },
        };
    }
}
