/**
 * PaymentCurrency Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - ISO 4217 3-letter code
 * - Must be in supported CURRENCY list
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CURRENCY } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type PaymentCurrencyValue = (typeof CURRENCY)[keyof typeof CURRENCY];

const VALID_CURRENCIES: readonly string[] = Object.values(CURRENCY);

export class PaymentCurrencyVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PaymentCurrencyVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('PaymentCurrency must be a string', 'currency');
    }
    const normalized = raw.trim().toUpperCase();
    if (normalized.length !== 3) {
      throw new ValidationError('PaymentCurrency must be 3 letters (ISO 4217)', 'currency');
    }
    if (!VALID_CURRENCIES.includes(normalized)) {
      throw new ValidationError(
        `Unsupported currency "${normalized}". Allowed: ${VALID_CURRENCIES.join(', ')}`,
        'currency',
      );
    }
    return new PaymentCurrencyVO(normalized);
  }

  static reconstitute(raw: string): PaymentCurrencyVO {
    return new PaymentCurrencyVO(raw);
  }

  static bdt(): PaymentCurrencyVO {
    return new PaymentCurrencyVO(CURRENCY.BDT);
  }

  static usd(): PaymentCurrencyVO {
    return new PaymentCurrencyVO(CURRENCY.USD);
  }

  isBdt(): boolean { return this.value === CURRENCY.BDT; }
  isUsd(): boolean { return this.value === CURRENCY.USD; }
}
