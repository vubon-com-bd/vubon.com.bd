/**
 * Format a number as BDT (৳) using English thousand separators
 * @module shared-utils/bd/currency
 */
import { CURRENCY_META } from '@vubon/shared-constants/common';

export function formatBdt(amount: number, decimals = 2): string {
  if (!Number.isFinite(amount)) return '৳0';
  const symbol = (CURRENCY_META as Record<string, { symbol: string }>).BDT?.symbol ?? '৳';
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${symbol}${formatted}`;
}
