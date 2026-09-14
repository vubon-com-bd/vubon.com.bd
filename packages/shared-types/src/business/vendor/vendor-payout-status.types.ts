/**
 * Vendor Payout Status Value Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-payout-status.constants থেকে।
 */

import type { VENDOR_PAYOUT_STATUS } from '@vubon/shared-constants/business';

export type VendorPayoutStatusValue =
  (typeof VENDOR_PAYOUT_STATUS)[keyof typeof VENDOR_PAYOUT_STATUS];

export interface VendorPayoutStatusMetadata {
  readonly value: VendorPayoutStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
  readonly isSuccessful: boolean;
}
