/**
 * CouponDiscount Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Amount must be >= 0
 * - Currency must be valid ISO 4217 code
 * - Discount cannot exceed the subtotal it applies to
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { CurrencyCode } from '@vubon/shared-types/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface CouponDiscountValue {
  readonly amount: number;
  readonly currency: CurrencyCode;
}

export class CouponDiscountVO extends BaseVO<CouponDiscountValue> {
  private constructor(value: CouponDiscountValue) {
    super(value);
  }

  static create(amount: number, currency: CurrencyCode): CouponDiscountVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('Discount amount must be finite', 'discount');
    }
    if (amount < 0) {
      throw new ValidationError('Discount amount cannot be negative', 'discount');
    }
    if (typeof currency !== 'string' || currency.length === 0) {
      throw new ValidationError('Currency is required', 'currency');
    }
    // Round to 2 decimals
    const rounded = Math.round(amount * 100) / 100;
    return new CouponDiscountVO({ amount: rounded, currency });
  }

  static reconstitute(value: CouponDiscountValue): CouponDiscountVO {
    return new CouponDiscountVO(value);
  }

  static zero(currency: CurrencyCode): CouponDiscountVO {
    return new CouponDiscountVO({ amount: 0, currency });
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): CurrencyCode {
    return this.value.currency;
  }

  isZero(): boolean {
    return this.value.amount === 0;
  }

  /** Cap discount to a maximum (e.g., cart subtotal or maxDiscountAmount) */
  capAt(maxAmount: number): CouponDiscountVO {
    if (maxAmount < 0) {
      throw new ValidationError('Cap amount cannot be negative', 'capAmount');
    }
    const capped = Math.min(this.value.amount, maxAmount);
    return new CouponDiscountVO({ amount: capped, currency: this.value.currency });
  }

  /** Ensure discount never exceeds order total */
  validateAgainst(subtotal: number): void {
    if (this.value.amount > subtotal) {
      throw new ValidationError(
        `Discount ${this.value.amount} exceeds subtotal ${subtotal}`,
        'discount',
      );
    }
  }

  subtract(other: CouponDiscountVO): CouponDiscountVO {
    if (this.value.currency !== other.value.currency) {
      throw new ValidationError('Cannot subtract mismatched currencies', 'currency');
    }
    return CouponDiscountVO.create(
      this.value.amount - other.value.amount,
      this.value.currency,
    );
  }

  add(other: CouponDiscountVO): CouponDiscountVO {
    if (this.value.currency !== other.value.currency) {
      throw new ValidationError('Cannot add mismatched currencies', 'currency');
    }
    return CouponDiscountVO.create(
      this.value.amount + other.value.amount,
      this.value.currency,
    );
  }
}
