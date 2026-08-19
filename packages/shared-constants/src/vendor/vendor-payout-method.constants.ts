/**
 * পেআউট মেথড বা পেমেন্ট মাধ্যম সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * পেআউট মেথড অবজেক্ট
 */
export const PayoutMethod = {
  BANK_TRANSFER: 'BANK_TRANSFER',
  BIKASH: 'BIKASH',
  NAGAD: 'NAGAD',
  ROCKET: 'ROCKET',
  BKASH: 'BKASH',
  STRIPE: 'STRIPE',
  PAYPAL: 'PAYPAL',
  WISE: 'WISE',
  CRYPTO: 'CRYPTO',
} as const;

/**
 * পেআউট মেথড - ইউনিয়ন টাইপ
 */
export type PayoutMethodValue = (typeof PayoutMethod)[keyof typeof PayoutMethod];

/**
 * পেআউট মেথড লেবেলসমূহ
 */
export const PayoutMethodLabels: Record<PayoutMethodValue, { en: string; bn: string }> = {
  [PayoutMethod.BANK_TRANSFER]: {
    en: 'Bank Transfer',
    bn: 'ব্যাংক ট্রান্সফার',
  },
  [PayoutMethod.BIKASH]: {
    en: 'bKash',
    bn: 'বিকাশ',
  },
  [PayoutMethod.NAGAD]: {
    en: 'Nagad',
    bn: 'নগদ',
  },
  [PayoutMethod.ROCKET]: {
    en: 'Rocket',
    bn: 'রকেট',
  },
  [PayoutMethod.BKASH]: {
    en: 'bKash (Merchant)',
    bn: 'বিকাশ (মার্চেন্ট)',
  },
  [PayoutMethod.STRIPE]: {
    en: 'Stripe',
    bn: 'স্ট্রাইপ',
  },
  [PayoutMethod.PAYPAL]: {
    en: 'PayPal',
    bn: 'পেপ্যাল',
  },
  [PayoutMethod.WISE]: {
    en: 'Wise',
    bn: 'ওয়াইজ',
  },
  [PayoutMethod.CRYPTO]: {
    en: 'Cryptocurrency',
    bn: 'ক্রিপ্টোকারেন্সি',
  },
};

/**
 * পেআউট মেথড ফি (স্থির)
 */
export const PayoutMethodFees: Record<PayoutMethodValue, number> = {
  [PayoutMethod.BANK_TRANSFER]: 50,
  [PayoutMethod.BIKASH]: 10,
  [PayoutMethod.NAGAD]: 10,
  [PayoutMethod.ROCKET]: 10,
  [PayoutMethod.BKASH]: 15,
  [PayoutMethod.STRIPE]: 30,
  [PayoutMethod.PAYPAL]: 25,
  [PayoutMethod.WISE]: 20,
  [PayoutMethod.CRYPTO]: 50,
};

/**
 * পেআউট মেথড ফি (শতকরা)
 */
export const PayoutMethodPercentageFees: Record<PayoutMethodValue, number> = {
  [PayoutMethod.BANK_TRANSFER]: 0,
  [PayoutMethod.BIKASH]: 1.5,
  [PayoutMethod.NAGAD]: 1.5,
  [PayoutMethod.ROCKET]: 1.5,
  [PayoutMethod.BKASH]: 1.8,
  [PayoutMethod.STRIPE]: 2.9,
  [PayoutMethod.PAYPAL]: 3.5,
  [PayoutMethod.WISE]: 2.0,
  [PayoutMethod.CRYPTO]: 0.5,
};

/**
 * পেআউট মেথড প্রসেসিং সময় (ঘণ্টা)
 */
export const PayoutMethodProcessingTimes: Record<PayoutMethodValue, number> = {
  [PayoutMethod.BANK_TRANSFER]: 48,
  [PayoutMethod.BIKASH]: 2,
  [PayoutMethod.NAGAD]: 2,
  [PayoutMethod.ROCKET]: 2,
  [PayoutMethod.BKASH]: 2,
  [PayoutMethod.STRIPE]: 24,
  [PayoutMethod.PAYPAL]: 24,
  [PayoutMethod.WISE]: 12,
  [PayoutMethod.CRYPTO]: 1,
};

