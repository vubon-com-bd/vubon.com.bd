import { SetMetadata } from '@nestjs/common';

export const GUEST_CART_KEY = 'guestCart';

export const GuestCart = (): MethodDecorator & ClassDecorator =>
  SetMetadata(GUEST_CART_KEY, true);
