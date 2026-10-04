/**
 * Currency Value Object — 3-char ISO 4217 code
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const SUPPORTED = new Set([
  'BDT', 'USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'SGD', 'MYR', 'AED', 'SAR',
]);

export class CurrencyVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CurrencyVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Currency must be a string', 'currency');
    }
    const upper = raw.trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(upper)) {
      throw new ValidationError('Currency must be a 3-letter ISO code', 'currency');
    }
    return new CurrencyVO(upper);
  }

  static reconstitute(raw: string): CurrencyVO {
    return new CurrencyVO(raw.toUpperCase());
  }

  isSupported(): boolean {
    return SUPPORTED.has(this.value);
  }

  isBDT(): boolean {
    return this.value === 'BDT';
  }

  isInternational(): boolean {
    return !this.isBDT();
  }

  decimals(): number {
    return this.value === 'JPY' ? 0 : 2;
  }

  symbol(): string {
    const map: Record<string, string> = {
      BDT: '৳',
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
      JPY: '¥',
    };
    return map[this.value] ?? this.value;
  }
}
