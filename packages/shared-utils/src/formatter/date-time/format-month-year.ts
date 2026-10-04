/**
 * Format month and year (e.g., 'March 2025')
 * @module shared-utils/formatter/date-time
 */
import { LOCALE } from '@vubon/shared-constants/common';

export function formatMonthYear(date: Date, locale: string = LOCALE.EN_US): string {
  if (Number.isNaN(date.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }
}
