import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OWN_CART_KEY } from '../decorators/own-cart.decorator';

interface AuthenticatedRequest {
  readonly user?: {
    readonly userId?: string;
    readonly roles?: readonly string[];
  };
}

@Injectable()
export class OwnCartGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(OWN_CART_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required) return true;

    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedRequest>();
    if (!request.user) {
      throw new ForbiddenException('Authentication required');
    }

    const roles = request.user.roles ?? [];
    if (roles.includes('admin') || roles.includes('super_admin')) {
      return true;
    }
    return true;
  }
}
