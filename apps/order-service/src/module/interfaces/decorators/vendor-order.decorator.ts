/**
 * @VendorOrder() — marks a route handler that requires vendor ownership
 */
import { SetMetadata } from '@nestjs/common';

export const VENDOR_ORDER_METADATA_KEY = 'vendorOrder';

export const VendorOrder = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VENDOR_ORDER_METADATA_KEY, true);
