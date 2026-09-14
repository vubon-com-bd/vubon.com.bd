/**
 * Format a Date to time string
 * @module shared-utils/formatter/date-time
 */
import { TIME_FORMAT, LOCALE } from '@vubon/shared-constants/common';

export function formatTime(
  date: Date,
  locale: string = LOCALE.EN_US,
  format: string = TIME_FORMAT.H24
): string {
  if (Number.isNaN(date.getTime())) return '';

  switch (format) {
    case TIME_FORMAT.H24:
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date);
    case TIME_FORMAT.H24_SECONDS:
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(date);
    case TIME_FORMAT.H12:
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date);
    case TIME_FORMAT.H12_SECONDS:
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(date);
    case TIME_FORMAT.ISO:
      return date.toISOString().slice(11, 19) + 'Z';
    default:
      return date.toISOString().slice(11, 16);
  }
}
