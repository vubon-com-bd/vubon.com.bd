/**
 * CartShippingEntity — Child of Cart aggregate
 * @module cart-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CartShippingIdVO } from '../value-objects/primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '../value-objects/primitives/cart-shipping-method.vo.js';
import { AddressIdVO } from '../value-objects/primitives/address-id.vo.js';

export interface CartShippingEntityProps {
  readonly cartId: CartIdVO;
  readonly shippingId: CartShippingIdVO;
  readonly method: CartShippingMethodVO;
  readonly cost: number;
  readonly currency: string;
  readonly freeAbove?: number;
  readonly estimatedDays?: number;
  readonly addressId?: AddressIdVO;
}

export class CartShippingEntity extends BaseEntity<string> {
  private _method: CartShippingMethodVO;
  private _cost: number;
  private _freeAbove?: number;
  private _estimatedDays?: number;
  private _addressId?: AddressIdVO;
  private _updatedAtInternal: string;

  private readonly _cartId: CartIdVO;
  private readonly _shippingId: CartShippingIdVO;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartShippingEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._cartId = props.cartId;
    this._shippingId = props.shippingId;
    this._method = props.method;
    this._cost = props.cost;
    this._currency = props.currency;
    this._freeAbove = props.freeAbove;
    this._estimatedDays = props.estimatedDays;
    this._addressId = props.addressId;
    this._updatedAtInternal = updatedAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isFinite(this._cost) || this._cost < 0) {
      throw new ValidationError('cost must be non-negative', 'cost');
    }
    if (this._freeAbove !== undefined && this._freeAbove < 0) {
      throw new ValidationError('freeAbove must be non-negative', 'freeAbove');
    }
    if (this._estimatedDays !== undefined && this._estimatedDays < 0) {
      throw new ValidationError('estimatedDays must be non-negative', 'estimatedDays');
    }
  }

  get cartId(): CartIdVO { return this._cartId; }
  get shippingId(): CartShippingIdVO { return this._shippingId; }
  get method(): CartShippingMethodVO { return this._method; }
  get cost(): number { return this._cost; }
  get currency(): string { return this._currency; }
  get freeAbove(): number | undefined { return this._freeAbove; }
  get estimatedDays(): number | undefined { return this._estimatedDays; }
  get addressId(): AddressIdVO | undefined { return this._addressId; }
  get updatedAtInternal(): string { return this._updatedAtInternal; }

  isFree(subtotal: number): boolean {
    if (this._freeAbove === undefined) return this._cost === 0;
    return subtotal >= this._freeAbove;
  }

  effectiveCost(subtotal: number): number {
    return this.isFree(subtotal) ? 0 : this._cost;
  }

  hasAddress(): boolean {
    return this._addressId !== undefined;
  }

  changeMethod(
    method: CartShippingMethodVO,
    now: string = new Date().toISOString(),
  ): void {
    this._method = method;
    this.touch(now);
  }

  setCost(cost: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(cost) || cost < 0) {
      throw new ValidationError('cost must be non-negative', 'cost');
    }
    this._cost = cost;
    this.touch(now);
  }

  setAddress(addressId: AddressIdVO, now: string = new Date().toISOString()): void {
    this._addressId = addressId;
    this.touch(now);
  }

  private touch(now: string): void {
    this._updatedAtInternal = now;
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
    props: CartShippingEntityProps;
  }): CartShippingEntity {
    return new CartShippingEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }
}
