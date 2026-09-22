import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { VoucherCodeVO } from '../value-objects/primitives/voucher-code.vo';
import { VoucherStatusVO } from '../value-objects/primitives/voucher-status.vo';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';
import {
  VoucherAppliedEvent,
  VoucherRemovedEvent,
} from '../events/voucher.events';

export interface CartVoucherEntityProps {
  readonly cartId: CartIdVO;
  readonly code: VoucherCodeVO;
  readonly value: number;
  readonly currency: string;
  readonly status: VoucherStatusVO;
}

export class CartVoucherEntity extends AggregateRoot<string> {
  private readonly _cartId: CartIdVO;
  private readonly _code: VoucherCodeVO;
  private readonly _value: number;
  private readonly _currency: string;
  private readonly _status: VoucherStatusVO;

  private constructor(
    id: string,
    props: CartVoucherEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._code = props.code;
    this._value = props.value;
    this._currency = props.currency;
    this._status = props.status;
  }

  static create(props: CartVoucherEntityProps): CartVoucherEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const entity = new CartVoucherEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new VoucherAppliedEvent(props.cartId.value, props.code.value, props.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: string,
    props: CartVoucherEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CartVoucherEntity {
    return new CartVoucherEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  remove(): CartVoucherEntity {
    const now = new Date().toISOString();
    const updated = new CartVoucherEntity(
      this.id,
      { ...this._toProps(), status: VoucherStatusVO.create('removed') },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new VoucherRemovedEvent(this._cartId.value, this._code.value, this.version + 1),
    );
    return updated;
  }

  get cartId(): CartIdVO { return this._cartId; }
  get code(): VoucherCodeVO { return this._code; }
  get value(): number { return this._value; }
  get currency(): string { return this._currency; }
  get status(): VoucherStatusVO { return this._status; }

  private _toProps(): CartVoucherEntityProps {
    return {
      cartId: this._cartId,
      code: this._code,
      value: this._value,
      currency: this._currency,
      status: this._status,
    };
  }
}
