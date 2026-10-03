/**
 * Format a Date to localized short date
 * @module shared-utils/formatter/date-time
 */
import { DATE_FORMAT, LOCALE } from '@vubon/shared-constants/common';

export function formatDate(
  date: Date,
  locale: string = LOCALE.EN_US,
  format: string = DATE_FORMAT.ISO
): string {
  if (Number.isNaN(date.getTime())) return '';

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  switch (format) {
    case DATE_FORMAT.ISO:
      return `${y}-${m}-${d}`;
    case DATE_FORMAT.BD:
    case DATE_FORMAT.UK:
      return `${d}/${m}/${y}`;
    case DATE_FORMAT.US:
      return `${m}/${d}/${y}`;
    case DATE_FORMAT.EU:
      return `${d}.${m}.${y}`;
    case DATE_FORMAT.COMPACT:
      return `${y}${m}${d}`;
    case DATE_FORMAT.MONTH_YEAR:
      return `${m}/${y}`;
    case DATE_FORMAT.LONG:
      try {
        return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);
      } catch {
        return `${y}-${m}-${d}`;
      }
    case DATE_FORMAT.SHORT:
      try {
        return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
      } catch {
        return `${y}-${m}-${d}`;
      }
    default:
      return `${y}-${m}-${d}`;
  }
}
