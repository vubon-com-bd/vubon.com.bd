/**
 * PriceCurrency Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CURRENCY } from '@vubon/shared-constants/common';

export type CurrencyValue = (typeof CURRENCY)[keyof typeof CURRENCY];

const VALID: readonly string[] = Object.values(CURRENCY);

export class PriceCurrencyVO extends BaseVO<CurrencyValue> {
  private constructor(value: CurrencyValue) { super(value); }

  static create(raw: string): PriceCurrencyVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('PriceCurrency must be a string', 'currency');
    }
    const normalized = raw.trim().toUpperCase();
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid currency: "${normalized}". Allowed: ${VALID.join(', ')}`,
        'currency',
      );
    }
    return new PriceCurrencyVO(normalized as CurrencyValue);
  }

  static reconstitute(raw: string): PriceCurrencyVO {
    return new PriceCurrencyVO(raw as CurrencyValue);
  }

  static bdt(): PriceCurrencyVO { return new PriceCurrencyVO(CURRENCY.BDT as CurrencyValue); }

  isBDT(): boolean { return this.value === CURRENCY.BDT; }
  isUSD(): boolean { return this.value === CURRENCY.USD; }

  decimals(): number {
    return this.value === 'JPY' ? 0 : 2;
  }
}
