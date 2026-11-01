export const CURRENCY_FORMAT = {
  SYMBOL_FIRST: 'symbol_first',
  SYMBOL_LAST: 'symbol_last',
  CODE_FIRST: 'code_first',
  CODE_LAST: 'code_last',
} as const;

export const CURRENCY_DISPLAY = {
  SYMBOL: 'symbol',
  CODE: 'code',
  NAME: 'name',
} as const;

export type CurrencyFormatType = (typeof CURRENCY_FORMAT)[keyof typeof CURRENCY_FORMAT];
