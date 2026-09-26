import { SetMetadata } from '@nestjs/common';

export const CART_OWNER_KEY = 'cartOwner';

export interface CartOwnerOptions {
  readonly paramName?: string;
}

export const CartOwner = (
  options: CartOwnerOptions = {},
): MethodDecorator & ClassDecorator =>
  SetMetadata(CART_OWNER_KEY, {
    paramName: options.paramName ?? 'cartId',
  });
