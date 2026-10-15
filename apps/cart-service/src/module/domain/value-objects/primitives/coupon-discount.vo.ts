/**
 * CouponDiscount Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - type: percentage | fixed
 * - percentage: 0-100
 * - fixed: >= 0
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type CouponDiscountType = 'percentage' | 'fixed';

export interface CouponDiscountProps {
  readonly type: CouponDiscountType;
  readonly value: number;
  readonly maxAmount?: number;
}

export class CouponDiscountVO extends BaseVO<CouponDiscountProps> {
  private constructor(props: CouponDiscountProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CouponDiscountProps): CouponDiscountVO {
    const vo = new CouponDiscountVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CouponDiscountProps): CouponDiscountVO {
    return new CouponDiscountVO(props);
  }

  protected validate(): void {
    const { type, value, maxAmount } = this.value;

    if (type !== 'percentage' && type !== 'fixed') {
      throw new ValidationError(
        `Invalid discount type: "${type}"`,
        'discountType',
      );
    }
    if (!Number.isFinite(value) || value < 0) {
      throw new ValidationError('Discount value must be non-negative', 'value');
    }
    if (type === 'percentage' && value > 100) {
      throw new ValidationError('Percentage discount cannot exceed 100', 'value');
    }
    if (maxAmount !== undefined && (!Number.isFinite(maxAmount) || maxAmount < 0)) {
      throw new ValidationError('maxAmount must be non-negative', 'maxAmount');
    }
  }

  get type(): CouponDiscountType {
    return this.value.type;
  }
  get value_(): number {
    return this.value.value;
  }
  get maxAmount(): number | undefined {
    return this.value.maxAmount;
  }

  isPercentage(): boolean {
    return this.type === 'percentage';
  }

  isFixed(): boolean {
    return this.type === 'fixed';
  }

  calculate(subtotal: number): number {
    if (!Number.isFinite(subtotal) || subtotal <= 0) return 0;
    let amount =
      this.type === 'percentage' ? (subtotal * this.value.value) / 100 : this.value.value;

    if (this.value.maxAmount !== undefined) {
      amount = Math.min(amount, this.value.maxAmount);
    }
    amount = Math.min(amount, subtotal);
    return Math.round(amount * 100) / 100;
  }
}
