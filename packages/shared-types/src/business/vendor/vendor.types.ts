/**
 * Vendor Core Types
 * @module shared-types/business/vendor
 *
 * Vendor entity + aggregator।
 */

import type { VendorId, UserId, Email, Phone, Slug, Url } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { Address } from '../../common/geo';
import type { VendorStatusValue } from './vendor-status.types';
import type { VendorTypeValue, VendorBusinessTypeValue } from './vendor-type.types';
import type { VendorTierValue } from './vendor-tier.types';
import type { VendorCommission } from './vendor-commission.types';
import type { VendorReturnPolicy } from './vendor-return-policy.types';

export interface Vendor extends BaseEntity<VendorId> {
  readonly userId: UserId;
  readonly name: string;
  readonly slug: Slug;
  readonly displayName: string;
  readonly description?: string;
  readonly type: VendorTypeValue;
  readonly businessType: VendorBusinessTypeValue;
  readonly status: VendorStatusValue;
  readonly tier: VendorTierValue;
  readonly email: Email;
  readonly phone?: Phone;
  readonly website?: Url;
  readonly logoUrl?: Url;
  readonly bannerUrl?: Url;
  readonly address: Address;
  readonly commission: VendorCommission;
  readonly returnPolicy: VendorReturnPolicy;
  readonly rating: number;
  readonly totalSales: number;
  readonly totalOrders: number;
  readonly isVerified: boolean;
  readonly isFeatured: boolean;
  readonly joinedAt: string;
  readonly approvedAt?: string;
}

export interface VendorPublic {
  readonly id: VendorId;
  readonly name: string;
  readonly slug: Slug;
  readonly displayName: string;
  readonly description?: string;
  readonly type: VendorTypeValue;
  readonly tier: VendorTierValue;
  readonly logoUrl?: Url;
  readonly bannerUrl?: Url;
  readonly rating: number;
  readonly totalSales: number;
  readonly isVerified: boolean;
  readonly isFeatured: boolean;
  readonly joinedAt: string;
}

export interface VendorSummary {
  readonly id: VendorId;
  readonly name: string;
  readonly displayName: string;
  readonly logoUrl?: Url;
  readonly status: VendorStatusValue;
  readonly tier: VendorTierValue;
  readonly rating: number;
}

export interface VendorCreateInput {
  readonly userId: UserId;
  readonly name: string;
  readonly displayName: string;
  readonly slug: string;
  readonly description?: string;
  readonly type: VendorTypeValue;
  readonly businessType: VendorBusinessTypeValue;
  readonly email: Email;
  readonly phone?: Phone;
  readonly address: Address;
}

export interface VendorUpdateInput {
  readonly name?: string;
  readonly displayName?: string;
  readonly description?: string;
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
  readonly website?: string;
}

export interface VendorFilter {
  readonly status?: VendorStatusValue;
  readonly type?: VendorTypeValue;
  readonly tier?: VendorTierValue;
  readonly isVerified?: boolean;
  readonly isFeatured?: boolean;
  readonly minRating?: number;
  readonly search?: string;
}

export interface VendorStats {
  readonly vendorId: VendorId;
  readonly totalProducts: number;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly totalCommission: number;
  readonly totalPayout: number;
  readonly averageRating: number;
  readonly fulfillmentRate: number;
}
