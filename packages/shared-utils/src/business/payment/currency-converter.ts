/**
 * Currency Converter
 * কারেন্সি কনভার্টার
 */

export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
  updatedAt: Date;
}

export interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  fee: number;
  totalAmount: number;
}

// Base rates in BDT (Bangladeshi Taka)
export const PAYMENT_BASE_RATES: Record<string, number> = {
  BDT: 1,
  USD: 0.0085,
  EUR: 0.0078,
  GBP: 0.0067,
  INR: 0.71,
  SGD: 0.0115,
  AED: 0.031,
  SAR: 0.032,
  QAR: 0.031,
  OMR: 0.0033,
  KWD: 0.0026,
  MYR: 0.039,
  THB: 0.29,
  VND: 207,
  PKR: 2.38,
  LKR: 2.75,
  NEP: 1.13,
};

export const convertPaymentCurrency = (
  amount: number,
  from: string,
  to: string,
  feePercentage: number = 0,
  feeFixed: number = 0
): ConversionResult => {
  const fromRate = PAYMENT_BASE_RATES[from];
  const toRate = PAYMENT_BASE_RATES[to];

  if (!fromRate || !toRate) {
    throw new Error(`Unsupported currency: ${!fromRate ? from : to}`);
  }

  // Convert to base currency (BDT) first, then to target currency
  const baseAmount = amount / fromRate;
  const convertedAmount = baseAmount * toRate;

  const fee = (convertedAmount * feePercentage) / 100 + feeFixed;
  const totalAmount = convertedAmount + fee;

  return {
    from,
    to,
    amount: Math.round(amount * 100) / 100,
    convertedAmount: Math.round(convertedAmount * 100) / 100,
    rate: toRate / fromRate,
    fee: Math.round(fee * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
};

export const getPaymentExchangeRate = (from: string, to: string): number => {
  const fromRate = PAYMENT_BASE_RATES[from];
  const toRate = PAYMENT_BASE_RATES[to];

  if (!fromRate || !toRate) {
    return 0;
  }

  return toRate / fromRate;
};

export const formatPaymentCurrencyAmount = (
  amount: number,
  currency: string,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const getPaymentSupportedCurrencies = (): string[] => {
  return Object.keys(PAYMENT_BASE_RATES);
};

export const getPaymentCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    BDT: '৳',
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    SGD: 'S$',
    AED: 'د.إ',
    SAR: 'ر.س',
    QAR: 'ر.ق',
    OMR: 'ر.ع.',
    KWD: 'د.ك',
    MYR: 'RM',
    THB: '฿',
    VND: '₫',
    PKR: '₨',
    LKR: 'Rs',
    NEP: 'रू',
  };

  return symbols[currency] || currency;
};
