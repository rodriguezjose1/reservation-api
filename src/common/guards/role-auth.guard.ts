import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly profilesService: ProfilesService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);
        if (!roles) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const isAllowed = await this.profilesService.isAllowedRole(user.profile._id, roles);

        if (!isAllowed) throw new ForbiddenException();

        return true;
    }
}
