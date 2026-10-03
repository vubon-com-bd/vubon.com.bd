export const TIME_FORMAT = {
  H24: 'HH:mm',
  H24_SECONDS: 'HH:mm:ss',
  H12: 'hh:mm A',
  H12_SECONDS: 'hh:mm:ss A',
  ISO: 'HH:mm:ssZ',
} as const;

export type TimeFormatType = (typeof TIME_FORMAT)[keyof typeof TIME_FORMAT];