/**
 * পেআউট মেথড ন্যূনতম লিমিট
 */
export const PayoutMethodMinLimits: Record<PayoutMethodValue, number> = {
  [PayoutMethod.BANK_TRANSFER]: 100,
  [PayoutMethod.BIKASH]: 50,
  [PayoutMethod.NAGAD]: 50,
  [PayoutMethod.ROCKET]: 50,
  [PayoutMethod.BKASH]: 50,
  [PayoutMethod.STRIPE]: 100,
  [PayoutMethod.PAYPAL]: 100,
  [PayoutMethod.WISE]: 50,
  [PayoutMethod.CRYPTO]: 100,
};

/**
 * পেআউট মেথড সর্বোচ্চ লিমিট
 */
export const PayoutMethodMaxLimits: Record<PayoutMethodValue, number> = {
  [PayoutMethod.BANK_TRANSFER]: 1000000,
  [PayoutMethod.BIKASH]: 100000,
  [PayoutMethod.NAGAD]: 100000,
  [PayoutMethod.ROCKET]: 100000,
  [PayoutMethod.BKASH]: 100000,
  [PayoutMethod.STRIPE]: 500000,
  [PayoutMethod.PAYPAL]: 500000,
  [PayoutMethod.WISE]: 300000,
  [PayoutMethod.CRYPTO]: 1000000,
};

/**
 * পেআউট মেথড প্রয়োজনীয় ফিল্ডসমূহ
 */
export const PayoutMethodRequiredFields: Record<PayoutMethodValue, string[]> = {
  [PayoutMethod.BANK_TRANSFER]: ['bankName', 'accountNumber', 'accountHolderName', 'routingNumber'],
  [PayoutMethod.BIKASH]: ['mobileNumber', 'accountHolderName'],
  [PayoutMethod.NAGAD]: ['mobileNumber', 'accountHolderName'],
  [PayoutMethod.ROCKET]: ['mobileNumber', 'accountHolderName'],
  [PayoutMethod.BKASH]: ['mobileNumber', 'merchantId', 'accountHolderName'],
  [PayoutMethod.STRIPE]: ['stripeAccountId', 'accountHolderName'],
  [PayoutMethod.PAYPAL]: ['paypalEmail', 'accountHolderName'],
  [PayoutMethod.WISE]: ['wiseAccountId', 'accountHolderName'],
  [PayoutMethod.CRYPTO]: ['walletAddress', 'currencyType', 'accountHolderName'],
};

/**
 * পেআউট মেথড সমর্থিত দেশসমূহ
 */
export const PayoutMethodSupportedCountries: Record<PayoutMethodValue, string[]> = {
  [PayoutMethod.BANK_TRANSFER]: ['BD', 'US', 'UK', 'IN', 'PK', 'AE', 'SA'],
  [PayoutMethod.BIKASH]: ['BD'],
  [PayoutMethod.NAGAD]: ['BD'],
  [PayoutMethod.ROCKET]: ['BD'],
  [PayoutMethod.BKASH]: ['BD'],
  [PayoutMethod.STRIPE]: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'SG'],
  [PayoutMethod.PAYPAL]: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'SG'],
  [PayoutMethod.WISE]: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'SG', 'BD', 'IN'],
  [PayoutMethod.CRYPTO]: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'SG', 'BD', 'IN', 'AE', 'SA'],
};

/**
 * পেআউট মেথড কারেন্সি সমর্থন
 */
export const PayoutMethodCurrencies: Record<PayoutMethodValue, string[]> = {
  [PayoutMethod.BANK_TRANSFER]: ['BDT', 'USD', 'EUR', 'GBP'],
  [PayoutMethod.BIKASH]: ['BDT'],
  [PayoutMethod.NAGAD]: ['BDT'],
  [PayoutMethod.ROCKET]: ['BDT'],
  [PayoutMethod.BKASH]: ['BDT'],
  [PayoutMethod.STRIPE]: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
  [PayoutMethod.PAYPAL]: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
  [PayoutMethod.WISE]: ['BDT', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR'],
  [PayoutMethod.CRYPTO]: ['BTC', 'ETH', 'USDT', 'BNB', 'XRP'],
};
