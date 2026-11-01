/**
 * RecurringPayment Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { RecurringStatusVO } from '@domain/primitives/recurring-status.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

export interface RecurringPaymentVOProps {
  readonly id: RecurringIdVO;
  readonly paymentId: PaymentIdVO;
  readonly status: RecurringStatusVO;
  readonly frequency: RecurringFrequencyVO;
  readonly amount: PaymentAmountVO;
  readonly startAt: string;
  readonly endAt?: string;
  readonly nextRunAt?: string;
  readonly attemptCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class RecurringPaymentVO extends BaseVO<RecurringPaymentVOProps> {
  private constructor(props: RecurringPaymentVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: RecurringPaymentVOProps): RecurringPaymentVO {
    const vo = new RecurringPaymentVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: RecurringPaymentVOProps): RecurringPaymentVO {
    return new RecurringPaymentVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.attemptCount < 0) {
      throw new ValidationError('attemptCount cannot be negative', 'attemptCount');
    }
    if (v.endAt && new Date(v.endAt).getTime() <= new Date(v.startAt).getTime()) {
      throw new ValidationError('endAt must be after startAt', 'endAt');
    }
  }

  get id(): RecurringIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get status(): RecurringStatusVO { return this.value.status; }
  get frequency(): RecurringFrequencyVO { return this.value.frequency; }
  get amount(): PaymentAmountVO { return this.value.amount; }
  get startAt(): string { return this.value.startAt; }
  get endAt(): string | undefined { return this.value.endAt; }
  get nextRunAt(): string | undefined { return this.value.nextRunAt; }
  get attemptCount(): number { return this.value.attemptCount; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.status.isActive(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isDue(reference: Date = new Date()): boolean {
    if (!this.nextRunAt) return false;
    return new Date(this.nextRunAt).getTime() <= reference.getTime();
  }
}
