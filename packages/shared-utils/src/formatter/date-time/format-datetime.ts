/**
 * Combine date + time formatting
 * @module shared-utils/formatter/date-time
 */
import { LOCALE, DATE_FORMAT, TIME_FORMAT } from '@vubon/shared-constants/common';
import { formatDate } from './format-date';
import { formatTime } from './format-time';

export function formatDateTime(
  date: Date,
  locale: string = LOCALE.EN_US,
  dateFormat: string = DATE_FORMAT.ISO,
  timeFormat: string = TIME_FORMAT.H24
): string {
  const d = formatDate(date, locale, dateFormat);
  const t = formatTime(date, locale, timeFormat);
  return `${d} ${t}`.trim();
}
