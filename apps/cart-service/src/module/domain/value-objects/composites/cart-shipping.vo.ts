/**
 * CartShippingVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartShippingIdVO } from '../primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '../primitives/cart-shipping-method.vo.js';

export interface CartShippingVOProps {
  readonly id: CartShippingIdVO;
  readonly method: CartShippingMethodVO;
  readonly cost: number;
  readonly currency: string;
  readonly freeAbove?: number;
  readonly estimatedDays?: number;
}

export class CartShippingVO extends BaseVO<CartShippingVOProps> {
  private constructor(props: CartShippingVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CartShippingVOProps): CartShippingVO {
    const vo = new CartShippingVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CartShippingVOProps): CartShippingVO {
    return new CartShippingVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!Number.isFinite(v.cost) || v.cost < 0) {
      throw new ValidationError('cost must be non-negative', 'cost');
    }
    if (v.freeAbove !== undefined && v.freeAbove < 0) {
      throw new ValidationError('freeAbove must be non-negative', 'freeAbove');
    }
    if (v.estimatedDays !== undefined && v.estimatedDays < 0) {
      throw new ValidationError('estimatedDays must be non-negative', 'estimatedDays');
    }
  }

  get id(): CartShippingIdVO { return this.value.id; }
  get method(): CartShippingMethodVO { return this.value.method; }
  get cost(): number { return this.value.cost; }
  get currency(): string { return this.value.currency; }
  get freeAbove(): number | undefined { return this.value.freeAbove; }
  get estimatedDays(): number | undefined { return this.value.estimatedDays; }

  isFree(subtotal: number): boolean {
    if (this.value.freeAbove === undefined) return this.value.cost === 0;
    return subtotal >= this.value.freeAbove;
  }

  effectiveCost(subtotal: number): number {
    return this.isFree(subtotal) ? 0 : this.value.cost;
  }
}
