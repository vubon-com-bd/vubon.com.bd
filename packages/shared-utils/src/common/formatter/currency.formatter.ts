import { CURRENCY, CURRENCY_DETAILS } from '@vubon/shared-constants';

/**
 * Format Currency
 * কারেন্সি ফরম্যাট করা
 */
export const formatCurrency = (
  amount: number,
  currency: keyof typeof CURRENCY = 'BDT',
  locale: 'bn' | 'en' = 'bn'
): string => {
  const localeMap: Record<string, string> = {
    bn: 'bn-BD',
    en: 'en-US',
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format Currency Symbol
 * কারেন্সি সিম্বল ফরম্যাট করা
 */
export const formatCurrencySymbol = (currency: keyof typeof CURRENCY = 'BDT'): string => {
  return CURRENCY_DETAILS[currency].symbol;
};

/**
 * Format Currency Code
 * কারেন্সি কোড ফরম্যাট করা
 */
export const formatCurrencyCode = (currency: keyof typeof CURRENCY = 'BDT'): string => {
  return CURRENCY_DETAILS[currency].code;
};

/**
 * Format Currency Name
 * কারেন্সি নাম ফরম্যাট করা
 */
export const formatCurrencyName = (
  currency: keyof typeof CURRENCY = 'BDT',
  language: 'en' | 'bn' = 'en'
): string => {
  const details = CURRENCY_DETAILS[currency];
  return language === 'bn' ? details.nameBangla : details.name;
};

/**
 * Convert Currency
 * কারেন্সি কনভার্ট করা
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: keyof typeof CURRENCY,
  toCurrency: keyof typeof CURRENCY,
  rate: number
): number => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  // Convert to base (BDT) first if needed
  let amountInBDT = amount;
  if (fromCurrency !== 'BDT') {
    amountInBDT = amount / rate;
  }

  // Convert from BDT to target currency
  if (toCurrency === 'BDT') {
    return Math.round(amountInBDT * 100) / 100;
  }

  return Math.round(amountInBDT * rate * 100) / 100;
};
