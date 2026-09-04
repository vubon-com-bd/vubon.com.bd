/**
 * Payment Method Constants
 * পেমেন্ট মেথড সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const PAYMENT_METHODS = {
  // Common types
  ...TYPES,

  // Payment methods
  CASH_ON_DELIVERY: 'cash_on_delivery',
  BANK_TRANSFER: 'bank_transfer',
  MOBILE_BANKING: 'mobile_banking',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  DIGITAL_WALLET: 'digital_wallet',
  ONLINE_BANKING: 'online_banking',
  PAYMENT_GATEWAY: 'payment_gateway',
  INSTALLMENT: 'installment',
  CRYPTO: 'crypto',

  // Bangladesh specific methods
  BKASH: 'bkash',
  NAGAD: 'nagad',
  ROCKET: 'rocket',
  SSLCOMMERZ: 'sslcommerz',
  PADMA: 'padma',
  DBBL: 'dbbl',
  CITY_BANK: 'city_bank',
  BRAC_BANK: 'brac_bank',
} as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];
