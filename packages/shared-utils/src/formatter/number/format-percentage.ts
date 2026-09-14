/**
 * Format a value as percentage. Accepts either 0.15 (ratio) or 15 (already-percent) based on options.
 * @module shared-utils/formatter/number
 */
import { LOCALE } from '@vubon/shared-constants/common';

export interface FormatPercentageOptions {
  readonly locale?: string;
  readonly decimals?: number;
  readonly asRatio?: boolean;
}

export function formatPercentage(value: number, options: FormatPercentageOptions = {}): string {
  if (!Number.isFinite(value)) return '0%';
  const locale = options.locale ?? LOCALE.EN_US;
  const decimals = options.decimals ?? 0;
  const asRatio = options.asRatio ?? false;
  const actual = asRatio ? value : value / 100;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(actual);
  } catch {
    return `${value.toFixed(decimals)}%`;
  }
}
