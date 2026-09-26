import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

const VALID = new Set<string>(['BDT', 'USD', 'EUR', 'GBP', 'INR', 'JPY']);

export class PriceCurrencyVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PriceCurrencyVO {
    const normalized = raw.trim().toUpperCase();
    if (!VALID.has(normalized)) {
      throw new InvalidValueError('price_currency', `Invalid currency: ${raw}`);
    }
    return new PriceCurrencyVO(normalized);
  }
}
