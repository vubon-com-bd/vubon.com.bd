/**
 * @OwnCart() — marks route requiring own-cart check
 * @module cart-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const OWN_CART_META_KEY = 'cart_service_own_cart';

export const OwnCart = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_CART_META_KEY, true);
