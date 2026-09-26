import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CartShippingIdVO } from '../value-objects/primitives/cart-shipping-id.vo';
import { CartShippingMethodVO } from '../value-objects/primitives/cart-shipping-method.vo';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';
import { AddressIdVO } from '../value-objects/primitives/address-id.vo';

export interface CartShippingEntityProps {
  readonly cartId: CartIdVO;
  readonly method: CartShippingMethodVO;
  readonly cost: number;
  readonly currency: string;
  readonly addressId: AddressIdVO | null;
  readonly estimatedDays: number | null;
}

export class CartShippingEntity extends BaseEntity<CartShippingIdVO> {
  private readonly _cartId: CartIdVO;
  private readonly _method: CartShippingMethodVO;
  private readonly _cost: number;
  private readonly _currency: string;
  private readonly _addressId: AddressIdVO | null;
  private readonly _estimatedDays: number | null;

  private constructor(
    id: CartShippingIdVO,
    props: CartShippingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._method = props.method;
    this._cost = props.cost;
    this._currency = props.currency;
    this._addressId = props.addressId;
    this._estimatedDays = props.estimatedDays;
  }

  static create(props: CartShippingEntityProps): CartShippingEntity {
    const now = new Date().toISOString();
    const id = CartShippingIdVO.create(crypto.randomUUID());
    return new CartShippingEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: CartShippingIdVO,
    props: CartShippingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CartShippingEntity {
    return new CartShippingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changeMethod(method: CartShippingMethodVO, cost: number): CartShippingEntity {
    return new CartShippingEntity(
      this.id,
      { ...this._toProps(), method, cost },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get cartId(): CartIdVO { return this._cartId; }
  get method(): CartShippingMethodVO { return this._method; }
  get cost(): number { return this._cost; }
  get currency(): string { return this._currency; }
  get addressId(): AddressIdVO | null { return this._addressId; }
  get estimatedDays(): number | null { return this._estimatedDays; }

  private _toProps(): CartShippingEntityProps {
    return {
      cartId: this._cartId,
      method: this._method,
      cost: this._cost,
      currency: this._currency,
      addressId: this._addressId,
      estimatedDays: this._estimatedDays,
    };
  }
}
