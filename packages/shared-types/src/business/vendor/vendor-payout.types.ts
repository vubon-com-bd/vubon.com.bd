/**
 * Vendor Payout Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-payout.constants থেকে।
 */

import type { VENDOR_PAYOUT_METHOD, VENDOR_PAYOUT_CYCLE } from '@vubon/shared-constants/business';
import type { VendorId, Money } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { VendorPayoutStatusValue } from './vendor-payout-status.types';

export type VendorPayoutMethodValue =
  (typeof VENDOR_PAYOUT_METHOD)[keyof typeof VENDOR_PAYOUT_METHOD];

export type VendorPayoutCycleValue = (typeof VENDOR_PAYOUT_CYCLE)[keyof typeof VENDOR_PAYOUT_CYCLE];

export interface VendorPayout extends BaseEntity<string> {
  readonly vendorId: VendorId;
  readonly payoutNumber: string;
  readonly status: VendorPayoutStatusValue;
  readonly method: VendorPayoutMethodValue;
  readonly cycle: VendorPayoutCycleValue;
  readonly amount: Money;
  readonly currency: string;
  readonly fee?: Money;
  readonly netAmount: Money;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly transactionId?: string;
  readonly reference?: string;
  readonly bankAccountId?: string;
  readonly notes?: string;
  readonly requestedAt: string;
  readonly approvedAt?: string;
  readonly paidAt?: string;
  readonly failedAt?: string;
  readonly failureReason?: string;
}

export interface VendorPayoutPublic {
  readonly id: string;
  readonly payoutNumber: string;
  readonly status: VendorPayoutStatusValue;
  readonly method: VendorPayoutMethodValue;
  readonly amount: Money;
  readonly netAmount: Money;
  readonly currency: string;
  readonly requestedAt: string;
  readonly paidAt?: string;
}

export interface VendorPayoutRequestInput {
  readonly vendorId: VendorId;
  readonly amount: Money;
  readonly method: VendorPayoutMethodValue;
  readonly bankAccountId?: string;
  readonly notes?: string;
}

export interface VendorPayoutSummary {
  readonly vendorId: VendorId;
  readonly totalPaid: Money;
  readonly totalPending: Money;
  readonly currency: string;
  readonly lastPayoutAt?: string;
  readonly nextPayoutAt?: string;
}

export interface VendorPayoutFilter {
  readonly vendorId?: VendorId;
  readonly status?: VendorPayoutStatusValue;
  readonly method?: VendorPayoutMethodValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
