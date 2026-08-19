// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum PaymentMethod {
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  BKASH = 'BKASH',
  NAGAD = 'NAGAD',
  ROCKET = 'ROCKET',
  SSLCOMMERZ = 'SSLCOMMERZ',
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CRYPTO = 'CRYPTO',
  DIGITAL_WALLET = 'DIGITAL_WALLET',
}

export const PAYMENT_METHOD_META = {
  [PaymentMethod.CASH_ON_DELIVERY]: {
    displayName: 'ক্যাশ অন ডেলিভারি',
    icon: 'cash',
    requiredFields: ['delivery_address', 'phone_number'] as const,
    fee: 0,
    currency: ['BDT'] as const,
    description: 'ডেলিভারির সময় নগদ টাকা প্রদান',
  },
  [PaymentMethod.BKASH]: {
    displayName: 'বিকাশ',
    icon: 'bkash',
    requiredFields: ['bkash_number', 'reference_number'] as const,
    fee: 1.85,
    currency: ['BDT'] as const,
    description: 'বিকাশ মোবাইল ব্যাংকিং',
  },
  [PaymentMethod.NAGAD]: {
    displayName: 'নগদ',
    icon: 'nagad',
    requiredFields: ['nagad_number', 'reference_number'] as const,
    fee: 1.5,
    currency: ['BDT'] as const,
    description: 'নগদ মোবাইল ব্যাংকিং',
  },
  [PaymentMethod.ROCKET]: {
    displayName: 'রকেট',
    icon: 'rocket',
    requiredFields: ['rocket_number', 'reference_number'] as const,
    fee: 1.8,
    currency: ['BDT'] as const,
    description: 'রকেট মোবাইল ব্যাংকিং',
  },
  [PaymentMethod.SSLCOMMERZ]: {
    displayName: 'এসএসএল কমার্জ',
    icon: 'sslcommerz',
    requiredFields: ['card_number', 'expiry_date', 'cvv'] as const,
    fee: 2.5,
    currency: ['BDT', 'USD'] as const,
    description: 'এসএসএল কমার্জ পেমেন্ট গেটওয়ে',
  },
  [PaymentMethod.STRIPE]: {
    displayName: 'স্ট্রাইপ',
    icon: 'stripe',
    requiredFields: ['card_number', 'expiry_date', 'cvv'] as const,
    fee: 2.9,
    currency: ['USD', 'EUR', 'GBP'] as const,
    description: 'স্ট্রাইপ পেমেন্ট প্রসেসিং',
  },
  [PaymentMethod.PAYPAL]: {
    displayName: 'পেপ্যাল',
    icon: 'paypal',
    requiredFields: ['email', 'password'] as const,
    fee: 3.4,
    currency: ['USD', 'EUR', 'GBP'] as const,
    description: 'পেপ্যাল অনলাইন পেমেন্ট',
  },
  [PaymentMethod.BANK_TRANSFER]: {
    displayName: 'ব্যাংক ট্রান্সফার',
    icon: 'bank',
    requiredFields: ['bank_name', 'account_number', 'routing_number'] as const,
    fee: 0,
    currency: ['BDT', 'USD'] as const,
    description: 'ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট',
  },
  [PaymentMethod.CRYPTO]: {
    displayName: 'ক্রিপ্টোকারেন্সি',
    icon: 'bitcoin',
    requiredFields: ['wallet_address', 'crypto_type'] as const,
    fee: 0.5,
    currency: ['BTC', 'ETH', 'USDT'] as const,
    description: 'ক্রিপ্টোকারেন্সি পেমেন্ট',
  },
  [PaymentMethod.DIGITAL_WALLET]: {
    displayName: 'ডিজিটাল ওয়ালেট',
    icon: 'wallet',
    requiredFields: ['wallet_id', 'pin'] as const,
    fee: 0,
    currency: ['BDT', 'USD'] as const,
    description: 'ডিজিটাল ওয়ালেট পেমেন্ট',
  },
} as const;

export type PaymentMethodMeta = typeof PAYMENT_METHOD_META;

export const PAYMENT_METHOD_ORDER = [
  PaymentMethod.CASH_ON_DELIVERY,
  PaymentMethod.BKASH,
  PaymentMethod.NAGAD,
  PaymentMethod.ROCKET,
  PaymentMethod.SSLCOMMERZ,
  PaymentMethod.STRIPE,
  PaymentMethod.PAYPAL,
  PaymentMethod.BANK_TRANSFER,
  PaymentMethod.CRYPTO,
  PaymentMethod.DIGITAL_WALLET,
] as const;

export type PaymentMethodOrder = typeof PAYMENT_METHOD_ORDER;

export const PAYMENT_METHOD_FEE_MAP: Record<PaymentMethod, number> = {
  [PaymentMethod.CASH_ON_DELIVERY]: PAYMENT_METHOD_META[PaymentMethod.CASH_ON_DELIVERY].fee,
  [PaymentMethod.BKASH]: PAYMENT_METHOD_META[PaymentMethod.BKASH].fee,
  [PaymentMethod.NAGAD]: PAYMENT_METHOD_META[PaymentMethod.NAGAD].fee,
  [PaymentMethod.ROCKET]: PAYMENT_METHOD_META[PaymentMethod.ROCKET].fee,
  [PaymentMethod.SSLCOMMERZ]: PAYMENT_METHOD_META[PaymentMethod.SSLCOMMERZ].fee,
  [PaymentMethod.STRIPE]: PAYMENT_METHOD_META[PaymentMethod.STRIPE].fee,
  [PaymentMethod.PAYPAL]: PAYMENT_METHOD_META[PaymentMethod.PAYPAL].fee,
  [PaymentMethod.BANK_TRANSFER]: PAYMENT_METHOD_META[PaymentMethod.BANK_TRANSFER].fee,
  [PaymentMethod.CRYPTO]: PAYMENT_METHOD_META[PaymentMethod.CRYPTO].fee,
  [PaymentMethod.DIGITAL_WALLET]: PAYMENT_METHOD_META[PaymentMethod.DIGITAL_WALLET].fee,
} as const;

export type PaymentMethodFeeMap = typeof PAYMENT_METHOD_FEE_MAP;

export function getPaymentMethodDisplayName(method: PaymentMethod): string {
  return PAYMENT_METHOD_META[method].displayName;
}

export function getPaymentMethodFee(method: PaymentMethod): number {
  return PAYMENT_METHOD_META[method].fee;
}

export function isPaymentMethodSupportedCurrency(method: PaymentMethod, currency: string): boolean {
  const supported = PAYMENT_METHOD_META[method].currency;
  return (supported as readonly string[]).includes(currency);
}
