import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { DesignElementsService } from './design-elements.service';
import { postDesignElements } from './design-elements.validators';
import { CreateDesignElementDto } from './dto/create-design-element.dto';
import { JoiValidationPipe } from 'src/common/validations/joi.validator';
import { Roles } from 'src/auth/roles/roles';
import { Role } from 'src/auth/roles/roles.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role-auth.guard';

@Controller('design-elements')
export class DesignElementsController {
    constructor(private readonly designElementService: DesignElementsService) {}

    @Post()
    @Roles(Role.Company)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body(new JoiValidationPipe(postDesignElements.body)) data: CreateDesignElementDto) {
        const designElement = await this.designElementService.create(data);
        return {
            success: true,
            data: {
                design_element: designElement,
            },
        };
    }

    @Get()
    @Roles(Role.Company)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getBy(@Query() query) {
        const designElements = await this.designElementService.getBy(query);

        return {
            success: true,
            data: {
                design_elements: designElements,
            },
        };
    }
}
