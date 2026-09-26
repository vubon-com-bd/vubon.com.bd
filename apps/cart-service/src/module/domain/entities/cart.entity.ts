import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';
import { CartStatusVO } from '../value-objects/primitives/cart-status.vo';
import { CartTypeVO } from '../value-objects/primitives/cart-type.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  CartCreatedEvent,
  CartUpdatedEvent,
  CartClearedEvent,
} from '../events/cart.events';

export interface CartEntityProps {
  readonly userId: UserIdVO | null;
  readonly type: CartTypeVO;
  readonly status: CartStatusVO;
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly taxTotal: number;
  readonly shippingTotal: number;
  readonly grandTotal: number;
  readonly currency: string;
}

export class CartEntity extends AggregateRoot<CartIdVO> {
  private readonly _userId: UserIdVO | null;
  private readonly _type: CartTypeVO;
  private readonly _status: CartStatusVO;
  private readonly _itemCount: number;
  private readonly _subtotal: number;
  private readonly _discountTotal: number;
  private readonly _taxTotal: number;
  private readonly _shippingTotal: number;
  private readonly _grandTotal: number;
  private readonly _currency: string;

  private constructor(
    id: CartIdVO,
    props: CartEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._status = props.status;
    this._itemCount = props.itemCount;
    this._subtotal = props.subtotal;
    this._discountTotal = props.discountTotal;
    this._taxTotal = props.taxTotal;
    this._shippingTotal = props.shippingTotal;
    this._grandTotal = props.grandTotal;
    this._currency = props.currency;
  }

  static create(props: CartEntityProps): CartEntity {
    const now = new Date().toISOString();
    const id = CartIdVO.create(crypto.randomUUID());
    const entity = new CartEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new CartCreatedEvent(id.value, props.userId?.value ?? null, props.type.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: CartIdVO,
    props: CartEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CartEntity {
    return new CartEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateTotals(totals: {
    readonly itemCount: number;
    readonly subtotal: number;
    readonly discountTotal: number;
    readonly taxTotal: number;
    readonly shippingTotal: number;
    readonly grandTotal: number;
  }): CartEntity {
    const now = new Date().toISOString();
    const updated = new CartEntity(
      this.id,
      { ...this._toProps(), ...totals },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CartUpdatedEvent(this.id.value, totals.itemCount, this.version + 1),
    );
    return updated;
  }

  clear(): CartEntity {
    const now = new Date().toISOString();
    const updated = new CartEntity(
      this.id,
      {
        ...this._toProps(),
        itemCount: 0,
        subtotal: 0,
        discountTotal: 0,
        taxTotal: 0,
        shippingTotal: 0,
        grandTotal: 0,
      },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new CartClearedEvent(this.id.value, this.version + 1),
    );
    return updated;
  }

  get userId(): UserIdVO | null { return this._userId; }
  get type(): CartTypeVO { return this._type; }
  get status(): CartStatusVO { return this._status; }
  get itemCount(): number { return this._itemCount; }
  get subtotal(): number { return this._subtotal; }
  get discountTotal(): number { return this._discountTotal; }
  get taxTotal(): number { return this._taxTotal; }
  get shippingTotal(): number { return this._shippingTotal; }
  get grandTotal(): number { return this._grandTotal; }
  get currency(): string { return this._currency; }

  get isEmpty(): boolean { return this._itemCount === 0; }

  private _toProps(): CartEntityProps {
    return {
      userId: this._userId,
      type: this._type,
      status: this._status,
      itemCount: this._itemCount,
      subtotal: this._subtotal,
      discountTotal: this._discountTotal,
      taxTotal: this._taxTotal,
      shippingTotal: this._shippingTotal,
      grandTotal: this._grandTotal,
      currency: this._currency,
    };
  }
}
