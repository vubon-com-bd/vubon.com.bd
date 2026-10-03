/**
 * Format a number with thousand separators
 * @module shared-utils/formatter/number
 */
import { LOCALE } from '@vubon/shared-constants/common';

export interface FormatNumberOptions {
  readonly locale?: string;
  readonly decimals?: number;
  readonly useGrouping?: boolean;
}

export function formatNumber(value: number, options: FormatNumberOptions = {}): string {
  if (!Number.isFinite(value)) return '0';
  const locale = options.locale ?? LOCALE.EN_US;
  const decimals = options.decimals ?? 0;
  const useGrouping = options.useGrouping ?? true;

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping,
    }).format(value);
  } catch {
    return value.toFixed(decimals);
  }
}
