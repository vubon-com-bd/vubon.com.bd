/**
 * Vendor Commission Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-commission.constants থেকে।
 */

import type { VENDOR_COMMISSION_TYPE } from '@vubon/shared-constants/business';
import type { VendorId, Money } from '../../common/primitives';

export type VendorCommissionTypeValue =
  (typeof VENDOR_COMMISSION_TYPE)[keyof typeof VENDOR_COMMISSION_TYPE];

export interface VendorCommission {
  readonly vendorId: VendorId;
  readonly type: VendorCommissionTypeValue;
  readonly percent: number;
  readonly fixedAmount?: Money;
  readonly currency: string;
  readonly minPercent: number;
  readonly maxPercent: number;
  readonly applyOnShipping: boolean;
  readonly applyOnTax: boolean;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
  readonly updatedAt: string;
}

export interface VendorCommissionCalculation {
  readonly vendorId: VendorId;
  readonly orderId: string;
  readonly orderAmount: Money;
  readonly commissionAmount: Money;
  readonly vendorEarning: Money;
  readonly currency: string;
  readonly calculatedAt: string;
}

export interface CommissionTier {
  readonly minSales: number;
  readonly maxSales: number | null;
  readonly percent: number;
}
