import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { JoiValidationPipe } from 'src/common/validations/joi.validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { postUserSchema } from './users.validators';
import { Roles } from 'src/auth/roles/roles';
import { Role } from 'src/auth/roles/roles.enum';
import { RolesGuard } from 'src/common/guards/role-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/signup')
    async createUser(@Body(new JoiValidationPipe(postUserSchema.body)) data: any) {
        const user = await this.usersService.signup(data);

        return {
            success: true,
            data: { user },
        };
    }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body(new JoiValidationPipe(postUserSchema.body)) createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return {
            success: true,
            data: { user },
        };
    }

    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAll() {
        const users = await this.usersService.getAll();
        return {
            success: true,
            data: { users },
        };
    }
}
