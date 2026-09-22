import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SplitIdVO } from '../value-objects/primitives/split-id.vo';
import { SplitAmountVO } from '../value-objects/primitives/split-amount.vo';
import { SplitTypeVO } from '../value-objects/primitives/split-type.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';
import { PaymentCurrencyVO } from '../value-objects/primitives/payment-currency.vo';
import { SplitPaymentCompletedEvent } from '../events/split.events';

export interface SplitPaymentEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly type: SplitTypeVO;
  readonly amount: SplitAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly recipientId: string;
  readonly status: string;
}

export class SplitPaymentEntity extends AggregateRoot<SplitIdVO> {
  private readonly _paymentId: PaymentIdVO;
  private readonly _type: SplitTypeVO;
  private readonly _amount: SplitAmountVO;
  private readonly _currency: PaymentCurrencyVO;
  private readonly _recipientId: string;
  private readonly _status: string;

  private constructor(
    id: SplitIdVO,
    props: SplitPaymentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._type = props.type;
    this._amount = props.amount;
    this._currency = props.currency;
    this._recipientId = props.recipientId;
    this._status = props.status;
  }

  static create(props: SplitPaymentEntityProps): SplitPaymentEntity {
    const now = new Date().toISOString();
    const id = SplitIdVO.create(crypto.randomUUID());
    return new SplitPaymentEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: SplitIdVO,
    props: SplitPaymentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SplitPaymentEntity {
    return new SplitPaymentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  complete(): SplitPaymentEntity {
    const now = new Date();
    const updated = new SplitPaymentEntity(
      this.id,
      { ...this._toProps(), status: 'completed' },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new SplitPaymentCompletedEvent(this.id.value, this._paymentId.value, this.version + 1),
    );
    return updated;
  }

  get paymentId(): PaymentIdVO { return this._paymentId; }
  get type(): SplitTypeVO { return this._type; }
  get amount(): SplitAmountVO { return this._amount; }
  get currency(): PaymentCurrencyVO { return this._currency; }
  get recipientId(): string { return this._recipientId; }
  get status(): string { return this._status; }

  private _toProps(): SplitPaymentEntityProps {
    return {
      paymentId: this._paymentId,
      type: this._type,
      amount: this._amount,
      currency: this._currency,
      recipientId: this._recipientId,
      status: this._status,
    };
  }
}
