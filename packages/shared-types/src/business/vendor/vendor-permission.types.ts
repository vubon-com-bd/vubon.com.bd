/**
 * Vendor Permission Value Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-permission.constants থেকে।
 */

import type { VENDOR_PERMISSION } from '@vubon/shared-constants/business';

export type VendorPermissionValue = (typeof VENDOR_PERMISSION)[keyof typeof VENDOR_PERMISSION];

export interface VendorPermissionGrant {
  readonly vendorId: string;
  readonly userId: string;
  readonly permission: VendorPermissionValue;
  readonly grantedBy: string;
  readonly grantedAt: string;
  readonly expiresAt?: string;
}

export interface VendorPermissionCheck {
  readonly vendorId: string;
  readonly userId: string;
  readonly permission: VendorPermissionValue;
  readonly granted: boolean;
  readonly checkedAt: string;
}
