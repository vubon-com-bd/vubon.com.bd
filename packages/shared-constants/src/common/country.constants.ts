export const COUNTRY = {
  BD: 'BD',
  IN: 'IN',
  US: 'US',
  GB: 'GB',
  CA: 'CA',
  AU: 'AU',
  AE: 'AE',
  SA: 'SA',
  MY: 'MY',
  SG: 'SG',
  CN: 'CN',
  JP: 'JP',
  PK: 'PK',
  NP: 'NP',
  LK: 'LK',
} as const;

export const COUNTRY_META = {
  BD: { code: 'BD', name: 'Bangladesh', dialCode: '+880', currency: 'BDT' },
  IN: { code: 'IN', name: 'India', dialCode: '+91', currency: 'INR' },
  US: { code: 'US', name: 'United States', dialCode: '+1', currency: 'USD' },
  GB: { code: 'GB', name: 'United Kingdom', dialCode: '+44', currency: 'GBP' },
} as const;

export const DEFAULT_COUNTRY = COUNTRY.BD;

export type CountryType = (typeof COUNTRY)[keyof typeof COUNTRY];
