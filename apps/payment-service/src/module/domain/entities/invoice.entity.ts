import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { InvoiceIdVO } from '../value-objects/primitives/invoice-id.vo';
import { InvoiceNumberVO } from '../value-objects/primitives/invoice-number.vo';
import { InvoiceStatusVO } from '../value-objects/primitives/invoice-status.vo';
import { InvoiceAmountVO } from '../value-objects/primitives/invoice-amount.vo';
import { PaymentCurrencyVO } from '../value-objects/primitives/payment-currency.vo';
import {
  InvoiceGeneratedEvent,
  InvoicePaidEvent,
} from '../events/invoice.events';

export interface InvoiceEntityProps {
  readonly number: InvoiceNumberVO;
  readonly status: InvoiceStatusVO;
  readonly amount: InvoiceAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly userId: string | null;
  readonly orderId: string | null;
  readonly subscriptionId: string | null;
  readonly dueAt: Date | null;
  readonly paidAt: Date | null;
}

export class InvoiceEntity extends AggregateRoot<InvoiceIdVO> {
  private readonly _number: InvoiceNumberVO;
  private readonly _status: InvoiceStatusVO;
  private readonly _amount: InvoiceAmountVO;
  private readonly _currency: PaymentCurrencyVO;
  private readonly _userId: string | null;
  private readonly _orderId: string | null;
  private readonly _subscriptionId: string | null;
  private readonly _dueAt: Date | null;
  private readonly _paidAt: Date | null;

  private constructor(
    id: InvoiceIdVO,
    props: InvoiceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._number = props.number;
    this._status = props.status;
    this._amount = props.amount;
    this._currency = props.currency;
    this._userId = props.userId;
    this._orderId = props.orderId;
    this._subscriptionId = props.subscriptionId;
    this._dueAt = props.dueAt;
    this._paidAt = props.paidAt;
  }

  static create(props: InvoiceEntityProps): InvoiceEntity {
    const now = new Date().toISOString();
    const id = InvoiceIdVO.create(crypto.randomUUID());
    const entity = new InvoiceEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new InvoiceGeneratedEvent(id.value, props.number.value, props.amount.amount, 0),
    );
    return entity;
  }

  static reconstitute(
    id: InvoiceIdVO,
    props: InvoiceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): InvoiceEntity {
    return new InvoiceEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markPaid(): InvoiceEntity {
    const now = new Date();
    const updated = new InvoiceEntity(
      this.id,
      { ...this._toProps(), status: InvoiceStatusVO.create('paid'), paidAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new InvoicePaidEvent(this.id.value, this._number.value, this.version + 1),
    );
    return updated;
  }

  get number(): InvoiceNumberVO { return this._number; }
  get status(): InvoiceStatusVO { return this._status; }
  get amount(): InvoiceAmountVO { return this._amount; }
  get currency(): PaymentCurrencyVO { return this._currency; }
  get userId(): string | null { return this._userId; }
  get orderId(): string | null { return this._orderId; }
  get subscriptionId(): string | null { return this._subscriptionId; }
  get dueAt(): Date | null { return this._dueAt; }
  get paidAt(): Date | null { return this._paidAt; }

  private _toProps(): InvoiceEntityProps {
    return {
      number: this._number,
      status: this._status,
      amount: this._amount,
      currency: this._currency,
      userId: this._userId,
      orderId: this._orderId,
      subscriptionId: this._subscriptionId,
      dueAt: this._dueAt,
      paidAt: this._paidAt,
    };
  }
}
