import { SetMetadata } from '@nestjs/common';

export const OWN_PRODUCT_KEY = 'ownProduct';
export const OwnProduct = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_PRODUCT_KEY, true);
