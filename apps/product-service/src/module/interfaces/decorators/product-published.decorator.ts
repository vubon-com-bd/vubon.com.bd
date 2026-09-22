import { SetMetadata } from '@nestjs/common';

export const PRODUCT_PUBLISHED_KEY = 'productPublished';
export const ProductPublished = (): MethodDecorator & ClassDecorator =>
  SetMetadata(PRODUCT_PUBLISHED_KEY, true);
