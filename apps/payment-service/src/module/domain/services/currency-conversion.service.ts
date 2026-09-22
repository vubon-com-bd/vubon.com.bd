export interface ExchangeRates {
  readonly [fromTo: string]: number;
}

export class CurrencyConversionService {
  constructor(private readonly rates: ExchangeRates = {}) {}

  convert(amount: number, from: string, to: string): number {
    if (from === to) return amount;
    const key = `${from}->${to}`;
    const rate = this.rates[key];
    if (typeof rate !== 'number' || rate <= 0) {
      throw new Error(`Missing exchange rate: ${key}`);
    }
    return Math.round(amount * rate * 100) / 100;
  }
}
