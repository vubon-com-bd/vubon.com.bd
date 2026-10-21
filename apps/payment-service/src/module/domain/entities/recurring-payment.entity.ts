/**
 * RecurringPaymentEntity
 * @module payment-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { RecurringStatusVO } from '@domain/primitives/recurring-status.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';

export interface RecurringPaymentEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly status: RecurringStatusVO;
  readonly frequency: RecurringFrequencyVO;
  readonly amount: PaymentAmountVO;
  readonly startAt: string;
  readonly endAt?: string;
  readonly nextRunAt?: string;
  readonly attemptCount: number;
  readonly cancelledAt?: string;
  readonly failureReason?: string;
}

export class RecurringPaymentEntity extends BaseEntity<string> {
  private _status: RecurringStatusVO;
  private _nextRunAt?: string;
  private _attemptCount: number;
  private _cancelledAt?: string;
  private _failureReason?: string;

  private readonly _paymentId: PaymentIdVO;
  private readonly _frequency: RecurringFrequencyVO;
  private readonly _amount: PaymentAmountVO;
  private readonly _startAt: string;
  private readonly _endAt?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: RecurringPaymentEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._status = props.status;
    this._frequency = props.frequency;
    this._amount = props.amount;
    this._startAt = props.startAt;
    this._endAt = props.endAt;
    this._nextRunAt = props.nextRunAt;
    this._attemptCount = props.attemptCount;
    this._cancelledAt = props.cancelledAt;
    this._failureReason = props.failureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._attemptCount < 0) {
      throw new ValidationError('attemptCount cannot be negative', 'attemptCount');
    }
    if (this._endAt && new Date(this._endAt).getTime() <= new Date(this._startAt).getTime()) {
      throw new ValidationError('endAt must be after startAt', 'endAt');
    }
  }

  get paymentId(): PaymentIdVO { return this._paymentId; }
  get status(): RecurringStatusVO { return this._status; }
  get frequency(): RecurringFrequencyVO { return this._frequency; }
  get amount(): PaymentAmountVO { return this._amount; }
  get startAt(): string { return this._startAt; }
  get endAt(): string | undefined { return this._endAt; }
  get nextRunAt(): string | undefined { return this._nextRunAt; }
  get attemptCount(): number { return this._attemptCount; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get failureReason(): string | undefined { return this._failureReason; }

  isActive(): boolean { return this._status.isActive(); }
  isFinal(): boolean { return this._status.isFinal(); }

  isDue(reference: Date = new Date()): boolean {
    if (!this._nextRunAt) return false;
    return new Date(this._nextRunAt).getTime() <= reference.getTime();
  }

  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    this._status = RecurringStatusVO.active();
    this._nextRunAt = this._startAt;
    this.touch(now);
  }

  pause(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('paused');
    this._status = RecurringStatusVO.paused();
    this.touch(now);
  }

  resume(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    this._status = RecurringStatusVO.active();
    this.touch(now);
  }

  recordRun(nextRunAt: string, now: string = new Date().toISOString()): void {
    if (!this.isActive()) {
      throw new BusinessRuleError(
        `Cannot record run for recurring in status "${this._status.value}"`,
        'RECURRING_NOT_ACTIVE',
        { recurringId: this.id, status: this._status.value },
      );
    }
    if (this._endAt && new Date(nextRunAt).getTime() > new Date(this._endAt).getTime()) {
      this._status = RecurringStatusVO.completed();
      this._nextRunAt = undefined;
    } else {
      this._nextRunAt = nextRunAt;
    }
    this._attemptCount += 1;
    this.touch(now);
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    this._status = RecurringStatusVO.failed();
    this._failureReason = reason;
    this.touch(now);
  }

  cancel(reason: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot cancel recurring in status "${this._status.value}"`,
        'RECURRING_CANNOT_BE_CANCELLED',
        { recurringId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    this._status = RecurringStatusVO.cancelled();
    this._cancelledAt = now;
    this._failureReason = reason;
    this.touch(now);
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid recurring transition: "${this._status.value}" → "${target}"`,
        'INVALID_RECURRING_STATUS_TRANSITION',
        { from: this._status.value, to: target, recurringId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: RecurringIdVO;
    props: Omit<RecurringPaymentEntityProps, 'status' | 'attemptCount'>;
    now: string;
  }): RecurringPaymentEntity {
    return new RecurringPaymentEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: RecurringStatusVO.scheduled(),
        attemptCount: 0,
      },
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: RecurringPaymentEntityProps;
  }): RecurringPaymentEntity {
    return new RecurringPaymentEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
