/**
 * VendorStatus decorator — requires vendor to be in one of given statuses
 * @module vendor-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';
import type { VENDOR_STATUS } from '@vubon/shared-constants/business';

export type VendorStatusValue = (typeof VENDOR_STATUS)[keyof typeof VENDOR_STATUS];

export const REQUIRED_VENDOR_STATUS_KEY = 'required_vendor_status';

export const VendorStatus = (
  ...statuses: readonly VendorStatusValue[]
): MethodDecorator & ClassDecorator =>
  SetMetadata(REQUIRED_VENDOR_STATUS_KEY, statuses);
