import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/common/validations/joi.validator';
import { CreateElementDto } from './dto/create-element.dto';
import { ElementsService } from './elements.service';
import { postElement } from './elements.validators';
import { Roles } from 'src/auth/roles/roles';
import { Role } from 'src/auth/roles/roles.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role-auth.guard';

@Controller('elements')
export class ElementsController {
    constructor(private readonly elementService: ElementsService) {}

    @Post()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body(new JoiValidationPipe(postElement.body)) data: CreateElementDto) {
        const element = await this.elementService.create(data);

        return {
            success: true,
            data: {
                element,
            },
        };
    }

    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getBy(@Query() query) {
        const elements = await this.elementService.getBy(query);

        return {
            success: true,
            data: {
                elements,
            },
        };
    }
}
