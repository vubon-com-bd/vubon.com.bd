import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OWN_PAYMENT_KEY } from '../decorators/own-payment.decorator';

interface AuthenticatedRequest {
  readonly user?: { readonly userId?: string; readonly roles?: readonly string[] };
  readonly params?: Readonly<Record<string, string>>;
  readonly payment?: { readonly userId?: string };
}

@Injectable()
export class OwnPaymentGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(OWN_PAYMENT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    const roles = user.roles ?? [];
    if (roles.includes('admin') || roles.includes('super_admin')) {
      return true;
    }

    const ownerId = request.payment?.userId;
    if (!ownerId || ownerId !== user.userId) {
      throw new ForbiddenException('You do not own this payment');
    }
    return true;
  }
}
