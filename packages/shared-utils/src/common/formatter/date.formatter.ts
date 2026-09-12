/**
 * Date Formatter — uses DATE_FORMAT, LOCALE.
 */
import { DATE_FORMAT } from '@vubon/shared-constants/src/common/date-format.constants';
import { LOCALE } from '@vubon/shared-constants/src/common/locale.constants';

export const formatDate = (
  date: Date | string | number,
  format: string = DATE_FORMAT.DEFAULT_DATE
): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) throw new Error('Invalid date');
  const pad = (n: number) => String(n).padStart(2, '0');
  return format
    .replace(/YYYY/g, String(d.getFullYear()))
    .replace(/MMMM/g, d.toLocaleString('en-US', { month: 'long' }))
    .replace(/MMM/g, d.toLocaleString('en-US', { month: 'short' }))
    .replace(/MM/g, pad(d.getMonth() + 1))
    .replace(/DD/g, pad(d.getDate()));
};

export const formatDateLocale = (
  date: Date | string | number,
  locale: string = LOCALE.BN_BD
): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) throw new Error('Invalid date');
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(d);
};
