import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';
import { PaymentAmountVO } from '../value-objects/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '../value-objects/primitives/payment-currency.vo';
import { PaymentStatusVO } from '../value-objects/primitives/payment-status.vo';
import { PaymentTypeVO } from '../value-objects/primitives/payment-type.vo';
import { PaymentGatewayVO } from '../value-objects/primitives/payment-gateway.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  PaymentInitiatedEvent,
  PaymentCompletedEvent,
  PaymentFailedEvent,
} from '../events/payment.events';

export interface PaymentEntityProps {
  readonly orderId: OrderIdVO;
  readonly userId: UserIdVO;
  readonly type: PaymentTypeVO;
  readonly status: PaymentStatusVO;
  readonly amount: PaymentAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly gateway: PaymentGatewayVO | null;
  readonly gatewayPaymentId: string | null;
  readonly capturedAt: Date | null;
  readonly failureReason: string | null;
}

export class PaymentEntity extends AggregateRoot<PaymentIdVO> {
  private readonly _orderId: OrderIdVO;
  private readonly _userId: UserIdVO;
  private readonly _type: PaymentTypeVO;
  private readonly _status: PaymentStatusVO;
  private readonly _amount: PaymentAmountVO;
  private readonly _currency: PaymentCurrencyVO;
  private readonly _gateway: PaymentGatewayVO | null;
  private readonly _gatewayPaymentId: string | null;
  private readonly _capturedAt: Date | null;
  private readonly _failureReason: string | null;

  private constructor(
    id: PaymentIdVO,
    props: PaymentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._type = props.type;
    this._status = props.status;
    this._amount = props.amount;
    this._currency = props.currency;
    this._gateway = props.gateway;
    this._gatewayPaymentId = props.gatewayPaymentId;
    this._capturedAt = props.capturedAt;
    this._failureReason = props.failureReason;
  }

  static create(props: PaymentEntityProps): PaymentEntity {
    const now = new Date().toISOString();
    const id = PaymentIdVO.create(crypto.randomUUID());
    const entity = new PaymentEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new PaymentInitiatedEvent(
        id.value,
        props.orderId.value,
        props.amount.amount,
        props.currency.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: PaymentIdVO,
    props: PaymentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PaymentEntity {
    return new PaymentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markCompleted(): PaymentEntity {
    const now = new Date();
    const updated = new PaymentEntity(
      this.id,
      { ...this._toProps(), status: PaymentStatusVO.create('paid'), capturedAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new PaymentCompletedEvent(
        this.id.value,
        this._orderId.value,
        this._amount.amount,
        this._currency.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  markFailed(reason: string): PaymentEntity {
    const now = new Date();
    const updated = new PaymentEntity(
      this.id,
      { ...this._toProps(), status: PaymentStatusVO.create('failed'), failureReason: reason },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new PaymentFailedEvent(this.id.value, reason, this.version + 1),
    );
    return updated;
  }

  get orderId(): OrderIdVO { return this._orderId; }
  get userId(): UserIdVO { return this._userId; }
  get type(): PaymentTypeVO { return this._type; }
  get status(): PaymentStatusVO { return this._status; }
  get amount(): PaymentAmountVO { return this._amount; }
  get currency(): PaymentCurrencyVO { return this._currency; }
  get gateway(): PaymentGatewayVO | null { return this._gateway; }
  get gatewayPaymentId(): string | null { return this._gatewayPaymentId; }
  get capturedAt(): Date | null { return this._capturedAt; }
  get failureReason(): string | null { return this._failureReason; }

  get isPaid(): boolean {
    return this._status.value === 'paid';
  }

  private _toProps(): PaymentEntityProps {
    return {
      orderId: this._orderId,
      userId: this._userId,
      type: this._type,
      status: this._status,
      amount: this._amount,
      currency: this._currency,
      gateway: this._gateway,
      gatewayPaymentId: this._gatewayPaymentId,
      capturedAt: this._capturedAt,
      failureReason: this._failureReason,
    };
  }
}
