import { SetMetadata } from '@nestjs/common';

export const VENDOR_APPROVED_KEY = 'vendorApprovedRequired';
export const VendorApproved = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VENDOR_APPROVED_KEY, true);
