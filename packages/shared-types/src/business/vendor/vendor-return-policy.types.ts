/**
 * Vendor Return Policy Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-return-policy.constants থেকে।
 */

import type { VENDOR_RETURN_TYPE } from '@vubon/shared-constants/business';
import type { VendorId, Money } from '../../common/primitives';

export type VendorReturnTypeValue = (typeof VENDOR_RETURN_TYPE)[keyof typeof VENDOR_RETURN_TYPE];

export interface VendorReturnPolicy {
  readonly vendorId: VendorId;
  readonly type: VendorReturnTypeValue;
  readonly windowDays: number;
  readonly freeReturn: boolean;
  readonly restockFeePercent: number;
  readonly maxRestockFee?: Money;
  readonly requireReason: boolean;
  readonly requireImages: boolean;
  readonly maxImages: number;
  readonly autoApprove: boolean;
  readonly approvalSlaHours: number;
  readonly exclusions?: readonly string[];
  readonly notes?: string;
  readonly updatedAt: string;
}

export interface VendorReturnPolicyInput {
  readonly vendorId: VendorId;
  readonly type: VendorReturnTypeValue;
  readonly windowDays: number;
  readonly freeReturn?: boolean;
  readonly restockFeePercent?: number;
  readonly requireReason?: boolean;
  readonly requireImages?: boolean;
}
