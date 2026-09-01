/**
 * Currency Configuration
 * বাংলাদেশের কনটেক্সট অনুযায়ী কারেন্সি কনফিগারেশন
 */
export const CURRENCY = {
  BDT: 'BDT',
  USD: 'USD',
} as const;

export type Currency = (typeof CURRENCY)[keyof typeof CURRENCY];

// Currency details
export const CURRENCY_DETAILS: Record<
  Currency,
  {
    symbol: string;
    code: string;
    name: string;
    nameBangla: string;
    decimalPlaces: number;
    locale: string;
  }
> = {
  [CURRENCY.BDT]: {
    symbol: '৳',
    code: 'BDT',
    name: 'Bangladeshi Taka',
    nameBangla: 'বাংলাদেশি টাকা',
    decimalPlaces: 2,
    locale: 'bn-BD',
  },
  [CURRENCY.USD]: {
    symbol: '$',
    code: 'USD',
    name: 'US Dollar',
    nameBangla: 'ইউএস ডলার',
    decimalPlaces: 2,
    locale: 'en-US',
  },
};

// Exchange rates (base: BDT)
export const EXCHANGE_RATES = {
  BDT_TO_USD: 0.0085, // 1 BDT = 0.0085 USD (approximate)
  USD_TO_BDT: 117.65, // 1 USD = 117.65 BDT (approximate)
} as const;
