/**
 * VendorResponseDto — full vendor details
 * @module vendor-service/application/dtos/responses
 */
import type {
  VendorStatusValue,
  VendorTypeValue,
  VendorBusinessTypeValue,
  VendorTierValue,
} from '@vubon/shared-types/business/vendor';

export interface VendorAddressDto {
  readonly line1: string;
  readonly line2?: string;
  readonly city?: string;
  readonly upazila: string;
  readonly district: string;
  readonly division: string;
  readonly postalCode?: string;
  readonly country: string;
}

export interface VendorContactDto {
  readonly email: string;
  readonly phone?: string;
  readonly website?: string;
}

export interface VendorBrandingDto {
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
}

export interface VendorCommissionDto {
  readonly type: string;
  readonly percent: number;
  readonly fixedAmount?: number;
  readonly currency: string;
  readonly applyOnShipping: boolean;
  readonly applyOnTax: boolean;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
}

export interface VendorPayoutConfigDto {
  readonly method: string;
  readonly cycle: string;
  readonly minAmount: number;
  readonly autoPayout: boolean;
  readonly requireApproval: boolean;
  readonly bankAccountId?: string;
}

export interface VendorResponseDto {
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly slug: string;
  readonly displayName: string;
  readonly description?: string;
  readonly type: VendorTypeValue;
  readonly businessType: VendorBusinessTypeValue;
  readonly status: VendorStatusValue;
  readonly tier: VendorTierValue;
  readonly email: string;
  readonly contact: VendorContactDto;
  readonly address: VendorAddressDto;
  readonly branding: VendorBrandingDto;
  readonly commission?: VendorCommissionDto;
  readonly payoutConfig?: VendorPayoutConfigDto;
  readonly rating: number;
  readonly totalSales: number;
  readonly totalOrders: number;
  readonly isVerified: boolean;
  readonly isFeatured: boolean;
  readonly joinedAt: string;
  readonly approvedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VendorPublicDto {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly displayName: string;
  readonly description?: string;
  readonly type: VendorTypeValue;
  readonly tier: VendorTierValue;
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
  readonly rating: number;
  readonly totalSales: number;
  readonly isVerified: boolean;
  readonly isFeatured: boolean;
  readonly joinedAt: string;
}

export interface VendorSummaryDto {
  readonly id: string;
  readonly name: string;
  readonly displayName: string;
  readonly slug: string;
  readonly logoUrl?: string;
  readonly status: VendorStatusValue;
  readonly tier: VendorTierValue;
  readonly rating: number;
}
