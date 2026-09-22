import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CART_OWNER_KEY,
  type CartOwnerOptions,
} from '../decorators/cart-owner.decorator';

interface CartOwnerRequest {
  readonly user?: { readonly userId?: string };
  readonly params?: Readonly<Record<string, string>>;
  readonly cart?: { readonly userId?: string | null };
}

@Injectable()
export class CartOwnerGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const options = this.reflector.getAllAndOverride<CartOwnerOptions>(
      CART_OWNER_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!options) return true;

    const request = context.switchToHttp().getRequest<CartOwnerRequest>();
    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    const ownerId = request.cart?.userId;
    if (ownerId && ownerId !== user.userId) {
      throw new ForbiddenException('You do not own this cart');
    }
    return true;
  }
}
