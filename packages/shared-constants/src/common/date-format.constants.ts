export const DATE_FORMAT = {
  ISO: 'YYYY-MM-DD',
  ISO_DATETIME: 'YYYY-MM-DDTHH:mm:ssZ',
  BD: 'DD/MM/YYYY',
  US: 'MM/DD/YYYY',
  UK: 'DD/MM/YYYY',
  EU: 'DD.MM.YYYY',
  LONG: 'MMMM DD, YYYY',
  SHORT: 'MMM DD, YYYY',
  COMPACT: 'YYYYMMDD',
  MONTH_YEAR: 'MM/YYYY',
} as const;

export type DateFormatType = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];
