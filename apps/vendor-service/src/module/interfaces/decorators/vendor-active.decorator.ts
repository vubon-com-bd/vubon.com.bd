import { SetMetadata } from '@nestjs/common';

export const VENDOR_ACTIVE_KEY = 'vendorActiveRequired';
export const VendorActive = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VENDOR_ACTIVE_KEY, true);
