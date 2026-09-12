/**
 * Currency Formatter — uses CURRENCY, DEFAULT_CURRENCY.
 */
import {
  CURRENCY,
  DEFAULT_CURRENCY,
  CurrencyCode,
} from '@vubon/shared-constants/src/common/currency.constants';
import { LOCALE } from '@vubon/shared-constants/src/common/locale.constants';

export const getCurrencySymbol = (currencyCode: string): string => {
  const code = currencyCode as CurrencyCode;
  return CURRENCY[code]?.symbol ?? currencyCode;
};

export const getCurrencyName = (currencyCode: string): string => {
  const code = currencyCode as CurrencyCode;
  return CURRENCY[code]?.name ?? currencyCode;
};

export const formatCurrency = (amount: number, currencyCode: string = DEFAULT_CURRENCY): string => {
  const code = currencyCode as CurrencyCode;
  const currency = CURRENCY[code];
  if (!currency) return `${amount.toFixed(2)} ${currencyCode}`;
  return `${currency.symbol}${amount.toFixed(currency.decimal_digits)}`;
};

export const formatCurrencyLocale = (
  amount: number,
  currencyCode: CurrencyCode = DEFAULT_CURRENCY,
  locale: string = LOCALE.BN_BD
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
