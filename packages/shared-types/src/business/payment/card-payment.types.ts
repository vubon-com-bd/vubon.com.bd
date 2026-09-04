/**
 * Card Payment Types
 * কার্ড পেমেন্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface CardPayment extends BaseEntity {
  paymentId: string;
  cardNumber: string;
  cardLast4: string;
  cardBrand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'rupay' | 'other';
  cardType: 'credit' | 'debit' | 'prepaid';
  expiryMonth: number;
  expiryYear: number;
  cardHolderName: string;
  billingAddress?: string;
  transactionId?: string;
  authorizationCode?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'authorized' | 'captured' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  metadata?: Record<string, string | number | boolean>;
  authorizedAt?: Date;
  capturedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardPaymentCreateInput {
  paymentId: string;
  cardNumber: string;
  cardLast4: string;
  cardBrand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'rupay' | 'other';
  cardType: 'credit' | 'debit' | 'prepaid';
  expiryMonth: number;
  expiryYear: number;
  cardHolderName: string;
  billingAddress?: string;
  transactionId?: string;
  authorizationCode?: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface CardPaymentUpdateInput {
  status?:
    'pending' | 'authorized' | 'captured' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  transactionId?: string;
  authorizationCode?: string;
  authorizedAt?: Date;
  capturedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
}

export interface CardPaymentResponse {
  cardPayment: CardPayment;
}
