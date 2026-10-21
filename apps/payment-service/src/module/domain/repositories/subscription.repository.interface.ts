/**
 * Subscription Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { SubscriptionEntity } from '@domain/entities/subscription.entity';
import type { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';

export const SUBSCRIPTION_REPOSITORY = Symbol('SUBSCRIPTION_REPOSITORY');

export interface SubscriptionListFilter {
  readonly userId?: string;
  readonly status?: string;
  readonly plan?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface SubscriptionListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'currentPeriodEnd' | 'price';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: SubscriptionListFilter;
}

export interface SubscriptionPaginationResult {
  readonly items: readonly SubscriptionEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface SubscriptionStats {
  readonly total: number;
  readonly active: number;
  readonly trialing: number;
  readonly cancelled: number;
  readonly totalMrr: number;
  readonly currency: string;
  readonly byPlan: Readonly<Record<string, number>>;
}

export interface SubscriptionRepository
  extends BaseRepository<SubscriptionEntity, string> {
  findByIdVO(id: SubscriptionIdVO): Promise<SubscriptionEntity | null>;
  findByUser(userId: string): Promise<readonly SubscriptionEntity[]>;
  findByStatus(status: string): Promise<readonly SubscriptionEntity[]>;
  findByPlan(plan: string): Promise<readonly SubscriptionEntity[]>;
  findPaginated(
    options: SubscriptionListOptions,
  ): Promise<SubscriptionPaginationResult>;
  getStats(userId?: string): Promise<SubscriptionStats>;

  // Cron-support
  findExpiringPeriods(withinDays: number): Promise<readonly SubscriptionEntity[]>;
  findExpiredTrials(): Promise<readonly SubscriptionEntity[]>;
  findPastDue(olderThanDays: number): Promise<readonly SubscriptionEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
