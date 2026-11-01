/**
 * Format a number as money (localized decimals + thousand separators)
 * @module shared-utils/formatter/money
 */
import { LOCALE } from '@vubon/shared-constants/common';

export interface FormatMoneyOptions {
  readonly decimals?: number;
  readonly locale?: string;
  readonly useGrouping?: boolean;
}

export function formatMoney(amount: number, options: FormatMoneyOptions = {}): string {
  if (!Number.isFinite(amount)) return '0';
  const decimals = options.decimals ?? 2;
  const locale = options.locale ?? LOCALE.EN_US;
  const useGrouping = options.useGrouping ?? true;

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping,
    }).format(amount);
  } catch {
    return amount.toFixed(decimals);
  }
}
