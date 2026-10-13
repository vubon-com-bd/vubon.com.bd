/**
 * @ProductPublished() — marks route requiring published product
 * @module product-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const PRODUCT_PUBLISHED_META_KEY = 'product_product_published';

export const ProductPublished = (): MethodDecorator & ClassDecorator =>
  SetMetadata(PRODUCT_PUBLISHED_META_KEY, true);
