/**
 * DateTime Formatter — uses DATE_FORMAT.
 */
import { DATE_FORMAT } from '@vubon/shared-constants/src/common/date-format.constants';
import { LOCALE } from '@vubon/shared-constants/src/common/locale.constants';

export const formatDateTime = (
  date: Date | string | number,
  format: string = DATE_FORMAT.DB_DATETIME
): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) throw new Error('Invalid date');
  const pad = (n: number) => String(n).padStart(2, '0');
  return format
    .replace(/YYYY/g, String(d.getFullYear()))
    .replace(/MM/g, pad(d.getMonth() + 1))
    .replace(/DD/g, pad(d.getDate()))
    .replace(/HH/g, pad(d.getHours()))
    .replace(/mm/g, pad(d.getMinutes()))
    .replace(/ss/g, pad(d.getSeconds()));
};

export const formatDateTimeLocale = (
  date: Date | string | number,
  locale: string = LOCALE.BN_BD
): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) throw new Error('Invalid date');
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);
};
