/**
 * VendorSubscriptionEntity — SaaS subscription lifecycle
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants/business';
import { SubscriptionPlanVO } from '../value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionStatusVO } from '../value-objects/primitives/subscription-status.vo.js';
import { SubscriptionCycleVO } from '../value-objects/primitives/subscription-cycle.vo.js';

export interface VendorSubscriptionEntityProps {
  readonly vendorId: string;
  readonly plan: SubscriptionPlanVO;
  readonly status: SubscriptionStatusVO;
  readonly cycle: SubscriptionCycleVO;
  readonly price: number;
  readonly currency: string;
  readonly startedAt: string;
  readonly currentPeriodStart: string;
  readonly currentPeriodEnd: string;
  readonly trialEndsAt?: string;
  readonly cancelledAt?: string;
  readonly cancelAtPeriodEnd: boolean;
  readonly autoRenew: boolean;
  readonly features: readonly string[];
}

export class VendorSubscriptionEntity extends AggregateRoot<string> {
  private _plan: SubscriptionPlanVO;
  private _status: SubscriptionStatusVO;
  private _cycle: SubscriptionCycleVO;
  private _price: number;
  private _currentPeriodStart: string;
  private _currentPeriodEnd: string;
  private _trialEndsAt?: string;
  private _cancelledAt?: string;
  private _cancelAtPeriodEnd: boolean;
  private _autoRenew: boolean;
  private _features: string[];

  private readonly _vendorId: string;
  private readonly _currency: string;
  private readonly _startedAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorSubscriptionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._plan = props.plan;
    this._status = props.status;
    this._cycle = props.cycle;
    this._price = props.price;
    this._currency = props.currency;
    this._startedAt = props.startedAt;
    this._currentPeriodStart = props.currentPeriodStart;
    this._currentPeriodEnd = props.currentPeriodEnd;
    this._trialEndsAt = props.trialEndsAt;
    this._cancelledAt = props.cancelledAt;
    this._cancelAtPeriodEnd = props.cancelAtPeriodEnd;
    this._autoRenew = props.autoRenew;
    this._features = [...props.features];
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isFinite(this._price) || this._price < 0) {
      throw new ValidationError('Price must be non-negative', 'price');
    }
    if (this._currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    if (Date.parse(this._currentPeriodEnd) <= Date.parse(this._currentPeriodStart)) {
      throw new ValidationError('currentPeriodEnd must be after currentPeriodStart', 'currentPeriodEnd');
    }
    if (this._status.isTrial() && !this._trialEndsAt) {
      throw new ValidationError('Trial subscription requires trialEndsAt', 'trialEndsAt');
    }
    if (this._features.length > 100) {
      throw new ValidationError('Features cannot exceed 100 items', 'features');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get plan(): SubscriptionPlanVO { return this._plan; }
  get status(): SubscriptionStatusVO { return this._status; }
  get cycle(): SubscriptionCycleVO { return this._cycle; }
  get price(): number { return this._price; }
  get currency(): string { return this._currency; }
  get startedAt(): string { return this._startedAt; }
  get currentPeriodStart(): string { return this._currentPeriodStart; }
  get currentPeriodEnd(): string { return this._currentPeriodEnd; }
  get autoRenew(): boolean { return this._autoRenew; }
  get cancelAtPeriodEnd(): boolean { return this._cancelAtPeriodEnd; }

  get trialEndsAt(): string | undefined { return this._trialEndsAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get features(): readonly string[] { return this._features; }

  isTrial(): boolean { return this._status.isTrial(); }
  isActive(): boolean { return this._status.isActive(); }
  isUsable(): boolean { return this._status.isUsable(); }
  needsPayment(): boolean { return this._status.needsPayment(); }

  isExpired(at: Date = new Date()): boolean {
    return at.getTime() > Date.parse(this._currentPeriodEnd);
  }

  daysUntilRenewal(at: Date = new Date()): number {
    const diff = Date.parse(this._currentPeriodEnd) - at.getTime();
    return diff <= 0 ? 0 : Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  trialDaysRemaining(at: Date = new Date()): number {
    if (!this._trialEndsAt) return 0;
    const diff = Date.parse(this._trialEndsAt) - at.getTime();
    return diff <= 0 ? 0 : Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  /** Advance the period (renewal). */
  renew(now: string = new Date().toISOString()): void {
    if (this._cycle.isLifetime()) {
      throw new BusinessRuleError('Lifetime subscription cannot be renewed', 'SUBSCRIPTION_LIFETIME', { subscriptionId: this.id });
    }
    if (this._cancelAtPeriodEnd) {
      throw new BusinessRuleError('Cancelled-at-period-end subscription cannot auto-renew', 'SUBSCRIPTION_CANCEL_AT_PERIOD_END', { subscriptionId: this.id });
    }
    this._status = SubscriptionStatusVO.active();
    this._currentPeriodStart = this._currentPeriodEnd;
    const next = this._cycle.nextPeriodStart(new Date(this._currentPeriodEnd));
    this._currentPeriodEnd = next.toISOString();
    this._trialEndsAt = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  changePlan(
    newPlan: SubscriptionPlanVO,
    newPrice: number,
    immediate: boolean,
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isUsable() && !this._status.isPastDue()) {
      throw new BusinessRuleError(
        `Cannot change plan from status "${this._status.value}"`,
        'SUBSCRIPTION_NOT_CHANGEABLE',
        { subscriptionId: this.id, status: this._status.value },
      );
    }
    if (newPrice < 0 || !Number.isFinite(newPrice)) {
      throw new ValidationError('New price must be non-negative', 'price');
    }
    this._plan = newPlan;
    this._price = newPrice;
    if (immediate) {
      this._currentPeriodStart = now;
      const next = this._cycle.nextPeriodStart(new Date(now));
      this._currentPeriodEnd = next.toISOString();
    }
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  cancel(immediate: boolean, now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('cancelled')) {
      throw new BusinessRuleError(
        `Cannot cancel from status "${this._status.value}"`,
        'SUBSCRIPTION_NOT_CANCELLABLE',
        { subscriptionId: this.id, status: this._status.value },
      );
    }
    this._cancelledAt = now;
    if (immediate) {
      this._status = SubscriptionStatusVO.cancelled();
    } else {
      this._cancelAtPeriodEnd = true;
    }
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  resume(now: string = new Date().toISOString()): void {
    if (!this._cancelAtPeriodEnd) {
      throw new BusinessRuleError(
        'Subscription is not pending cancellation',
        'SUBSCRIPTION_NOT_CANCELLING',
        { subscriptionId: this.id },
      );
    }
    this._cancelAtPeriodEnd = false;
    this._cancelledAt = undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  markPastDue(now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('past_due')) {
      throw new BusinessRuleError(
        `Cannot mark past_due from status "${this._status.value}"`,
        'SUBSCRIPTION_NOT_MARKABLE_PAST_DUE',
        { subscriptionId: this.id, status: this._status.value },
      );
    }
    this._status = SubscriptionStatusVO.pastDue();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    this._status = SubscriptionStatusVO.expired();
    this._autoRenew = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  addFeature(feature: string, now: string = new Date().toISOString()): void {
    const trimmed = feature.trim();
    if (!trimmed) return;
    if (this._features.includes(trimmed)) return;
    this._features = [...this._features, trimmed];
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  removeFeature(feature: string, now: string = new Date().toISOString()): void {
    this._features = this._features.filter((f) => f !== feature);
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  hasFeature(feature: string): boolean {
    return this._features.includes(feature);
  }

  productLimit(): number | null { return this._plan.getProductLimit(); }

  static create(params: {
    id: string;
    vendorId: string;
    plan: SubscriptionPlanVO;
    cycle: SubscriptionCycleVO;
    price: number;
    currency: string;
    trialDays?: number;
    now: string;
  }): VendorSubscriptionEntity {
    const now = new Date(params.now);
    const trialDays = params.trialDays ?? VENDOR_SUBSCRIPTION.TRIAL_DAYS;
    const isTrial = trialDays > 0;
    const periodEnd = new Date(
      now.getTime() + (isTrial ? trialDays : params.cycle.toDays()) * 24 * 60 * 60 * 1000,
    );
    return new VendorSubscriptionEntity(params.id, params.now, params.now, {
      vendorId: params.vendorId,
      plan: params.plan,
      status: isTrial ? SubscriptionStatusVO.trial() : SubscriptionStatusVO.active(),
      cycle: params.cycle,
      price: params.price,
      currency: params.currency.toUpperCase(),
      startedAt: params.now,
      currentPeriodStart: params.now,
      currentPeriodEnd: periodEnd.toISOString(),
      trialEndsAt: isTrial ? periodEnd.toISOString() : undefined,
      cancelAtPeriodEnd: VENDOR_SUBSCRIPTION.CANCEL_AT_PERIOD_END,
      autoRenew: VENDOR_SUBSCRIPTION.AUTO_RENEW,
      features: [],
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorSubscriptionEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorSubscriptionEntity {
    const entity = new VendorSubscriptionEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
