/**
 * Subscription Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';

export interface SubscriptionVOProps {
  readonly id: SubscriptionIdVO;
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
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class SubscriptionVO extends BaseVO<SubscriptionVOProps> {
  private constructor(props: SubscriptionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: SubscriptionVOProps): SubscriptionVO {
    const vo = new SubscriptionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: SubscriptionVOProps): SubscriptionVO {
    return new SubscriptionVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.price.amount <= 0) {
      throw new ValidationError('Subscription price must be positive', 'price');
    }
    if (new Date(v.currentPeriodEnd).getTime() <= new Date(v.currentPeriodStart).getTime()) {
      throw new ValidationError('currentPeriodEnd must be after currentPeriodStart', 'period');
    }
    if (v.status.isCancelled() && !v.cancelledAt) {
      throw new ValidationError('Cancelled subscription requires cancelledAt', 'cancelledAt');
    }
  }

  get id(): SubscriptionIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get status(): SubscriptionStatusVO { return this.value.status; }
  get plan(): SubscriptionPlanVO { return this.value.plan; }
  get frequency(): RecurringFrequencyVO { return this.value.frequency; }
  get price(): PaymentAmountVO { return this.value.price; }
  get startedAt(): string { return this.value.startedAt; }
  get trialEndsAt(): string | undefined { return this.value.trialEndsAt; }
  get currentPeriodStart(): string { return this.value.currentPeriodStart; }
  get currentPeriodEnd(): string { return this.value.currentPeriodEnd; }
  get cancelledAt(): string | undefined { return this.value.cancelledAt; }
  get cancelAtPeriodEnd(): boolean { return this.value.cancelAtPeriodEnd; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.status.isActive(); }
  isEntitled(): boolean { return this.status.isEntitled(); }
  isCancellable(): boolean { return this.status.isCancellable(); }
  isInTrial(): boolean { return this.status.isTrialing(); }
}
