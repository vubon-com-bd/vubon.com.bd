/**
 * CurrencyConverterService — wraps domain CurrencyConversionService with rate loading
 * @module payment-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { CurrencyConversionService } from '@domain/services/currency-conversion.service';
import { getOptionalEnv } from '@vubon/shared-config/common';

export const CURRENCY_CONVERTER_SERVICE = Symbol('CURRENCY_CONVERTER_SERVICE');

type RateMap = Readonly<Record<string, number>>;

@Injectable()
export class CurrencyConverterService {
  private readonly logger = new Logger(CurrencyConverterService.name);
  private cachedRates: { rates: RateMap; fetchedAt: number } | null = null;
  private readonly ttlMs = 5 * 60 * 1000;

  async getRates(): Promise<RateMap> {
    if (this.cachedRates && Date.now() - this.cachedRates.fetchedAt < this.ttlMs) {
      return this.cachedRates.rates;
    }
    // Default static rates (BDT base). Can be replaced with live FX provider.
    const rates: RateMap = {
      BDT: 1,
      USD: Number(getOptionalEnv('FX_USD_BDT', '110')),
      EUR: Number(getOptionalEnv('FX_EUR_BDT', '120')),
      GBP: Number(getOptionalEnv('FX_GBP_BDT', '140')),
      INR: Number(getOptionalEnv('FX_INR_BDT', '1.32')),
    };
    this.cachedRates = { rates, fetchedAt: Date.now() };
    return rates;
  }

  async convert(amount: number, from: string, to: string): Promise<number> {
    const rates = await this.getRates();
    return CurrencyConversionService.convert({
      amount,
      from,
      to,
      rates,
    });
  }

  async toBdt(amount: number, from: string): Promise<number> {
    const rates = await this.getRates();
    return CurrencyConversionService.toBdt(amount, from, rates);
  }

  async fromBdt(amount: number, to: string): Promise<number> {
    const rates = await this.getRates();
    return CurrencyConversionService.fromBdt(amount, to, rates);
  }
}
