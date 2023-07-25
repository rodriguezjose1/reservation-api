import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from 'src/common/guards/jwt-refresh-auth.guard';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('auth/login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('auth/refresh')
    @UseGuards(JwtRefreshGuard)
    async refresh(@Request() req) {
        return this.authService.login(req.user);
    }
}
