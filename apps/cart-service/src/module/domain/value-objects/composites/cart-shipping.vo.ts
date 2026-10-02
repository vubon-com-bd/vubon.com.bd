/**
 * Cart Shipping Composite VO
 * @module cart-service/domain/value-objects/composites
 *
 * Business rules:
 * - Free shipping when subtotal >= threshold
 * - Shipping cost never negative
 * - Method determines estimated delivery window
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SHIPPING_METHOD_LIMIT } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartShippingIdVO } from '../primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '../primitives/cart-shipping-method.vo.js';

export interface CartShippingProps {
  readonly id: CartShippingIdVO;
  readonly method: CartShippingMethodVO;
  readonly cost: number;
  readonly currency: string;
  readonly freeShippingThreshold: number;
  readonly addressId?: string;
}

export class CartShippingCompositeVO extends BaseVO<CartShippingProps> {
  private constructor(props: CartShippingProps) {
    super(props);
  }

  static create(props: CartShippingProps): CartShippingCompositeVO {
    if (props.cost < 0) {
      throw new ValidationError('Shipping cost cannot be negative', 'cost');
    }
    if (props.cost > SHIPPING_METHOD_LIMIT.MAX_SHIPPING_COST) {
      throw new ValidationError(
        `Shipping cost exceeds max ${SHIPPING_METHOD_LIMIT.MAX_SHIPPING_COST}`,
        'cost',
      );
    }
    if (props.freeShippingThreshold < 0) {
      throw new ValidationError('Free shipping threshold cannot be negative', 'threshold');
    }
    if (props.method.requiresAddress() && !props.addressId) {
      throw new ValidationError(
        `Shipping method "${props.method.value}" requires an address`,
        'addressId',
      );
    }
    return new CartShippingCompositeVO(props);
  }

  static reconstitute(props: CartShippingProps): CartShippingCompositeVO {
    return new CartShippingCompositeVO(props);
  }

  static free(method: CartShippingMethodVO, currency: string): CartShippingCompositeVO {
    return new CartShippingCompositeVO({
      id: CartShippingIdVO.create('00000000-0000-0000-0000-000000000001'),
      method,
      cost: 0,
      currency,
      freeShippingThreshold: 0,
    });
  }

  get id(): CartShippingIdVO { return this.value.id; }
  get method(): CartShippingMethodVO { return this.value.method; }
  get currency(): string { return this.value.currency; }
  get addressId(): string | undefined { return this.value.addressId; }

  /** Effective cost after applying free-shipping threshold */
  effectiveCost(subtotal: number): number {
    if (subtotal < 0) {
      throw new ValidationError('Subtotal cannot be negative', 'subtotal');
    }
    if (
      this.value.freeShippingThreshold > 0 &&
      subtotal >= this.value.freeShippingThreshold
    ) {
      return 0;
    }
    if (this.value.method.isPickup()) {
      return 0;
    }
    return this.value.cost;
  }

  /** Amount required to qualify for free shipping (0 if already qualified) */
  amountToFreeShipping(subtotal: number): number {
    if (this.value.freeShippingThreshold === 0) return 0;
    const remaining = this.value.freeShippingThreshold - subtotal;
    return remaining > 0 ? this.round(remaining) : 0;
  }

  estimatedDays(): { min: number; max: number } {
    return this.value.method.estimatedDays();
  }

  isFree(subtotal: number): boolean {
    return this.effectiveCost(subtotal) === 0;
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
