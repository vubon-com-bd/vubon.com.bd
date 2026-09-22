import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

interface CartRequest {
  readonly cart?: { readonly itemCount?: number };
}

@Injectable()
export class CartNotEmptyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<CartRequest>();
    const count = request.cart?.itemCount;
    if (count !== undefined && count === 0) {
      throw new ForbiddenException('Cart is empty');
    }
    return true;
  }
}
