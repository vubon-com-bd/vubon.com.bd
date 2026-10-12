/**
 * VendorSettlementResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type { VENDOR_SETTLEMENT_STATUS } from '@vubon/shared-constants/business';

export interface VendorSettlementResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly settlementNumber: string;
  readonly status: (typeof VENDOR_SETTLEMENT_STATUS)[keyof typeof VENDOR_SETTLEMENT_STATUS];
  readonly grossAmount: number;
  readonly commissionAmount: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly orderCount: number;
  readonly payoutId?: string;
  readonly processedAt?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
