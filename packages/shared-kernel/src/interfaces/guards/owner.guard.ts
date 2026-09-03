import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OWNER_KEY } from '../decorators/owner.decorator';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ownerConfig = this.reflector.get<{ userIdField: string; paramField: string }>(
      OWNER_KEY,
      context.getHandler()
    );

    if (!ownerConfig) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const userId = user.id || user.sub;
    const resourceUserId = params[ownerConfig.paramField] || params.id;

    // Admin users can bypass owner check
    if (user.role === 'admin' || user.role === 'super_admin') {
      return true;
    }

    if (userId !== resourceUserId) {
      throw new ForbiddenException('You can only access your own resources');
    }

    return true;
  }
}
