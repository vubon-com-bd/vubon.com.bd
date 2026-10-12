/**
 * VendorCommissionResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type { VENDOR_COMMISSION_TYPE } from '@vubon/shared-constants/business';

export interface VendorCommissionResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly type: (typeof VENDOR_COMMISSION_TYPE)[keyof typeof VENDOR_COMMISSION_TYPE];
  readonly percent: number;
  readonly fixedAmount?: number;
  readonly currency: string;
  readonly minPercent: number;
  readonly maxPercent: number;
  readonly applyOnShipping: boolean;
  readonly applyOnTax: boolean;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CommissionCalculationResponseDto {
  readonly vendorId: string;
  readonly orderAmount: number;
  readonly baseAmount: number;
  readonly percentPart: number;
  readonly fixedPart: number;
  readonly totalCommission: number;
  readonly vendorEarning: number;
  readonly currency: string;
  readonly calculatedAt: string;
}
