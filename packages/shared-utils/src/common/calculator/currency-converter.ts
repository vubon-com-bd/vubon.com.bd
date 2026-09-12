/**
 * Currency Converter (stateful class) — for batch conversions.
 * @module shared-utils/common/calculator/currency-converter
 *
 * Note: This is the stateful version. For one-off conversions,
 * see `converter/currency.converter.ts`.
 */

import { CurrencyCode } from '@vubon/shared-constants/src/common/currency.constants';

export class CurrencyConverter {
  private rates: Map<string, number> = new Map();

  private static key(from: CurrencyCode, to: CurrencyCode): string {
    return `${from}_${to}`;
  }

  setRate(from: CurrencyCode, to: CurrencyCode, rate: number): void {
    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error('Rate must be a positive finite number');
    }
    if (from === to) return;
    this.rates.set(CurrencyConverter.key(from, to), rate);
    // Auto-set inverse rate for convenience
    this.rates.set(CurrencyConverter.key(to, from), 1 / rate);
  }

  convert(amount: number, from: CurrencyCode, to: CurrencyCode): number {
    if (!Number.isFinite(amount)) {
      throw new Error('Amount must be a finite number');
    }
    if (from === to) return amount;
    const rate = this.rates.get(CurrencyConverter.key(from, to));
    if (rate === undefined) {
      throw new Error(`Exchange rate not found for ${from} to ${to}`);
    }
    return amount * rate;
  }

  getRate(from: CurrencyCode, to: CurrencyCode): number | undefined {
    if (from === to) return 1;
    return this.rates.get(CurrencyConverter.key(from, to));
  }

  hasRate(from: CurrencyCode, to: CurrencyCode): boolean {
    if (from === to) return true;
    return this.rates.has(CurrencyConverter.key(from, to));
  }

  clear(): void {
    this.rates.clear();
  }

  getAllRates(): Record<string, number> {
    return Object.fromEntries(this.rates);
  }
}
