/**
 * Card Payment Config
 * কার্ড পেমেন্ট কনফিগারেশন
 */

export interface CardPaymentConfig {
  enabled: boolean;
  allowedCards: string[];
  cvvRequired: boolean;
  saveCard: boolean;
  minAmount: number;
  maxAmount: number;
  supportedBrands: string[];
  requireBillingAddress: boolean;
  requireCardHolderName: boolean;
}

export const cardPaymentConfig: CardPaymentConfig = {
  enabled: true,
  allowedCards: ['visa', 'mastercard', 'amex', 'discover', 'jcb'],
  cvvRequired: true,
  saveCard: true,
  minAmount: 1,
  maxAmount: 999999,
  supportedBrands: ['visa', 'mastercard', 'amex', 'discover', 'jcb', 'rupay'],
  requireBillingAddress: true,
  requireCardHolderName: true,
} as const;

export type CardPaymentConfigType = typeof cardPaymentConfig;
