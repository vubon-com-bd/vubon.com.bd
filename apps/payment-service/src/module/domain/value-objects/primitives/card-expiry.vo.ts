/**
 * CardExpiry Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - Month 1-12
 * - Year >= current year (checked at create, not reconstitute)
 * - Card valid through END of expiry month
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface CardExpiryValue {
  readonly month: number;
  readonly year: number;
}

export class CardExpiryVO extends BaseVO<CardExpiryValue> {
  private constructor(value: CardExpiryValue) {
    super(value);
  }

  static create(month: number, year: number, reference: Date = new Date()): CardExpiryVO {
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      throw new ValidationError('CardExpiry month must be 1-12', 'expiryMonth');
    }
    if (!Number.isInteger(year) || year < 2000 || year > 2100) {
      throw new ValidationError('CardExpiry year must be 2000-2100', 'expiryYear');
    }
    const expiryDate = new Date(year, month, 0, 23, 59, 59, 999);
    if (expiryDate.getTime() < reference.getTime()) {
      throw new ValidationError('Card is expired', 'expiry');
    }
    return new CardExpiryVO({ month, year });
  }

  static reconstitute(month: number, year: number): CardExpiryVO {
    return new CardExpiryVO({ month, year });
  }

  get month(): number { return this.value.month; }
  get year(): number { return this.value.year; }

  isExpired(reference: Date = new Date()): boolean {
    const expiryDate = new Date(this.year, this.month, 0, 23, 59, 59, 999);
    return expiryDate.getTime() < reference.getTime();
  }

  toMMYY(): string {
    return `${String(this.month).padStart(2, '0')}/${String(this.year).slice(-2)}`;
  }
}
