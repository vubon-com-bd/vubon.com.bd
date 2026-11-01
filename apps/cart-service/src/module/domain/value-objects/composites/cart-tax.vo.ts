/**
 * CartTaxVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartTaxIdVO } from '../primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '../primitives/cart-tax-rate.vo.js';

export interface CartTaxVOProps {
  readonly id: CartTaxIdVO;
  readonly rate: CartTaxRateVO;
  readonly label: string;
  readonly inclusive: boolean;
  readonly calculatedAt: string;
}

export class CartTaxVO extends BaseVO<CartTaxVOProps> {
  private constructor(props: CartTaxVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CartTaxVOProps): CartTaxVO {
    const vo = new CartTaxVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CartTaxVOProps): CartTaxVO {
    return new CartTaxVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (typeof v.label !== 'string' || v.label.trim().length === 0) {
      throw new ValidationError('label cannot be empty', 'label');
    }
  }

  get id(): CartTaxIdVO { return this.value.id; }
  get rate(): CartTaxRateVO { return this.value.rate; }
  get label(): string { return this.value.label; }
  get inclusive(): boolean { return this.value.inclusive; }
  get calculatedAt(): string { return this.value.calculatedAt; }

  isInclusive(): boolean { return this.value.inclusive; }
  isExclusive(): boolean { return !this.value.inclusive; }
  isZero(): boolean { return this.value.rate.isZero(); }

  calculate(amount: number): number {
    return this.value.rate.calculate(amount);
  }
}
