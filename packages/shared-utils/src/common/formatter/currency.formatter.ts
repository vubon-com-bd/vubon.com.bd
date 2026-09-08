import { CURRENCY, DEFAULT_CURRENCY, CurrencyCode } from '@vubon/shared-constants';

export const getCurrencySymbol = (currencyCode: string): string => {
  const code = currencyCode as CurrencyCode;
  return CURRENCY[code]?.symbol || currencyCode;
};

export const getCurrencyName = (currencyCode: string): string => {
  const code = currencyCode as CurrencyCode;
  return CURRENCY[code]?.name || currencyCode;
};

export const formatCurrency = (amount: number, currencyCode: string = DEFAULT_CURRENCY): string => {
  const code = currencyCode as CurrencyCode;
  const currency = CURRENCY[code];

  if (!currency) {
    return `${amount} ${currencyCode}`;
  }

  const formattedAmount = amount.toFixed(currency.decimal_digits);
  return `${currency.symbol}${formattedAmount}`;
};
