/**
 * Payment Methods Constants
 * @module shared-constants/common/payment-methods.constants
 */

export const PAYMENT_METHODS = {
  // Cash
  CASH_ON_DELIVERY: 'cash_on_delivery',
  CASH_IN_ADVANCE: 'cash_in_advance',

  // Bank
  BANK_TRANSFER: 'bank_transfer',
  BANK_DEPOSIT: 'bank_deposit',

  // Mobile Money (Bangladesh)
  BKASH: 'bkash',
  NAGAD: 'nagad',
  ROCKET: 'rocket',
  UPAY: 'upay',
  TAP: 'tap',
  OK_WALLET: 'ok_wallet',
  MCASH: 'mcash',
  MYCASH: 'mycash',

  // Cards
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  PREPAID_CARD: 'prepaid_card',

  // Digital Wallets
  PAYPAL: 'paypal',
  STRIPE: 'stripe',
  SSLCOMMERZ: 'sslcommerz',
  AAMARPAY: 'aamarpay',
  PORT_WALLET: 'port_wallet',
  GOOGLE_PAY: 'google_pay',
  APPLE_PAY: 'apple_pay',
  SAMSUNG_PAY: 'samsung_pay',

  // Cryptocurrency
  BITCOIN: 'bitcoin',
  ETHEREUM: 'ethereum',
  USDT: 'usdt',

  // Other
  GIFT_CARD: 'gift_card',
  VOUCHER: 'voucher',
  COUPON: 'coupon',
  LOYALTY_POINTS: 'loyalty_points',
  INSTALLMENT: 'installment',
} as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export const PAYMENT_METHOD_INFO: Record<
  PaymentMethod,
  {
    label: string;
    icon: string;
    type: 'online' | 'offline' | 'digital';
    active: boolean;
    processing_fee: number;
    settlement_days: number;
    currencies: string[];
  }
