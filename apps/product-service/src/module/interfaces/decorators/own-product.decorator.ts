/**
 * @OwnProduct() — marks route requiring owner check
 * @module product-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const OWN_PRODUCT_META_KEY = 'product_own_product';

export const OwnProduct = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_PRODUCT_META_KEY, true);
