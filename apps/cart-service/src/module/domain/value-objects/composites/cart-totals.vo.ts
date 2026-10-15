/**
 * CartTotalsVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface CartTotalsVOProps {
  readonly subtotal: number;
  readonly discount: number;
  readonly tax: number;
  readonly shipping: number;
  readonly total: number;
  readonly currency: string;
}

export class CartTotalsVO extends BaseVO<CartTotalsVOProps> {
  private constructor(props: CartTotalsVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CartTotalsVOProps): CartTotalsVO {
    const vo = new CartTotalsVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CartTotalsVOProps): CartTotalsVO {
    return new CartTotalsVO(props);
  }

  protected validate(): void {
    const v = this.value;
    const fields: (keyof CartTotalsVOProps)[] = [
      'subtotal',
      'discount',
      'tax',
      'shipping',
      'total',
    ];
    for (const f of fields) {
      const val = v[f];
      if (typeof val !== 'number' || !Number.isFinite(val) || val < 0) {
        throw new ValidationError(`${f} must be a non-negative number`, f);
      }
    }
    const expected = Math.round((v.subtotal - v.discount + v.tax + v.shipping) * 100) / 100;
    if (Math.abs(expected - v.total) > 0.01) {
      throw new ValidationError(
        `total mismatch: expected ${expected}, got ${v.total}`,
        'total',
      );
    }
  }

  get subtotal(): number { return this.value.subtotal; }
  get discount(): number { return this.value.discount; }
  get tax(): number { return this.value.tax; }
  get shipping(): number { return this.value.shipping; }
  get total(): number { return this.value.total; }
  get currency(): string { return this.value.currency; }

  hasDiscount(): boolean { return this.value.discount > 0; }
  hasTax(): boolean { return this.value.tax > 0; }
  hasShipping(): boolean { return this.value.shipping > 0; }
  isEmpty(): boolean { return this.value.subtotal === 0; }
}
