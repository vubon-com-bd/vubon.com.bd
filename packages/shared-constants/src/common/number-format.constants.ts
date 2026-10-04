export const NUMBER_FORMAT = {
  DECIMAL: 'decimal',
  INTEGER: 'integer',
  PERCENT: 'percent',
  CURRENCY: 'currency',
  SCIENTIFIC: 'scientific',
  COMPACT: 'compact',
} as const;

export const NUMBER_SEPARATOR = {
  THOUSAND: ',',
  DECIMAL: '.',
  THOUSAND_BD: ',',
  DECIMAL_BD: '.',
} as const;

export type NumberFormatType = (typeof NUMBER_FORMAT)[keyof typeof NUMBER_FORMAT];
