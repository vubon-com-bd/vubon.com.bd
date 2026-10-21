/**
 * SubscriptionEntity
 * @module payment-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';

export interface SubscriptionEntityProps {
  readonly userId: UserIdVO;
  readonly status: SubscriptionStatusVO;
  readonly plan: SubscriptionPlanVO;
  readonly frequency: RecurringFrequencyVO;
  readonly price: PaymentAmountVO;
  readonly startedAt: string;
  readonly trialEndsAt?: string;
  readonly currentPeriodStart: string;
  readonly currentPeriodEnd: string;
  readonly cancelledAt?: string;
  readonly cancelAtPeriodEnd: boolean;
}

export class SubscriptionEntity extends BaseEntity<string> {
  private _status: SubscriptionStatusVO;
  private _currentPeriodStart: string;
  private _currentPeriodEnd: string;
  private _cancelAtPeriodEnd: boolean;
  private _cancelledAt?: string;

  private readonly _userId: UserIdVO;
  private readonly _plan: SubscriptionPlanVO;
  private readonly _frequency: RecurringFrequencyVO;
  private readonly _price: PaymentAmountVO;
  private readonly _startedAt: string;
  private readonly _trialEndsAt?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: SubscriptionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._status = props.status;
    this._plan = props.plan;
    this._frequency = props.frequency;
    this._price = props.price;
    this._startedAt = props.startedAt;
    this._trialEndsAt = props.trialEndsAt;
    this._currentPeriodStart = props.currentPeriodStart;
    this._currentPeriodEnd = props.currentPeriodEnd;
    this._cancelAtPeriodEnd = props.cancelAtPeriodEnd;
    this._cancelledAt = props.cancelledAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._price.amount <= 0) {
      throw new ValidationError('Subscription price must be positive', 'price');
    }
    if (
      new Date(this._currentPeriodEnd).getTime() <=
      new Date(this._currentPeriodStart).getTime()
    ) {
      throw new ValidationError(
        'currentPeriodEnd must be after currentPeriodStart',
        'period',
      );
    }
    if (this._status.isCancelled() && !this._cancelledAt) {
      throw new ValidationError('Cancelled subscription requires cancelledAt', 'cancelledAt');
    }
  }

  get userId(): UserIdVO { return this._userId; }
  get status(): SubscriptionStatusVO { return this._status; }
  get plan(): SubscriptionPlanVO { return this._plan; }
  get frequency(): RecurringFrequencyVO { return this._frequency; }
  get price(): PaymentAmountVO { return this._price; }
  get startedAt(): string { return this._startedAt; }
  get trialEndsAt(): string | undefined { return this._trialEndsAt; }
  get currentPeriodStart(): string { return this._currentPeriodStart; }
  get currentPeriodEnd(): string { return this._currentPeriodEnd; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get cancelAtPeriodEnd(): boolean { return this._cancelAtPeriodEnd; }

  isActive(): boolean { return this._status.isActive(); }
  isEntitled(): boolean { return this._status.isEntitled(); }
  isInTrial(): boolean { return this._status.isTrialing(); }
  isCancellable(): boolean { return this._status.isCancellable(); }

  startTrial(trialEndsAt: string, now: string = new Date().toISOString()): void {
    this._status = SubscriptionStatusVO.trialing();
    (this as unknown as { _trialEndsAt?: string })._trialEndsAt = trialEndsAt;
    this.touch(now);
  }

  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    this._status = SubscriptionStatusVO.active();
    this.touch(now);
  }

  renew(periodEnd: string, now: string = new Date().toISOString()): void {
    if (!this.isActive() && !this._status.isPastDue()) {
      throw new BusinessRuleError(
        `Cannot renew subscription in status "${this._status.value}"`,
        'SUBSCRIPTION_NOT_RENEWABLE',
        { subscriptionId: this.id, status: this._status.value },
      );
    }
    this._currentPeriodStart = this._currentPeriodEnd;
    this._currentPeriodEnd = periodEnd;
    if (this._status.isPastDue()) {
      this._status = SubscriptionStatusVO.active();
    }
    this.touch(now);
  }

  markPastDue(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('past_due');
    this._status = SubscriptionStatusVO.pastDue();
    this.touch(now);
  }

  pause(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('paused');
    this._status = SubscriptionStatusVO.paused();
    this.touch(now);
  }

  resume(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    this._status = SubscriptionStatusVO.active();
    this.touch(now);
  }

  cancel(atPeriodEnd: boolean, now: string = new Date().toISOString()): void {
    if (!this.isCancellable()) {
      throw new BusinessRuleError(
        `Subscription cannot be cancelled in status "${this._status.value}"`,
        'SUBSCRIPTION_CANNOT_BE_CANCELLED',
        { subscriptionId: this.id, status: this._status.value },
      );
    }
    this._cancelAtPeriodEnd = atPeriodEnd;
    if (!atPeriodEnd) {
      this.assertTransitionTo('cancelled');
      this._status = SubscriptionStatusVO.cancelled();
      this._cancelledAt = now;
    }
    this.touch(now);
  }

  expire(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('expired');
    this._status = SubscriptionStatusVO.expired();
    this.touch(now);
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid subscription transition: "${this._status.value}" → "${target}"`,
        'INVALID_SUBSCRIPTION_STATUS_TRANSITION',
        { from: this._status.value, to: target, subscriptionId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: SubscriptionIdVO;
    props: Omit<SubscriptionEntityProps, 'status' | 'cancelledAt' | 'cancelAtPeriodEnd'>;
    now: string;
  }): SubscriptionEntity {
    return new SubscriptionEntity(params.id.value, params.now, params.now, {
      ...params.props,
      status: SubscriptionStatusVO.active(),
      cancelAtPeriodEnd: false,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: SubscriptionEntityProps;
  }): SubscriptionEntity {
    return new SubscriptionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
