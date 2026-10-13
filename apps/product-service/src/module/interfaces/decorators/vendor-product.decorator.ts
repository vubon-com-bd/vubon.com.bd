/**
 * @VendorProduct() — marks route requiring vendor ownership
 * @module product-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const VENDOR_PRODUCT_META_KEY = 'product_vendor_product';

export const VendorProduct = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VENDOR_PRODUCT_META_KEY, true);
