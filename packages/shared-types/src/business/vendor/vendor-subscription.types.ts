/**
 * Vendor Subscription Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-subscription.constants থেকে।
 */

import type {
  VENDOR_SUBSCRIPTION_PLAN,
  VENDOR_SUBSCRIPTION_STATUS,
  VENDOR_SUBSCRIPTION_CYCLE,
} from '@vubon/shared-constants/business';
import type { VendorId, Money } from '../../common/primitives';

export type VendorSubscriptionPlanValue =
  (typeof VENDOR_SUBSCRIPTION_PLAN)[keyof typeof VENDOR_SUBSCRIPTION_PLAN];

export type VendorSubscriptionStatusValue =
  (typeof VENDOR_SUBSCRIPTION_STATUS)[keyof typeof VENDOR_SUBSCRIPTION_STATUS];

export type VendorSubscriptionCycleValue =
  (typeof VENDOR_SUBSCRIPTION_CYCLE)[keyof typeof VENDOR_SUBSCRIPTION_CYCLE];

export interface VendorSubscription {
  readonly vendorId: VendorId;
  readonly plan: VendorSubscriptionPlanValue;
  readonly status: VendorSubscriptionStatusValue;
  readonly cycle: VendorSubscriptionCycleValue;
  readonly price: Money;
  readonly currency: string;
  readonly startedAt: string;
  readonly currentPeriodStart: string;
  readonly currentPeriodEnd: string;
  readonly trialEndsAt?: string;
  readonly cancelledAt?: string;
  readonly cancelAtPeriodEnd: boolean;
  readonly autoRenew: boolean;
  readonly maxProducts: number | null;
  readonly features: readonly string[];
}

export interface VendorSubscriptionPublic {
  readonly vendorId: VendorId;
  readonly plan: VendorSubscriptionPlanValue;
  readonly status: VendorSubscriptionStatusValue;
  readonly cycle: VendorSubscriptionCycleValue;
  readonly price: Money;
  readonly currency: string;
  readonly currentPeriodEnd: string;
}

export interface VendorSubscriptionChangeInput {
  readonly vendorId: VendorId;
  readonly newPlan: VendorSubscriptionPlanValue;
  readonly newCycle?: VendorSubscriptionCycleValue;
  readonly immediate: boolean;
}
