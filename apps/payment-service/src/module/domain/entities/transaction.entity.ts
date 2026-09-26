import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { TransactionIdVO } from '../value-objects/primitives/transaction-id.vo';
import { TransactionTypeVO } from '../value-objects/primitives/transaction-type.vo';
import { TransactionStatusVO } from '../value-objects/primitives/transaction-status.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';
import { PaymentAmountVO } from '../value-objects/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '../value-objects/primitives/payment-currency.vo';
import { TransactionCreatedEvent } from '../events/transaction.events';

export interface TransactionEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly type: TransactionTypeVO;
  readonly status: TransactionStatusVO;
  readonly amount: PaymentAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly gatewayTransactionId: string | null;
  readonly reference: string | null;
}

export class TransactionEntity extends AggregateRoot<TransactionIdVO> {
  private readonly _paymentId: PaymentIdVO;
  private readonly _type: TransactionTypeVO;
  private readonly _status: TransactionStatusVO;
  private readonly _amount: PaymentAmountVO;
  private readonly _currency: PaymentCurrencyVO;
  private readonly _gatewayTransactionId: string | null;
  private readonly _reference: string | null;

  private constructor(
    id: TransactionIdVO,
    props: TransactionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._type = props.type;
    this._status = props.status;
    this._amount = props.amount;
    this._currency = props.currency;
    this._gatewayTransactionId = props.gatewayTransactionId;
    this._reference = props.reference;
  }

  static create(props: TransactionEntityProps): TransactionEntity {
    const now = new Date().toISOString();
    const id = TransactionIdVO.create(crypto.randomUUID());
    const entity = new TransactionEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new TransactionCreatedEvent(id.value, props.paymentId.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: TransactionIdVO,
    props: TransactionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TransactionEntity {
    return new TransactionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get paymentId(): PaymentIdVO { return this._paymentId; }
  get type(): TransactionTypeVO { return this._type; }
  get status(): TransactionStatusVO { return this._status; }
  get amount(): PaymentAmountVO { return this._amount; }
  get currency(): PaymentCurrencyVO { return this._currency; }
  get gatewayTransactionId(): string | null { return this._gatewayTransactionId; }
  get reference(): string | null { return this._reference; }
}
