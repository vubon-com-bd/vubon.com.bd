/**
 * Number Formatter — uses NUMBER_FORMAT, LOCALE.
 */
import { NUMBER_FORMAT } from '@vubon/shared-constants/src/common/number-format.constants';
import { LOCALE } from '@vubon/shared-constants/src/common/locale.constants';

export const formatNumber = (num: number, locale: string = LOCALE.BN_BD): string =>
  new Intl.NumberFormat(locale).format(num);

export const formatNumberWithDecimal = (
  num: number,
  decimal: number = NUMBER_FORMAT.DEFAULT.DECIMAL_PLACES
): string => num.toFixed(decimal);

export const formatNumberCompact = (num: number): string =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);

export const formatOrdinal = (num: number): string => {
  const n = Math.abs(Math.floor(num));
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${num}th`;
  switch (n % 10) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
};
