import { CURRENCY } from '@vubon/shared-constants';

export const formatPrice = (amount: number, currency?: string): string => {
  const currencySymbol = currency ? CURRENCY[currency as keyof typeof CURRENCY] : CURRENCY.BDT;
  return `${currencySymbol} ${amount.toFixed(2)}`;
};

export const formatPriceWithLocale = (amount: number, locale: string = 'bn-BD'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BDT',
  }).format(amount);
};
