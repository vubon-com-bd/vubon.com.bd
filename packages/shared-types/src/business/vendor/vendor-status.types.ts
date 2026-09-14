/**
 * Vendor Status Value Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-status.constants থেকে।
 */

import type { VENDOR_STATUS } from '@vubon/shared-constants/business';

export type VendorStatusValue = (typeof VENDOR_STATUS)[keyof typeof VENDOR_STATUS];

export interface VendorStatusMetadata {
  readonly value: VendorStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
