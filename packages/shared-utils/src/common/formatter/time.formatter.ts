/**
 * Time Formatter — uses TIME_FORMAT.
 */
import { TIME_FORMAT } from '@vubon/shared-constants/src/common/time-format.constants';
import { LOCALE } from '@vubon/shared-constants/src/common/locale.constants';

export const formatTime = (time: Date | string, format: string = TIME_FORMAT.DEFAULT): string => {
  const d = new Date(time);
  if (isNaN(d.getTime())) throw new Error('Invalid time');
  const pad = (n: number) => String(n).padStart(2, '0');
  const h12 = d.getHours() % 12 || 12;
  return format
    .replace(/HH/g, pad(d.getHours()))
    .replace(/hh/g, pad(h12))
    .replace(/mm/g, pad(d.getMinutes()))
    .replace(/ss/g, pad(d.getSeconds()))
    .replace(/A/g, d.getHours() >= 12 ? 'PM' : 'AM');
};

export const formatTimeLocale = (time: Date | string, locale: string = LOCALE.BN_BD): string => {
  const d = new Date(time);
  if (isNaN(d.getTime())) throw new Error('Invalid time');
  return d.toLocaleTimeString(locale);
};
