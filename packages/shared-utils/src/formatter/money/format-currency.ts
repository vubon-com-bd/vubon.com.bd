/**
 * Format money with currency symbol/code
 * @module shared-utils/formatter/money
 *
 * Values আসে shared-constants/common/currency.constants থেকে।
 */
import { CURRENCY_META, CURRENCY, LOCALE } from '@vubon/shared-constants/common';

export interface FormatCurrencyOptions {
  readonly currency?: string;
  readonly locale?: string;
  readonly display?: 'symbol' | 'code' | 'name';
  readonly decimals?: number;
}

export function formatCurrency(amount: number, options: FormatCurrencyOptions = {}): string {
  if (!Number.isFinite(amount)) return '';
  const currency = options.currency ?? CURRENCY.BDT;
  const locale = options.locale ?? LOCALE.EN_US;
  const display = options.display ?? 'symbol';
  const decimals = options.decimals ?? 2;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: display === 'name' ? 'name' : display,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch {
    const meta = (CURRENCY_META as Record<string, { symbol: string }>)[currency];
    const symbol = meta?.symbol ?? currency;
    return `${symbol}${amount.toFixed(decimals)}`;
  }
}
