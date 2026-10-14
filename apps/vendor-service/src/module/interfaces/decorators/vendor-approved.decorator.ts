/**
 * @VendorApproved() — marks route requiring vendor in 'approved' state
 * @module vendor-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const VENDOR_APPROVED_META_KEY = 'vendor_approved';

export const VendorApproved = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VENDOR_APPROVED_META_KEY, true);
