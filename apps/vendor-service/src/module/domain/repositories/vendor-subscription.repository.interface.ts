/**
 * VendorSubscriptionRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorSubscriptionEntity } from '../entities/vendor-subscription.entity.js';
import { SubscriptionStatusVO } from '../value-objects/primitives/subscription-status.vo.js';
import { SubscriptionPlanVO } from '../value-objects/primitives/subscription-plan.vo.js';

export const VENDOR_SUBSCRIPTION_REPOSITORY = Symbol('VENDOR_SUBSCRIPTION_REPOSITORY');

export interface VendorSubscriptionFilter {
  readonly plan?: string;
  readonly status?: string;
  readonly autoRenew?: boolean;
}

export interface SubscriptionStats {
  readonly totalActive: number;
  readonly totalTrial: number;
  readonly totalPastDue: number;
  readonly byPlan: Readonly<Record<string, number>>;
  readonly mrr: number;
}

export interface VendorSubscriptionRepository extends BaseRepository<VendorSubscriptionEntity, string> {
  findByVendorId(vendorId: string): Promise<VendorSubscriptionEntity | null>;
  existsByVendorId(vendorId: string): Promise<boolean>;
  findByStatus(status: SubscriptionStatusVO): Promise<readonly VendorSubscriptionEntity[]>;
  findByPlan(plan: SubscriptionPlanVO): Promise<readonly VendorSubscriptionEntity[]>;
  search(filter: VendorSubscriptionFilter): Promise<readonly VendorSubscriptionEntity[]>;

  /** Subscriptions whose current period ends within N days. */
  findRenewingWithin(days: number): Promise<readonly VendorSubscriptionEntity[]>;
  /** Trials ending within N days. */
  findTrialsEndingWithin(days: number): Promise<readonly VendorSubscriptionEntity[]>;
  /** Subscriptions already past period end but still active. */
  findExpiredButActive(): Promise<readonly VendorSubscriptionEntity[]>;
  /** Subscriptions in past-due state (needing payment). */
  findPastDue(): Promise<readonly VendorSubscriptionEntity[]>;

  countByStatus(status: SubscriptionStatusVO): Promise<number>;
  countByPlan(plan: SubscriptionPlanVO): Promise<number>;
  getStats(): Promise<SubscriptionStats>;
  upsert(entity: VendorSubscriptionEntity): Promise<VendorSubscriptionEntity>;
}
