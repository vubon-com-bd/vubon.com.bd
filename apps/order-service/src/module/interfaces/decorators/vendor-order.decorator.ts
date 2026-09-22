import { SetMetadata } from '@nestjs/common';

export const REQUIRE_VENDOR_ORDER_KEY = 'require_vendor_order';
export const RequireVendorOrder = (): MethodDecorator & ClassDecorator =>
  SetMetadata(REQUIRE_VENDOR_ORDER_KEY, true);
