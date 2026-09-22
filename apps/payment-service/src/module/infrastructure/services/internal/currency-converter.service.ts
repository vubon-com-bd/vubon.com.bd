import { Injectable, Logger } from '@nestjs/common';

export interface ExchangeRates {
  readonly [fromTo: string]: number;
}

@Injectable()
export class CurrencyConverterService {
  private readonly logger = new Logger(CurrencyConverterService.name);
  private rates: ExchangeRates = {};

  setRates(rates: ExchangeRates): void {
    this.rates = Object.freeze({ ...rates });
  }

  convert(amount: number, from: string, to: string): number {
    if (from === to) return amount;
    const rate = this.rates[`${from}->${to}`];
    if (typeof rate !== 'number' || rate <= 0) {
      this.logger.warn(`Missing rate ${from}->${to}`);
      throw new Error(`Missing exchange rate: ${from}->${to}`);
    }
    return Math.round(amount * rate * 100) / 100;
  }
}
