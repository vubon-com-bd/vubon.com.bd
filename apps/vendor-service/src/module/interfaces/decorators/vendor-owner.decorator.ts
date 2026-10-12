/**
 * VendorOwner decorator — marks a route whose :vendorId must match owner
 * @module vendor-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const VENDOR_OWNER_PARAM_KEY = 'vendor_owner_param';

export const VendorOwner = (paramName = 'vendorId'): MethodDecorator & ClassDecorator =>
  SetMetadata(VENDOR_OWNER_PARAM_KEY, paramName);
