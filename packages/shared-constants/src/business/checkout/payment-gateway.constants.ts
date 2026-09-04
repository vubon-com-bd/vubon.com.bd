/**
 * Payment Gateway Constants
 * পেমেন্ট গেটওয়ে সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const PAYMENT_GATEWAYS = {
  // Common types
  ...TYPES,

  // International gateways
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  RAZORPAY: 'razorpay',
  BRAINTREE: 'braintree',
  ADYEN: 'adyen',
  SQUARE: 'square',
  AUTHORIZE_NET: 'authorize_net',

  // Bangladesh gateways
  SSLCOMMERZ: 'sslcommerz',
  BKASH: 'bkash',
  NAGAD: 'nagad',
  ROCKET: 'rocket',
  PORTO: 'porto',
  SURERPOY: 'surerpoy',
  AMARPAY: 'amarpay',
  SHURJOPAY: 'shurjopay',

  // Mobile banking
  BKASH_MOBILE: 'bkash_mobile',
  NAGAD_MOBILE: 'nagad_mobile',
  ROCKET_MOBILE: 'rocket_mobile',

  // Banking
  DBBL: 'dbbl',
  CITY_BANK: 'city_bank',
  BRAC_BANK: 'brac_bank',
  EBL: 'ebl',
  MTB: 'mtb',
} as const;

export type PaymentGateway = (typeof PAYMENT_GATEWAYS)[keyof typeof PAYMENT_GATEWAYS];

export const PAYMENT_GATEWAY_TYPES = {
  INTERNATIONAL: [
    PAYMENT_GATEWAYS.STRIPE,
    PAYMENT_GATEWAYS.PAYPAL,
    PAYMENT_GATEWAYS.RAZORPAY,
    PAYMENT_GATEWAYS.BRAINTREE,
    PAYMENT_GATEWAYS.ADYEN,
    PAYMENT_GATEWAYS.SQUARE,
    PAYMENT_GATEWAYS.AUTHORIZE_NET,
  ] as PaymentGateway[],
  BANGLADESH: [
    PAYMENT_GATEWAYS.SSLCOMMERZ,
    PAYMENT_GATEWAYS.BKASH,
    PAYMENT_GATEWAYS.NAGAD,
    PAYMENT_GATEWAYS.ROCKET,
    PAYMENT_GATEWAYS.PORTO,
    PAYMENT_GATEWAYS.SURERPOY,
    PAYMENT_GATEWAYS.AMARPAY,
    PAYMENT_GATEWAYS.SHURJOPAY,
  ] as PaymentGateway[],
  MOBILE_BANKING: [
    PAYMENT_GATEWAYS.BKASH_MOBILE,
    PAYMENT_GATEWAYS.NAGAD_MOBILE,
    PAYMENT_GATEWAYS.ROCKET_MOBILE,
  ] as PaymentGateway[],
  BANKING: [
    PAYMENT_GATEWAYS.DBBL,
    PAYMENT_GATEWAYS.CITY_BANK,
    PAYMENT_GATEWAYS.BRAC_BANK,
    PAYMENT_GATEWAYS.EBL,
    PAYMENT_GATEWAYS.MTB,
  ] as PaymentGateway[],
} as const;
