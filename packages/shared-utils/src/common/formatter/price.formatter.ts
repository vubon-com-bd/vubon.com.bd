/**
 * Price Formatter — base display formatting.
 * Note: `formatPrice` is the canonical name for common price formatting.
 *       Domain-specific versions use prefixes (formatCartPrice, formatPayoutPrice, ...).
 */
import {
  CURRENCY,
  DEFAULT_CURRENCY,
  CurrencyCode,
} from '@vubon/shared-constants/src/common/currency.constants';
import { LOCALE } from '@vubon/shared-constants/src/common/locale.constants';

export const formatPrice = (amount: number, currencyCode: string = DEFAULT_CURRENCY): string => {
  if (!Number.isFinite(amount)) return '0';
  const code = currencyCode as CurrencyCode;
  const currency = CURRENCY[code];
  if (!currency) return `${amount.toFixed(2)} ${currencyCode}`;
  return `${currency.symbol}${amount.toFixed(currency.decimal_digits)}`;
};

export const formatPriceWithLocale = (
  amount: number,
  currencyCode: CurrencyCode = DEFAULT_CURRENCY,
  locale: string = LOCALE.BN_BD
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);

export const formatPriceRange = (
  min: number,
  max: number,
  currencyCode: string = DEFAULT_CURRENCY
): string => `${formatPrice(min, currencyCode)} - ${formatPrice(max, currencyCode)}`;
