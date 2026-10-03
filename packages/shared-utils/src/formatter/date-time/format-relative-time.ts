/**
 * Human-readable relative time using Intl.RelativeTimeFormat
 * @module shared-utils/formatter/date-time
 */
import { LOCALE } from '@vubon/shared-constants/common';

export function formatRelativeTime(
  date: Date,
  locale: string = LOCALE.EN_US,
  reference: Date = new Date()
): string {
  if (Number.isNaN(date.getTime())) return '';

  const diffMs = date.getTime() - reference.getTime();
  const abs = Math.abs(diffMs);

  const seconds = Math.round(abs / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  const sign = diffMs < 0 ? -1 : 1;

  let value: number;
  let unit: Intl.RelativeTimeFormatUnit;

  if (seconds < 45) {
    value = sign * seconds;
    unit = 'second';
  } else if (minutes < 45) {
    value = sign * minutes;
    unit = 'minute';
  } else if (hours < 22) {
    value = sign * hours;
    unit = 'hour';
  } else if (days < 26) {
    value = sign * days;
    unit = 'day';
  } else if (weeks < 5) {
    value = sign * weeks;
    unit = 'week';
  } else if (months < 11) {
    value = sign * months;
    unit = 'month';
  } else {
    value = sign * years;
    unit = 'year';
  }

  try {
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(value, unit);
  } catch {
    return `${value} ${unit}${Math.abs(value) === 1 ? '' : 's'}`;
  }
}
