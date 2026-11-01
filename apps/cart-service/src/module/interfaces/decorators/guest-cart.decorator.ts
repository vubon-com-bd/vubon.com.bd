/**
 * @GuestCart() — marks route as guest-cart accessible
 * @module cart-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const GUEST_CART_META_KEY = 'cart_service_guest_cart';

export const GuestCart = (): MethodDecorator & ClassDecorator =>
  SetMetadata(GUEST_CART_META_KEY, true);
