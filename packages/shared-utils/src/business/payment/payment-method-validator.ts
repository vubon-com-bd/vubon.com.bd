/**
 * Payment Method Validator
 * পেমেন্ট মেথড ভ্যালিডেটর
 */

import { PAYMENT_METHODS } from '@vubon/shared-constants';
import type { PaymentMethod } from '@vubon/shared-types';

export interface PaymentMethodValidationResult {
  valid: boolean;
  errors: string[];
}

export const validatePaymentMethod = (method: string): boolean => {
  const validMethods = Object.values(PAYMENT_METHODS) as string[];
  return validMethods.includes(method);
};

export const validatePaymentMethodData = (
  paymentMethod: PaymentMethod
): PaymentMethodValidationResult => {
  const errors: string[] = [];

  // Type validation
  if (!validatePaymentMethod(paymentMethod.type)) {
    errors.push(`Invalid payment method type: ${paymentMethod.type}`);
  }

  // Name validation
  if (!paymentMethod.name || paymentMethod.name.length < 2) {
    errors.push('Payment method name is required');
  }

  // Provider validation based on type
  const type = paymentMethod.type as string;
  switch (type) {
    case 'bkash':
    case 'nagad':
    case 'rocket':
      if (!paymentMethod.accountNumber) {
        errors.push('Account number is required for mobile banking');
      }
      break;
    case 'credit_card':
    case 'debit_card':
      if (!paymentMethod.cardLast4) {
        errors.push('Card last 4 digits are required');
      }
      if (!paymentMethod.cardBrand) {
        errors.push('Card brand is required');
      }
      break;
    case 'bank_transfer':
      if (!paymentMethod.accountNumber) {
        errors.push('Account number is required for bank transfer');
      }
      if (!paymentMethod.bankName) {
        errors.push('Bank name is required for bank transfer');
      }
      break;
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const getPaymentMethodDisplayName = (type: string): string => {
  const labels: Record<string, string> = {
    cash_on_delivery: 'Cash on Delivery',
    bank_transfer: 'Bank Transfer',
    mobile_banking: 'Mobile Banking',
    credit_card: 'Credit Card',
    debit_card: 'Debit Card',
    digital_wallet: 'Digital Wallet',
    online_banking: 'Online Banking',
    payment_gateway: 'Payment Gateway',
    installment: 'Installment',
    crypto: 'Cryptocurrency',
    bkash: 'bKash',
    nagad: 'Nagad',
    rocket: 'Rocket',
    sslcommerz: 'SSLCommerz',
  };

  return labels[type] || type;
};

export const getPaymentMethodIcon = (type: string): string => {
  const icons: Record<string, string> = {
    bkash: 'https://example.com/icons/bkash.svg',
    nagad: 'https://example.com/icons/nagad.svg',
    rocket: 'https://example.com/icons/rocket.svg',
    credit_card: 'https://example.com/icons/credit-card.svg',
    debit_card: 'https://example.com/icons/debit-card.svg',
    bank_transfer: 'https://example.com/icons/bank-transfer.svg',
  };

  return icons[type] || '';
};

// Additional helper to get all valid payment methods
export const getValidPaymentMethods = (): string[] => {
  return Object.values(PAYMENT_METHODS) as string[];
};

// Check if payment method supports installment
export const supportsInstallment = (method: string): boolean => {
  const installmentMethods = ['credit_card', 'debit_card', 'bank_transfer'];
  return installmentMethods.includes(method);
};

// Check if payment method is online
export const isOnlinePaymentMethod = (method: string): boolean => {
  const onlineMethods = [
    'credit_card',
    'debit_card',
    'digital_wallet',
    'online_banking',
    'payment_gateway',
  ];
  return onlineMethods.includes(method);
};

// Check if payment method is offline
export const isOfflinePaymentMethod = (method: string): boolean => {
  const offlineMethods = ['cash_on_delivery', 'bank_transfer', 'mobile_banking'];
  return offlineMethods.includes(method);
};
