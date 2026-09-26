import { SetMetadata } from '@nestjs/common';

export const OWN_CART_KEY = 'ownCart';

export const OwnCart = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_CART_KEY, true);
