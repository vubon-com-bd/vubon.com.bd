/**
 * VendorPayoutResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type {
  VENDOR_PAYOUT_STATUS,
  VENDOR_PAYOUT_METHOD,
  VENDOR_PAYOUT_CYCLE,
} from '@vubon/shared-constants/business';

export interface VendorPayoutResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly payoutNumber: string;
  readonly status: (typeof VENDOR_PAYOUT_STATUS)[keyof typeof VENDOR_PAYOUT_STATUS];
  readonly method: (typeof VENDOR_PAYOUT_METHOD)[keyof typeof VENDOR_PAYOUT_METHOD];
  readonly cycle: (typeof VENDOR_PAYOUT_CYCLE)[keyof typeof VENDOR_PAYOUT_CYCLE];
  readonly amount: number;
  readonly fee: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly bankAccountId?: string;
  readonly transactionId?: string;
  readonly reference?: string;
  readonly notes?: string;
  readonly requestedAt: string;
  readonly approvedAt?: string;
  readonly paidAt?: string;
  readonly failedAt?: string;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VendorPayoutPublicDto {
  readonly id: string;
  readonly payoutNumber: string;
  readonly status: (typeof VENDOR_PAYOUT_STATUS)[keyof typeof VENDOR_PAYOUT_STATUS];
  readonly method: (typeof VENDOR_PAYOUT_METHOD)[keyof typeof VENDOR_PAYOUT_METHOD];
  readonly amount: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly requestedAt: string;
  readonly paidAt?: string;
}

export interface VendorPayoutSummaryDto {
  readonly vendorId: string;
  readonly totalPaid: number;
  readonly totalPending: number;
  readonly currency: string;
  readonly lastPayoutAt?: string;
  readonly nextPayoutAt?: string;
}

export interface VendorPayoutListResponseDto {
  readonly items: readonly VendorPayoutPublicDto[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
