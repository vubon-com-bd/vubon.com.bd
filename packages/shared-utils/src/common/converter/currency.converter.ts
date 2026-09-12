/**
 * Currency Converter — uses CURRENCY constants.
 */
import {
  CurrencyCode,
  DEFAULT_CURRENCY,
} from '@vubon/shared-constants/src/common/currency.constants';

export const convertCurrency = (
  amount: number,
  rate: number,
  from: CurrencyCode = DEFAULT_CURRENCY,
  to: CurrencyCode = DEFAULT_CURRENCY
): number => {
  if (!Number.isFinite(amount)) throw new Error('Amount must be a finite number');
  if (!Number.isFinite(rate) || rate < 0) throw new Error('Rate must be non-negative');
  if (from === to) return amount;
  return amount * rate;
};

export const getExchangeRateKey = (from: CurrencyCode, to: CurrencyCode): string => `${from}_${to}`;
