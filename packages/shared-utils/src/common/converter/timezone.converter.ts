/**
 * Timezone Converter — uses TIMEZONE constants.
 */
import { TIMEZONE, DEFAULT_TIMEZONE } from '@vubon/shared-constants/src/common/timezone.constants';

export const convertTimezone = (
  date: Date | string | number,
  timezone: string = DEFAULT_TIMEZONE,
  locale: string = 'en-US'
): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) throw new Error('Invalid date');
  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);
};

export const getTimezoneOffsetMinutes = (timezone: string, at: Date = new Date()): number => {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
  });
  const part = dtf.formatToParts(at).find((p) => p.type === 'timeZoneName')?.value;
  if (!part) return 0;
  const match = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(part);
  if (!match) return 0;
  const sign = match[1] === '-' ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3] ?? 0));
};

export const isValidTimezone = (timezone: string): boolean => {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
};

export const SUPPORTED_TIMEZONES = Object.values(TIMEZONE);
