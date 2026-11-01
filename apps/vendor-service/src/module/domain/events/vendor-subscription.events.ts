/**
 * Vendor Subscription Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_SUBSCRIPTION_EVENT_TYPE = {
  STARTED: 'vendor.subscription.started',
  TRIAL_STARTED: 'vendor.subscription.trial_started',
  TRIAL_ENDED: 'vendor.subscription.trial_ended',
  RENEWED: 'vendor.subscription.renewed',
  UPGRADED: 'vendor.subscription.upgraded',
  DOWNGRADED: 'vendor.subscription.downgraded',
  CANCELLED: 'vendor.subscription.cancelled',
  EXPIRED: 'vendor.subscription.expired',
  SUSPENDED: 'vendor.subscription.suspended',
  PAYMENT_FAILED: 'vendor.subscription.payment_failed',
  FEATURE_ENABLED: 'vendor.subscription.feature_enabled',
  FEATURE_DISABLED: 'vendor.subscription.feature_disabled',
} as const;

export interface VendorSubscriptionStartedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly plan: string;
  readonly cycle: string;
  readonly priceAmount: number;
  readonly currency: string;
  readonly startedAt: string;
  readonly currentPeriodEnd: string;
}

export interface VendorSubscriptionTrialStartedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly plan: string;
  readonly trialStartedAt: string;
  readonly trialEndsAt: string;
}

export interface VendorSubscriptionTrialEndedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly trialEndedAt: string;
  readonly converted: boolean;
}

export interface VendorSubscriptionRenewedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly plan: string;
  readonly renewedAt: string;
  readonly newPeriodEnd: string;
  readonly amount: number;
}

export interface VendorSubscriptionUpgradedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly fromPlan: string;
  readonly toPlan: string;
  readonly upgradedAt: string;
  readonly newPrice: number;
}

export interface VendorSubscriptionDowngradedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly fromPlan: string;
  readonly toPlan: string;
  readonly downgradedAt: string;
  readonly newPrice: number;
}

export interface VendorSubscriptionCancelledPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly cancelledAt: string;
  readonly cancelledBy?: string;
  readonly reason?: string;
  readonly cancelAtPeriodEnd: boolean;
}

export interface VendorSubscriptionExpiredPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly expiredAt: string;
}

export interface VendorSubscriptionSuspendedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly suspendedAt: string;
  readonly reason: string;
}

export interface VendorSubscriptionPaymentFailedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly failedAt: string;
  readonly amount: number;
  readonly reason: string;
  readonly retryCount: number;
}

export interface VendorSubscriptionFeatureEnabledPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly featureKey: string;
  readonly enabledAt: string;
}

export interface VendorSubscriptionFeatureDisabledPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly featureKey: string;
  readonly disabledAt: string;
  readonly reason?: string;
}

export class VendorSubscriptionStartedEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.STARTED,
  VendorSubscriptionStartedPayload
> {
  constructor(p: EventParams<VendorSubscriptionStartedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.STARTED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionTrialStartedEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.TRIAL_STARTED,
  VendorSubscriptionTrialStartedPayload
> {
  constructor(p: EventParams<VendorSubscriptionTrialStartedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.TRIAL_STARTED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionTrialEndedEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.TRIAL_ENDED,
  VendorSubscriptionTrialEndedPayload
> {
  constructor(p: EventParams<VendorSubscriptionTrialEndedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.TRIAL_ENDED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionRenewedEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.RENEWED,
  VendorSubscriptionRenewedPayload
> {
  constructor(p: EventParams<VendorSubscriptionRenewedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.RENEWED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionUpgradedEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.UPGRADED,
  VendorSubscriptionUpgradedPayload
> {
  constructor(p: EventParams<VendorSubscriptionUpgradedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.UPGRADED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionDowngradedEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.DOWNGRADED,
  VendorSubscriptionDowngradedPayload
> {
  constructor(p: EventParams<VendorSubscriptionDowngradedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.DOWNGRADED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionCancelledEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.CANCELLED,
  VendorSubscriptionCancelledPayload
> {
  constructor(p: EventParams<VendorSubscriptionCancelledPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.CANCELLED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionExpiredEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.EXPIRED,
  VendorSubscriptionExpiredPayload
> {
  constructor(p: EventParams<VendorSubscriptionExpiredPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.EXPIRED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionSuspendedEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.SUSPENDED,
  VendorSubscriptionSuspendedPayload
> {
  constructor(p: EventParams<VendorSubscriptionSuspendedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.SUSPENDED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionPaymentFailedEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.PAYMENT_FAILED,
  VendorSubscriptionPaymentFailedPayload
> {
  constructor(p: EventParams<VendorSubscriptionPaymentFailedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.PAYMENT_FAILED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionFeatureEnabledEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.FEATURE_ENABLED,
  VendorSubscriptionFeatureEnabledPayload
> {
  constructor(p: EventParams<VendorSubscriptionFeatureEnabledPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.FEATURE_ENABLED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}

export class VendorSubscriptionFeatureDisabledEvent extends BaseDomainEvent<
  typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.FEATURE_DISABLED,
  VendorSubscriptionFeatureDisabledPayload
> {
  constructor(p: EventParams<VendorSubscriptionFeatureDisabledPayload>) {
    super(
      buildEventParams(
        VENDOR_SUBSCRIPTION_EVENT_TYPE.FEATURE_DISABLED,
        VENDOR_AGGREGATE_TYPE.SUBSCRIPTION,
        p,
      ),
    );
  }
}
