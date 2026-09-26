/**
 * Convert any currency to BDT using rate map
 * @module shared-utils/converter/currency
 */
import { convertCurrency, type CurrencyRateMap } from './convert-currency';

export function convertToBdt(amount: number, fromCurrency: string, rates: CurrencyRateMap): number {
  return convertCurrency(amount, fromCurrency, 'BDT', { ...rates, BDT: 1 });
}
