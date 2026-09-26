import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CheckoutIdVO } from '../value-objects/primitives/checkout-id.vo';
import { CheckoutStatusVO } from '../value-objects/primitives/checkout-status.vo';
import { CheckoutStepVO } from '../value-objects/primitives/checkout-step.vo';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo';
import {
  CheckoutStartedEvent,
  CheckoutAddressSelectedEvent,
  CheckoutShippingSelectedEvent,
  CheckoutPaymentSelectedEvent,
  CheckoutCompletedEvent,
  CheckoutAbandonedEvent,
} from '../events/checkout.events';

export interface CheckoutEntityProps {
  readonly customerId: CustomerIdVO;
  readonly status: CheckoutStatusVO;
  readonly step: CheckoutStepVO;
  readonly addressId: string | null;
  readonly shippingId: string | null;
  readonly paymentId: string | null;
  readonly expiresAt: Date | null;
}

export class CheckoutEntity extends AggregateRoot<CheckoutIdVO> {
  private readonly _customerId: CustomerIdVO;
  private readonly _status: CheckoutStatusVO;
  private readonly _step: CheckoutStepVO;
  private readonly _addressId: string | null;
  private readonly _shippingId: string | null;
  private readonly _paymentId: string | null;
  private readonly _expiresAt: Date | null;

  private constructor(
    id: CheckoutIdVO,
    props: CheckoutEntityProps,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._customerId = props.customerId;
    this._status = props.status;
    this._step = props.step;
    this._addressId = props.addressId;
    this._shippingId = props.shippingId;
    this._paymentId = props.paymentId;
    this._expiresAt = props.expiresAt;
  }

  static create(props: CheckoutEntityProps): CheckoutEntity {
    const now = new Date().toISOString();
    const id = CheckoutIdVO.create(crypto.randomUUID());
    const entity = new CheckoutEntity(id, props, now, now);
    entity.addDomainEvent(
      new CheckoutStartedEvent(id.value, id.value, props.customerId.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: CheckoutIdVO,
    props: CheckoutEntityProps,
    createdAt: string,
    updatedAt: string,
  ): CheckoutEntity {
    return new CheckoutEntity(id, props, createdAt, updatedAt);
  }

  selectAddress(addressId: string): CheckoutEntity {
    const updated = new CheckoutEntity(
      this.id,
      { ...this._toProps(), addressId, step: CheckoutStepVO.create('shipping') },
      this.createdAt,
      new Date().toISOString(),
    );
    updated.addDomainEvent(
      new CheckoutAddressSelectedEvent(this.id.value, this.id.value, addressId, this.version + 1),
    );
    return updated;
  }

  selectShipping(shippingId: string): CheckoutEntity {
    const updated = new CheckoutEntity(
      this.id,
      { ...this._toProps(), shippingId, step: CheckoutStepVO.create('payment') },
      this.createdAt,
      new Date().toISOString(),
    );
    updated.addDomainEvent(
      new CheckoutShippingSelectedEvent(this.id.value, this.id.value, shippingId, this.version + 1),
    );
    return updated;
  }

  selectPayment(paymentId: string): CheckoutEntity {
    const updated = new CheckoutEntity(
      this.id,
      { ...this._toProps(), paymentId, step: CheckoutStepVO.create('review') },
      this.createdAt,
      new Date().toISOString(),
    );
    updated.addDomainEvent(
      new CheckoutPaymentSelectedEvent(this.id.value, this.id.value, paymentId, this.version + 1),
    );
    return updated;
  }

  complete(orderId: string): CheckoutEntity {
    const updated = new CheckoutEntity(
      this.id,
      { ...this._toProps(), status: CheckoutStatusVO.create('completed'), step: CheckoutStepVO.create('confirm') },
      this.createdAt,
      new Date().toISOString(),
    );
    updated.addDomainEvent(
      new CheckoutCompletedEvent(this.id.value, this.id.value, orderId, this.version + 1),
    );
    return updated;
  }

  abandon(reason: string): CheckoutEntity {
    const updated = new CheckoutEntity(
      this.id,
      { ...this._toProps(), status: CheckoutStatusVO.create('abandoned') },
      this.createdAt,
      new Date().toISOString(),
    );
    updated.addDomainEvent(
      new CheckoutAbandonedEvent(this.id.value, this.id.value, reason, this.version + 1),
    );
    return updated;
  }

  get customerId(): CustomerIdVO { return this._customerId; }
  get status(): CheckoutStatusVO { return this._status; }
  get step(): CheckoutStepVO { return this._step; }
  get addressId(): string | null { return this._addressId; }
  get shippingId(): string | null { return this._shippingId; }
  get paymentId(): string | null { return this._paymentId; }
  get expiresAt(): Date | null { return this._expiresAt; }

  get isExpired(): boolean {
    if (!this._expiresAt) return false;
    return this._expiresAt.getTime() <= Date.now();
  }

  private _toProps(): CheckoutEntityProps {
    return {
      customerId: this._customerId,
      status: this._status,
      step: this._step,
      addressId: this._addressId,
      shippingId: this._shippingId,
      paymentId: this._paymentId,
      expiresAt: this._expiresAt,
    };
  }
}
