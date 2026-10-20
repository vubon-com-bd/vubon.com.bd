/**
 * @VendorOrder() — marks route requiring vendor access
 * @module order-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const VENDOR_ORDER_META_KEY = 'order_vendor_check';

export const VendorOrder = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VENDOR_ORDER_META_KEY, true);
