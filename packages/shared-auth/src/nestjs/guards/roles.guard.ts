import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AuthContext } from '@vubon/shared-types/auth';
import { hasRole } from '../../common/role/role.checker';
import type { Role } from '../../common/role/role.types';
import { ROLES_KEY } from '../decorators/roles.decorator';

interface RequestWithUser {
  user?: AuthContext;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<readonly Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const user = req.user;
    if (!user) throw new ForbiddenException('No authenticated user');

    const userRoles = user.roles as readonly Role[];
    if (!hasRole(userRoles, required, 'any')) {
      throw new ForbiddenException('Insufficient role');
    }
    return true;
  }
}
