/**
 * CurrencyConversionService
 * @module payment-service/domain/services
 *
 * Rate map: { USD: 110, EUR: 120, BDT: 1 } — 1 unit = X BDT (base).
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type CurrencyRateMap = Readonly<Record<string, number>>;

export interface ConversionInput {
  readonly amount: number;
  readonly from: string;
  readonly to: string;
  readonly rates: CurrencyRateMap;
}

export class CurrencyConversionService {
  static convert(input: ConversionInput): number {
    const { amount, from, to, rates } = input;

    if (!Number.isFinite(amount)) {
      throw new ValidationError('Amount must be finite', 'amount');
    }
    if (amount < 0) {
      throw new ValidationError('Amount must be non-negative', 'amount');
    }

    const f = from.toUpperCase();
    const t = to.toUpperCase();
    if (f === t) return this.round(amount);

    const fromRate = f === 'BDT' ? 1 : rates[f];
    const toRate = t === 'BDT' ? 1 : rates[t];

    if (!fromRate || fromRate <= 0 || !toRate || toRate <= 0) {
      throw new ValidationError(
        `Missing rate for ${f} → ${t}`,
        'rate',
      );
    }

    const inBase = amount * fromRate;
    return this.round(inBase / toRate);
  }

  static toBdt(amount: number, from: string, rates: CurrencyRateMap): number {
    return this.convert({ amount, from, to: 'BDT', rates });
  }

  static fromBdt(amount: number, to: string, rates: CurrencyRateMap): number {
    return this.convert({ amount, from: 'BDT', to, rates });
  }

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
