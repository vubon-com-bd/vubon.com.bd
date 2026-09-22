import { SetMetadata } from '@nestjs/common';

export const OWN_VENDOR_KEY = 'ownVendorRequired';
export const OwnVendor = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_VENDOR_KEY, true);
