/**
 * Format day name (e.g., 'Monday')
 * @module shared-utils/formatter/date-time
 */
import { LOCALE } from '@vubon/shared-constants/common';

export function formatDayName(date: Date, locale: string = LOCALE.EN_US, short = false): string {
  if (Number.isNaN(date.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: short ? 'short' : 'long',
    }).format(date);
  } catch {
    return '';
  }
}
