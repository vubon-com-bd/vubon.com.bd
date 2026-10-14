/**
 * VendorSubscriptionVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর subscription plan + lifecycle।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants/business';

import { SubscriptionIdVO } from '../primitives/subscription-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { SubscriptionPlanVO } from '../primitives/subscription-plan.vo.js';

export type SubscriptionStatusValue =
  | 'trial'
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'expired'
  | 'suspended';

export type SubscriptionCycleValue =
  | 'monthly'
  | 'quarterly'
  | 'half_yearly'
  | 'yearly'
  | 'lifetime';

const VALID_STATUSES = new Set<SubscriptionStatusValue>([
  'trial',
  'active',
  'past_due',
  'cancelled',
  'expired',
  'suspended',
]);

const VALID_CYCLES = new Set<SubscriptionCycleValue>([
  'monthly',
  'quarterly',
  'half_yearly',
  'yearly',
  'lifetime',
]);

export interface VendorSubscriptionVOProps {
  readonly id: SubscriptionIdVO;
  readonly vendorId: VendorIdVO;
  readonly plan: SubscriptionPlanVO;
  readonly status: SubscriptionStatusValue;
  readonly cycle: SubscriptionCycleValue;
  readonly priceAmount: number;
  readonly currency: string;
  readonly startedAt: string;
  readonly trialEndsAt?: string;
  readonly currentPeriodStart: string;
  readonly currentPeriodEnd: string;
  readonly cancelledAt?: string;
  readonly cancellationReason?: string;
  readonly cancelAtPeriodEnd: boolean;
  readonly autoRenew: boolean;
  readonly lastPaymentAt?: string;
  readonly nextPaymentAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorSubscriptionVO extends BaseVO<VendorSubscriptionVOProps> {
  private constructor(props: VendorSubscriptionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorSubscriptionVOProps): VendorSubscriptionVO {
    const vo = new VendorSubscriptionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorSubscriptionVOProps): VendorSubscriptionVO {
    return new VendorSubscriptionVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!VALID_STATUSES.has(v.status)) {
      throw new ValidationError(`Invalid subscription status: "${v.status}"`, 'status');
    }
    if (!VALID_CYCLES.has(v.cycle)) {
      throw new ValidationError(`Invalid subscription cycle: "${v.cycle}"`, 'cycle');
    }

    if (v.priceAmount < 0) {
      throw new ValidationError('priceAmount must be non-negative', 'priceAmount');
    }
    if (!v.currency || v.currency.length !== 3) {
      throw new ValidationError('currency must be a 3-char ISO code', 'currency');
    }

    if (new Date(v.currentPeriodStart) >= new Date(v.currentPeriodEnd)) {
      throw new ValidationError('currentPeriodStart must be before currentPeriodEnd', 'currentPeriodEnd');
    }

    // Trial must have trialEndsAt
    if (v.status === 'trial' && !v.trialEndsAt) {
      throw new ValidationError('Trial subscription must have trialEndsAt', 'trialEndsAt');
    }
    if (v.status === 'trial' && v.trialEndsAt) {
      if (new Date(v.trialEndsAt) <= new Date(v.startedAt)) {
        throw new ValidationError('trialEndsAt must be after startedAt', 'trialEndsAt');
      }
    }

    // Cancelled must have cancelledAt
    if (v.status === 'cancelled' && !v.cancelledAt) {
      throw new ValidationError('Cancelled subscription must have cancelledAt', 'cancelledAt');
    }

    // Free plan must have 0 price
    if (v.plan.isFree() && v.priceAmount > 0) {
      throw new ValidationError('Free plan must have priceAmount = 0', 'priceAmount');
    }
    if (!v.plan.isFree() && v.priceAmount === 0) {
      throw new ValidationError('Paid plan must have priceAmount > 0', 'priceAmount');
    }
  }

  // ─── Getters ───
  get id(): SubscriptionIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get plan(): SubscriptionPlanVO { return this.value.plan; }
  get status(): SubscriptionStatusValue { return this.value.status; }
  get cycle(): SubscriptionCycleValue { return this.value.cycle; }
  get priceAmount(): number { return this.value.priceAmount; }
  get currency(): string { return this.value.currency; }
  get startedAt(): string { return this.value.startedAt; }
  get trialEndsAt(): string | undefined { return this.value.trialEndsAt; }
  get currentPeriodStart(): string { return this.value.currentPeriodStart; }
  get currentPeriodEnd(): string { return this.value.currentPeriodEnd; }
  get cancelledAt(): string | undefined { return this.value.cancelledAt; }
  get cancellationReason(): string | undefined { return this.value.cancellationReason; }
  get cancelAtPeriodEnd(): boolean { return this.value.cancelAtPeriodEnd; }
  get autoRenew(): boolean { return this.value.autoRenew; }
  get lastPaymentAt(): string | undefined { return this.value.lastPaymentAt; }
  get nextPaymentAt(): string | undefined { return this.value.nextPaymentAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isTrial(): boolean { return this.status === 'trial'; }
  isActive(): boolean { return this.status === 'active'; }
  isPastDue(): boolean { return this.status === 'past_due'; }
  isCancelled(): boolean { return this.status === 'cancelled'; }
  isExpired(): boolean { return this.status === 'expired'; }
  isSuspended(): boolean { return this.status === 'suspended'; }

  isFree(): boolean { return this.plan.isFree(); }
  isPaid(): boolean { return this.plan.isPaid(); }
  isPremium(): boolean { return this.plan.isPremium(); }
  isEnterprise(): boolean { return this.plan.isEnterprise(); }

  isMonthly(): boolean { return this.cycle === 'monthly'; }
  isYearly(): boolean { return this.cycle === 'yearly'; }
  isLifetime(): boolean { return this.cycle === 'lifetime'; }

  hasTrial(): boolean { return this.trialEndsAt !== undefined; }
  hasCancellation(): boolean { return this.cancelledAt !== undefined; }
  hasNextPayment(): boolean { return this.nextPaymentAt !== undefined; }

  /** Currently entitled (trial/active/past_due grace) */
  isEntitled(): boolean {
    return this.isActive() || this.isTrial() || this.isPastDue();
  }

  /** Past due but within grace period */
  isInGracePeriod(): boolean {
    if (!this.isPastDue()) return false;
    const graceMs = VENDOR_SUBSCRIPTION.GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000;
    const periodEnd = new Date(this.currentPeriodEnd).getTime();
    return Date.now() < periodEnd + graceMs;
  }

  /** Days remaining in current period */
  get daysRemainingInPeriod(): number {
    const diff = new Date(this.currentPeriodEnd).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  /** Days remaining in trial */
  get trialDaysRemaining(): number | null {
    if (!this.trialEndsAt) return null;
    const diff = new Date(this.trialEndsAt).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  /** Trial has expired */
  isTrialExpired(): boolean {
    if (!this.isTrial() || !this.trialEndsAt) return false;
    return Date.now() > new Date(this.trialEndsAt).getTime();
  }

  /** Number of days in cycle (for pricing calc) */
  get cycleDays(): number {
    const days: Record<SubscriptionCycleValue, number> = {
      monthly: 30,
      quarterly: 90,
      half_yearly: 180,
      yearly: 365,
      lifetime: Number.MAX_SAFE_INTEGER,
    };
    return days[this.cycle];
  }

  /** Monthly equivalent price */
  get monthlyEquivalent(): number {
    if (this.isLifetime()) return 0;
    return Math.round((this.priceAmount / this.cycleDays) * 30 * 100) / 100;
  }

  /** Total lifetime value of subscription so far */
  get totalPaid(): number {
    if (this.isTrial() || this.isFree()) return 0;
    const months = Math.max(
      1,
      Math.floor(
        (Date.now() - new Date(this.startedAt).getTime()) / (30 * 24 * 60 * 60 * 1000),
      ),
    );
    if (this.isLifetime()) return this.priceAmount;
    const cyclesPerMonth = this.cycleDays / 30;
    return Math.round((this.priceAmount * (months / cyclesPerMonth)) * 100) / 100;
  }

  /** Can upgrade to another plan */
  canUpgradeTo(target: SubscriptionPlanVO): boolean {
    return target.isHigherThan(this.plan) && (this.isActive() || this.isTrial());
  }

  /** Can downgrade to another plan */
  canDowngradeTo(target: SubscriptionPlanVO): boolean {
    return target.isLowerThan(this.plan) && (this.isActive() || this.isTrial());
  }

  /** Is scheduled to cancel at period end */
  isCancellingAtPeriodEnd(): boolean {
    return this.cancelAtPeriodEnd && !this.isCancelled();
  }
}
