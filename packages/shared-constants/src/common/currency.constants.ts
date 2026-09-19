export const CURRENCY = {
  BDT: 'BDT',
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  INR: 'INR',
  JPY: 'JPY',
  CNY: 'CNY',
  AUD: 'AUD',
  CAD: 'CAD',
  SGD: 'SGD',
  AED: 'AED',
  SAR: 'SAR',
  MYR: 'MYR',
} as const;

export const CURRENCY_META = {
  BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', decimals: 2 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', decimals: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', decimals: 2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', decimals: 2 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', decimals: 2 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', decimals: 0 },
} as const;

export type CurrencyType = (typeof CURRENCY)[keyof typeof CURRENCY];
