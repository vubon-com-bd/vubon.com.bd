import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GUEST_CART_KEY } from '../decorators/guest-cart.decorator';

interface GuestRequest {
  readonly headers: Readonly<Record<string, string | string[] | undefined>>;
  readonly user?: { readonly userId?: string };
}

@Injectable()
export class GuestCartGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(GUEST_CART_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required) return true;

    const request = context.switchToHttp().getRequest<GuestRequest>();
    if (request.user?.userId) return true;

    const raw = request.headers['x-guest-token'];
    const token = Array.isArray(raw) ? raw[0] : raw;
    if (!token || token.length < 16) {
      throw new BadRequestException('Missing or invalid guest token');
    }
    return true;
  }
}
