/**
 * @CartOwner() — marks route requiring cart-owner check
 * @module cart-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const CART_OWNER_META_KEY = 'cart_service_cart_owner';

export interface CartOwnerOptions {
  readonly paramName?: string;
  readonly allowAdmin?: boolean;
}

export const CartOwner = (
  options: CartOwnerOptions = {},
): MethodDecorator & ClassDecorator =>
  SetMetadata(CART_OWNER_META_KEY, {
    paramName: options.paramName ?? 'cartId',
    allowAdmin: options.allowAdmin ?? true,
  });
