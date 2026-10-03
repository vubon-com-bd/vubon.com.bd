/**
 * CartShippingEntity — child entity of Cart aggregate
 * @module cart-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPPING_METHOD_LIMIT } from '@vubon/shared-constants/logistics';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CartShippingIdVO } from '../value-objects/primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '../value-objects/primitives/cart-shipping-method.vo.js';

export interface CartShippingEntityProps {
  readonly cartId: CartIdVO;
  readonly method: CartShippingMethodVO;
  readonly cost: number;
  readonly currency: string;
  readonly freeShippingThreshold: number;
  readonly addressId?: string;
}

export class CartShippingEntity extends BaseEntity<string> {
  private _method: CartShippingMethodVO;
  private _cost: number;
  private _freeShippingThreshold: number;
  private _addressId?: string;
  private readonly _cartId: CartIdVO;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartShippingEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._method = props.method;
    this._cost = props.cost;
    this._currency = props.currency;
    this._freeShippingThreshold = props.freeShippingThreshold;
    this._addressId = props.addressId;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._cost < 0) {
      throw new ValidationError('Shipping cost cannot be negative', 'cost');
    }
    if (this._cost > SHIPPING_METHOD_LIMIT.MAX_SHIPPING_COST) {
      throw new ValidationError(
        `Shipping cost exceeds ${SHIPPING_METHOD_LIMIT.MAX_SHIPPING_COST}`,
        'cost',
      );
    }
    if (this._freeShippingThreshold < 0) {
      throw new ValidationError('Free shipping threshold cannot be negative', 'threshold');
    }
  }

  get cartId(): CartIdVO { return this._cartId; }
  get method(): CartShippingMethodVO { return this._method; }
  get cost(): number { return this._cost; }
  get currency(): string { return this._currency; }
  get freeShippingThreshold(): number { return this._freeShippingThreshold; }
  get addressId(): string | undefined { return this._addressId; }
  get toIdVO(): CartShippingIdVO { return CartShippingIdVO.reconstitute(this.id); }

  effectiveCost(subtotal: number): number {
    if (subtotal >= this._freeShippingThreshold && this._freeShippingThreshold > 0) {
      return 0;
    }
    if (this._method.isPickup()) return 0;
    return this._cost;
  }

  estimatedDays(): { min: number; max: number } {
    return this._method.estimatedDays();
  }

  changeMethod(
    method: CartShippingMethodVO,
    cost: number,
    addressId: string | undefined,
    now: string,
  ): void {
    this._method = method;
    this._cost = cost;
    this._addressId = addressId;
    this.assertInvariants();
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  setAddress(addressId: string | undefined, now: string): void {
    if (this._method.requiresAddress() && !addressId) {
      throw new ValidationError(
        `Method "${this._method.value}" requires an address`,
        'addressId',
      );
    }
    this._addressId = addressId;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: CartShippingEntityProps;
    now: string;
  }): CartShippingEntity {
    return new CartShippingEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CartShippingEntityProps;
  }): CartShippingEntity {
    return new CartShippingEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
