/**
 * Price Value Object
 * @module product-service/domain/value-objects/primitives
 *
 * Uses composition (not inheritance) since shared-kernel MoneyVO
 * has a private constructor and cannot be extended.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PRICING } from '@vubon/shared-constants/business/product';
import type { CurrencyCode } from '@vubon/shared-types/common';
import { InvalidPriceError } from '../../errors/pricing.errors.js';

export interface PriceValue {
  readonly amount: number;
  readonly currency: CurrencyCode;
}

export class PriceVO extends BaseVO<PriceValue> {
  private constructor(value: PriceValue) {
    super(value);
  }

  static create(
    amount: number,
    currency: CurrencyCode = PRICING.DEFAULT_CURRENCY as CurrencyCode
  ): PriceVO {
    if (typeof amount !== 'number' || !Number.isFinite(amount)) {
      throw new InvalidPriceError(amount, 'must be a finite number');
    }
    if (amount < PRICING.MIN_PRICE) {
      throw new InvalidPriceError(amount, `cannot be less than ${PRICING.MIN_PRICE}`);
    }
    if (amount > PRICING.MAX_PRICE) {
      throw new InvalidPriceError(amount, `cannot exceed ${PRICING.MAX_PRICE}`);
    }
    const decimals = PRICING.DECIMAL_PLACES;
    const factor = Math.pow(10, decimals);
    const rounded = Math.round(amount * factor) / factor;
    return new PriceVO({ amount: rounded, currency });
  }

  static reconstitute(amount: number, currency: CurrencyCode): PriceVO {
    return new PriceVO({ amount, currency });
  }

  static zero(currency: CurrencyCode = PRICING.DEFAULT_CURRENCY as CurrencyCode): PriceVO {
    return new PriceVO({ amount: 0, currency });
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): CurrencyCode {
    return this.value.currency;
  }

  add(other: PriceVO): PriceVO {
    this.assertSameCurrency(other);
    return PriceVO.create(this.amount + other.amount, this.currency);
  }

  subtract(other: PriceVO): PriceVO {
    this.assertSameCurrency(other);
    const result = this.amount - other.amount;
    if (result < 0) {
      throw new InvalidPriceError(result, 'subtraction would result in negative price');
    }
    return PriceVO.create(result, this.currency);
  }

  multiply(factor: number): PriceVO {
    if (!Number.isFinite(factor) || factor < 0) {
      throw new InvalidPriceError(factor, 'multiplier must be a non-negative finite number');
    }
    return PriceVO.create(this.amount * factor, this.currency);
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  isGreaterThan(other: PriceVO): boolean {
    this.assertSameCurrency(other);
    return this.amount > other.amount;
  }

  private assertSameCurrency(other: PriceVO): void {
    if (this.currency !== other.currency) {
      throw new Error(`Currency mismatch: ${this.currency} vs ${other.currency}`);
    }
  }
}
