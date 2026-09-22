import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { RecurringIdVO } from '../value-objects/primitives/recurring-id.vo';
import { RecurringFrequencyVO } from '../value-objects/primitives/recurring-frequency.vo';
import { RecurringStatusVO } from '../value-objects/primitives/recurring-status.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';
import { PaymentAmountVO } from '../value-objects/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '../value-objects/primitives/payment-currency.vo';
import {
  RecurringPaymentScheduledEvent,
  RecurringPaymentFailedEvent,
} from '../events/recurring.events';

export interface RecurringPaymentEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly frequency: RecurringFrequencyVO;
  readonly status: RecurringStatusVO;
  readonly amount: PaymentAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly nextRunAt: Date;
  readonly lastRunAt: Date | null;
  readonly completedCycles: number;
  readonly maxCycles: number | null;
}

export class RecurringPaymentEntity extends AggregateRoot<RecurringIdVO> {
  private readonly _paymentId: PaymentIdVO;
  private readonly _frequency: RecurringFrequencyVO;
  private readonly _status: RecurringStatusVO;
  private readonly _amount: PaymentAmountVO;
  private readonly _currency: PaymentCurrencyVO;
  private readonly _nextRunAt: Date;
  private readonly _lastRunAt: Date | null;
  private readonly _completedCycles: number;
  private readonly _maxCycles: number | null;

  private constructor(
    id: RecurringIdVO,
    props: RecurringPaymentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._frequency = props.frequency;
    this._status = props.status;
    this._amount = props.amount;
    this._currency = props.currency;
    this._nextRunAt = props.nextRunAt;
    this._lastRunAt = props.lastRunAt;
    this._completedCycles = props.completedCycles;
    this._maxCycles = props.maxCycles;
  }

  static create(props: RecurringPaymentEntityProps): RecurringPaymentEntity {
    const now = new Date().toISOString();
    const id = RecurringIdVO.create(crypto.randomUUID());
    const entity = new RecurringPaymentEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new RecurringPaymentScheduledEvent(id.value, props.paymentId.value, props.nextRunAt.toISOString(), 0),
    );
    return entity;
  }

  static reconstitute(
    id: RecurringIdVO,
    props: RecurringPaymentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): RecurringPaymentEntity {
    return new RecurringPaymentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  pause(): RecurringPaymentEntity {
    return new RecurringPaymentEntity(
      this.id,
      { ...this._toProps(), status: RecurringStatusVO.create('paused') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  cancel(): RecurringPaymentEntity {
    return new RecurringPaymentEntity(
      this.id,
      { ...this._toProps(), status: RecurringStatusVO.create('cancelled') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markFailed(reason: string): RecurringPaymentEntity {
    const now = new Date();
    const updated = new RecurringPaymentEntity(
      this.id,
      { ...this._toProps(), status: RecurringStatusVO.create('failed') },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new RecurringPaymentFailedEvent(this.id.value, reason, this.version + 1),
    );
    return updated;
  }

  get paymentId(): PaymentIdVO { return this._paymentId; }
  get frequency(): RecurringFrequencyVO { return this._frequency; }
  get status(): RecurringStatusVO { return this._status; }
  get amount(): PaymentAmountVO { return this._amount; }
  get currency(): PaymentCurrencyVO { return this._currency; }
  get nextRunAt(): Date { return this._nextRunAt; }
  get lastRunAt(): Date | null { return this._lastRunAt; }
  get completedCycles(): number { return this._completedCycles; }
  get maxCycles(): number | null { return this._maxCycles; }

  private _toProps(): RecurringPaymentEntityProps {
    return {
      paymentId: this._paymentId,
      frequency: this._frequency,
      status: this._status,
      amount: this._amount,
      currency: this._currency,
      nextRunAt: this._nextRunAt,
      lastRunAt: this._lastRunAt,
      completedCycles: this._completedCycles,
      maxCycles: this._maxCycles,
    };
  }
}
