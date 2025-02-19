import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/users/utils/role.enum';
import { ROLES_KEY } from './has-roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (
      !user ||
      !user.role ||
      !requiredRoles.some((role) => user.role?.includes(role))
    ) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }

    // return requiredRoles.some((role) => user.role?.includes(role));
    return true;
  }
}
