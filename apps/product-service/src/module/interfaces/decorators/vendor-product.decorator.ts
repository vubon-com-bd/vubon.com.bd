import { SetMetadata } from '@nestjs/common';

export const VENDOR_PRODUCT_KEY = 'vendorProduct';
export const VendorProduct = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VENDOR_PRODUCT_KEY, true);