> = {
  [PAYMENT_METHODS.CASH_ON_DELIVERY]: {
    label: 'Cash on Delivery',
    icon: 'cash',
    type: 'offline',
    active: true,
    processing_fee: 0,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.CASH_IN_ADVANCE]: {
    label: 'Cash in Advance',
    icon: 'cash',
    type: 'offline',
    active: true,
    processing_fee: 0,
    settlement_days: 0,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.BANK_TRANSFER]: {
    label: 'Bank Transfer',
    icon: 'bank',
    type: 'offline',
    active: true,
    processing_fee: 0,
    settlement_days: 2,
    currencies: ['BDT', 'USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.BANK_DEPOSIT]: {
    label: 'Bank Deposit',
    icon: 'bank',
    type: 'offline',
    active: true,
    processing_fee: 0,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.BKASH]: {
    label: 'bKash',
    icon: 'bkash',
    type: 'digital',
    active: true,
    processing_fee: 1.85,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.NAGAD]: {
    label: 'Nagad',
    icon: 'nagad',
    type: 'digital',
    active: true,
    processing_fee: 1.85,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.ROCKET]: {
    label: 'Rocket',
    icon: 'rocket',
    type: 'digital',
    active: true,
    processing_fee: 1.85,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.UPAY]: {
    label: 'Upay',
    icon: 'upay',
    type: 'digital',
    active: true,
    processing_fee: 1.5,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.TAP]: {
    label: 'Tap',
    icon: 'tap',
    type: 'digital',
    active: true,
    processing_fee: 1.5,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.OK_WALLET]: {
    label: 'OK Wallet',
    icon: 'ok',
    type: 'digital',
    active: true,
    processing_fee: 1.5,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.MCASH]: {
    label: 'mCash',
    icon: 'mcash',
    type: 'digital',
    active: true,
    processing_fee: 1.5,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.MYCASH]: {
    label: 'MyCash',
    icon: 'mycash',
    type: 'digital',
    active: true,
    processing_fee: 1.5,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.CREDIT_CARD]: {
    label: 'Credit Card',
    icon: 'credit-card',
    type: 'online',
    active: true,
    processing_fee: 2.5,
    settlement_days: 3,
    currencies: ['BDT', 'USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.DEBIT_CARD]: {
    label: 'Debit Card',
    icon: 'credit-card',
    type: 'online',
    active: true,
    processing_fee: 2.0,
    settlement_days: 2,
    currencies: ['BDT', 'USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.PREPAID_CARD]: {
    label: 'Prepaid Card',
    icon: 'credit-card',
    type: 'online',
    active: true,
    processing_fee: 2.0,
    settlement_days: 1,
    currencies: ['BDT', 'USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.PAYPAL]: {
    label: 'PayPal',
    icon: 'paypal',
    type: 'online',
    active: true,
    processing_fee: 4.4,
    settlement_days: 3,
    currencies: ['USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.STRIPE]: {
    label: 'Stripe',
    icon: 'stripe',
    type: 'online',
    active: true,
    processing_fee: 2.9,
    settlement_days: 3,
    currencies: ['USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.SSLCOMMERZ]: {
    label: 'SSLCommerz',
    icon: 'sslcommerz',
    type: 'online',
    active: true,
    processing_fee: 2.5,
    settlement_days: 2,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.AAMARPAY]: {
    label: 'Aamarpay',
    icon: 'aamarpay',
    type: 'online',
    active: true,
    processing_fee: 2.5,
    settlement_days: 2,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.PORT_WALLET]: {
    label: 'Port Wallet',
    icon: 'port',
    type: 'digital',
    active: true,
    processing_fee: 2.0,
    settlement_days: 1,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.GOOGLE_PAY]: {
    label: 'Google Pay',
    icon: 'google-pay',
    type: 'online',
    active: true,
    processing_fee: 2.0,
    settlement_days: 3,
    currencies: ['USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.APPLE_PAY]: {
    label: 'Apple Pay',
    icon: 'apple-pay',
    type: 'online',
    active: true,
    processing_fee: 2.0,
    settlement_days: 3,
    currencies: ['USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.SAMSUNG_PAY]: {
    label: 'Samsung Pay',
    icon: 'samsung-pay',
    type: 'online',
    active: true,
    processing_fee: 2.0,
    settlement_days: 3,
    currencies: ['USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.BITCOIN]: {
    label: 'Bitcoin',
    icon: 'bitcoin',
    type: 'online',
    active: true,
    processing_fee: 1.0,
    settlement_days: 1,
    currencies: ['BTC', 'USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.ETHEREUM]: {
    label: 'Ethereum',
    icon: 'ethereum',
    type: 'online',
    active: true,
    processing_fee: 1.0,
    settlement_days: 1,
    currencies: ['ETH', 'USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.USDT]: {
    label: 'USDT',
    icon: 'usdt',
    type: 'online',
    active: true,
    processing_fee: 0.5,
    settlement_days: 1,
    currencies: ['USDT', 'USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.GIFT_CARD]: {
    label: 'Gift Card',
    icon: 'gift',
    type: 'online',
    active: true,
    processing_fee: 0,
    settlement_days: 0,
    currencies: ['BDT', 'USD', 'EUR', 'GBP'],
  },
  [PAYMENT_METHODS.VOUCHER]: {
    label: 'Voucher',
    icon: 'voucher',
    type: 'online',
    active: true,
    processing_fee: 0,
    settlement_days: 0,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.COUPON]: {
    label: 'Coupon',
    icon: 'coupon',
    type: 'online',
    active: true,
    processing_fee: 0,
    settlement_days: 0,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.LOYALTY_POINTS]: {
    label: 'Loyalty Points',
    icon: 'star',
    type: 'online',
    active: true,
    processing_fee: 0,
    settlement_days: 0,
    currencies: ['BDT'],
  },
  [PAYMENT_METHODS.INSTALLMENT]: {
    label: 'Installment',
    icon: 'installment',
    type: 'offline',
    active: true,
    processing_fee: 5.0,
    settlement_days: 30,
    currencies: ['BDT'],
  },
};

export const BD_MOBILE_MONEY = [
  PAYMENT_METHODS.BKASH,
  PAYMENT_METHODS.NAGAD,
  PAYMENT_METHODS.ROCKET,
  PAYMENT_METHODS.UPAY,
  PAYMENT_METHODS.TAP,
  PAYMENT_METHODS.OK_WALLET,
  PAYMENT_METHODS.MCASH,
  PAYMENT_METHODS.MYCASH,
] as const;

export const ONLINE_PAYMENT_METHODS = Object.values(PAYMENT_METHODS).filter(
  (method) => PAYMENT_METHOD_INFO[method]?.type === 'online'
);

export const OFFLINE_PAYMENT_METHODS = Object.values(PAYMENT_METHODS).filter(
  (method) => PAYMENT_METHOD_INFO[method]?.type === 'offline'
);

export const DIGITAL_PAYMENT_METHODS = Object.values(PAYMENT_METHODS).filter(
  (method) => PAYMENT_METHOD_INFO[method]?.type === 'digital'
);
