import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { RefundIdVO } from '../value-objects/primitives/refund-id.vo';
import { RefundAmountVO } from '../value-objects/primitives/refund-amount.vo';
import { RefundStatusVO } from '../value-objects/primitives/refund-status.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';
import { PaymentCurrencyVO } from '../value-objects/primitives/payment-currency.vo';
import {
  RefundRequestedEvent,
  RefundProcessedEvent,
} from '../events/refund.events';

export interface RefundEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly amount: RefundAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly status: RefundStatusVO;
  readonly reason: string | null;
  readonly gatewayRefundId: string | null;
  readonly processedAt: Date | null;
}

export class RefundEntity extends AggregateRoot<RefundIdVO> {
  private readonly _paymentId: PaymentIdVO;
  private readonly _amount: RefundAmountVO;
  private readonly _currency: PaymentCurrencyVO;
  private readonly _status: RefundStatusVO;
  private readonly _reason: string | null;
  private readonly _gatewayRefundId: string | null;
  private readonly _processedAt: Date | null;

  private constructor(
    id: RefundIdVO,
    props: RefundEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._amount = props.amount;
    this._currency = props.currency;
    this._status = props.status;
    this._reason = props.reason;
    this._gatewayRefundId = props.gatewayRefundId;
    this._processedAt = props.processedAt;
  }

  static create(props: RefundEntityProps): RefundEntity {
    const now = new Date().toISOString();
    const id = RefundIdVO.create(crypto.randomUUID());
    const entity = new RefundEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new RefundRequestedEvent(id.value, props.paymentId.value, props.amount.amount, 0),
    );
    return entity;
  }

  static reconstitute(
    id: RefundIdVO,
    props: RefundEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): RefundEntity {
    return new RefundEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markProcessed(gatewayRefundId: string): RefundEntity {
    const now = new Date();
    const updated = new RefundEntity(
      this.id,
      {
        ...this._toProps(),
        status: RefundStatusVO.create('succeeded'),
        gatewayRefundId,
        processedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new RefundProcessedEvent(this.id.value, this._paymentId.value, this._amount.amount, this.version + 1),
    );
    return updated;
  }

  get paymentId(): PaymentIdVO { return this._paymentId; }
  get amount(): RefundAmountVO { return this._amount; }
  get currency(): PaymentCurrencyVO { return this._currency; }
  get status(): RefundStatusVO { return this._status; }
  get reason(): string | null { return this._reason; }
  get gatewayRefundId(): string | null { return this._gatewayRefundId; }
  get processedAt(): Date | null { return this._processedAt; }

  private _toProps(): RefundEntityProps {
    return {
      paymentId: this._paymentId,
      amount: this._amount,
      currency: this._currency,
      status: this._status,
      reason: this._reason,
      gatewayRefundId: this._gatewayRefundId,
      processedAt: this._processedAt,
    };
  }
}
