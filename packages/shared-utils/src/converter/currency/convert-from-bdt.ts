/**
 * Convert BDT to any currency using rate map
 * @module shared-utils/converter/currency
 */
import { convertCurrency, type CurrencyRateMap } from './convert-currency';

export function convertFromBdt(amount: number, toCurrency: string, rates: CurrencyRateMap): number {
  return convertCurrency(amount, 'BDT', toCurrency, { ...rates, BDT: 1 });
}
