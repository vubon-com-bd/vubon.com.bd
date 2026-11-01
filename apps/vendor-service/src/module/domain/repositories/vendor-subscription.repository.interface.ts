/**
 * Vendor Subscription Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorSubscriptionEntity } from '../entities/vendor-subscription.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { SubscriptionIdVO } from '../value-objects/primitives/subscription-id.vo.js';

export const VENDOR_SUBSCRIPTION_REPOSITORY = Symbol('VENDOR_SUBSCRIPTION_REPOSITORY');

export interface VendorSubscriptionListFilter {
  readonly vendorId?: string;
  readonly plan?: string | readonly string[];
  readonly status?: string | readonly string[];
  readonly cycle?: string | readonly string[];
  readonly currency?: string;
  readonly isTrial?: boolean;
  readonly isEntitled?: boolean;
  readonly isCancelling?: boolean;
  readonly isExpiringSoon?: boolean;
  readonly expiringInDays?: number;
  readonly autoRenew?: boolean;
  readonly minPrice?: number;
  readonly maxPrice?: number;
}

export interface VendorSubscriptionListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'currentPeriodEnd' | 'priceAmount' | 'startedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorSubscriptionListFilter;
}

export interface VendorSubscriptionPaginationResult {
  readonly items: readonly VendorSubscriptionEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorSubscriptionRepository
  extends BaseRepository<VendorSubscriptionEntity, string> {
  findByIdVO(id: SubscriptionIdVO): Promise<VendorSubscriptionEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorSubscriptionEntity[]>;
  findActiveByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorSubscriptionEntity | null>;
  findLatestByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorSubscriptionEntity | null>;
  findByPlan(plan: string): Promise<readonly VendorSubscriptionEntity[]>;
  findByStatus(status: string): Promise<readonly VendorSubscriptionEntity[]>;
  findTrials(limit?: number): Promise<readonly VendorSubscriptionEntity[]>;
  findExpiringSoon(days: number): Promise<readonly VendorSubscriptionEntity[]>;
  findPastDue(): Promise<readonly VendorSubscriptionEntity[]>;
  findCancellingAtPeriodEnd(): Promise<readonly VendorSubscriptionEntity[]>;
  findForRenewal(): Promise<readonly VendorSubscriptionEntity[]>;
  findExpired(): Promise<readonly VendorSubscriptionEntity[]>;
  findPaginated(
    options: VendorSubscriptionListOptions,
  ): Promise<VendorSubscriptionPaginationResult>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly active: number;
    readonly trial: number;
    readonly pastDue: number;
    readonly cancelled: number;
    readonly expired: number;
    readonly byPlan: Readonly<Record<string, number>>;
    readonly monthlyRevenue: number;
  }>;
  getRevenueByPeriod(
    fromDate: string,
    toDate: string,
  ): Promise<{
    readonly totalRevenue: number;
    readonly byPlan: Readonly<Record<string, number>>;
  }>;
}
