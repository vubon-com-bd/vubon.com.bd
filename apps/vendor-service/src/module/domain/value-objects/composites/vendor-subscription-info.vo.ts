/**
 * VendorSubscriptionInfoVO — full SaaS subscription state
 * @module vendor-service/src/module/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SubscriptionPlanVO } from '../primitives/subscription-plan.vo.js';
import { SubscriptionStatusVO } from '../primitives/subscription-status.vo.js';

export interface VendorSubscriptionInfoVOProps {
  readonly plan: SubscriptionPlanVO;
  readonly status: SubscriptionStatusVO;
  readonly startedAt: string;
  readonly currentPeriodStart: string;
  readonly currentPeriodEnd: string;
  readonly trialEndsAt?: string;
  readonly cancelledAt?: string;
  readonly cancelAtPeriodEnd: boolean;
  readonly autoRenew: boolean;
}

export class VendorSubscriptionInfoVO extends BaseVO<VendorSubscriptionInfoVOProps> {
  private constructor(props: VendorSubscriptionInfoVOProps) {
    super(props);
  }

  static create(props: VendorSubscriptionInfoVOProps): VendorSubscriptionInfoVO {
    if (!(props.plan instanceof SubscriptionPlanVO)) {
      throw new ValidationError('Subscription requires SubscriptionPlanVO', 'plan');
    }
    if (!(props.status instanceof SubscriptionStatusVO)) {
      throw new ValidationError('Subscription requires SubscriptionStatusVO', 'status');
    }
    if (Number.isNaN(Date.parse(props.currentPeriodStart)) || Number.isNaN(Date.parse(props.currentPeriodEnd))) {
      throw new ValidationError('Subscription period dates must be valid ISO timestamps', 'currentPeriod');
    }
    if (Date.parse(props.currentPeriodEnd) <= Date.parse(props.currentPeriodStart)) {
      throw new ValidationError('Current period end must be after start', 'currentPeriodEnd');
    }
    // Trial must have trialEndsAt
    if (props.status.isTrial() && !props.trialEndsAt) {
      throw new ValidationError('Trial subscription requires trialEndsAt', 'trialEndsAt');
    }
    // Cancelled must have cancelledAt
    if (props.status.isCancelled() && !props.cancelledAt) {
      throw new ValidationError('Cancelled subscription requires cancelledAt', 'cancelledAt');
    }
    return new VendorSubscriptionInfoVO(props);
  }

  static reconstitute(props: VendorSubscriptionInfoVOProps): VendorSubscriptionInfoVO {
    return new VendorSubscriptionInfoVO(props);
  }

  get plan(): SubscriptionPlanVO { return this.value.plan; }
  get status(): SubscriptionStatusVO { return this.value.status; }
  get currentPeriodEnd(): string { return this.value.currentPeriodEnd; }
  get autoRenew(): boolean { return this.value.autoRenew; }

  isUsable(): boolean {
    return this.value.status.isUsable();
  }

  isTrial(): boolean {
    return this.value.status.isTrial();
  }

  isExpired(at: Date = new Date()): boolean {
    return at.getTime() > Date.parse(this.value.currentPeriodEnd);
  }

  daysUntilRenewal(at: Date = new Date()): number {
    const diff = Date.parse(this.value.currentPeriodEnd) - at.getTime();
    return diff <= 0 ? 0 : Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  trialDaysRemaining(at: Date = new Date()): number {
    if (!this.value.trialEndsAt) return 0;
    const diff = Date.parse(this.value.trialEndsAt) - at.getTime();
    return diff <= 0 ? 0 : Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  willCancelAtPeriodEnd(): boolean {
    return this.value.cancelAtPeriodEnd;
  }

  canAddProducts(currentCount: number, adding: number = 1): boolean {
    if (!this.isUsable()) return false;
    return this.value.plan.canAddProducts(currentCount, adding);
  }

  productLimit(): number | null {
    return this.value.plan.getProductLimit();
  }
}
