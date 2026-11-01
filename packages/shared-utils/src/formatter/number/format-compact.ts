/**
 * Format a number into compact form (1.2K, 3.4M)
 * @module shared-utils/formatter/number
 */
import { LOCALE } from '@vubon/shared-constants/common';

export function formatCompact(value: number, locale: string = LOCALE.EN_US): string {
  if (!Number.isFinite(value)) return '0';

  try {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(value);
  } catch {
    const abs = Math.abs(value);
    if (abs >= 1e12) return `${(value / 1e12).toFixed(1)}T`;
    if (abs >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (abs >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (abs >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return String(value);
  }
}
