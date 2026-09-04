/**
 * Payment Method Types
 * পেমেন্ট মেথড সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { PAYMENT_METHODS } from '@vubon/shared-constants';

export interface PaymentMethod extends BaseEntity {
  userId: string;
  type: (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];
  name: string;
  nameBangla?: string;
  isDefault: boolean;
  isActive: boolean;
  provider?: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  branchName?: string;
  routingNumber?: string;
  swiftCode?: string;
  cardLast4?: string;
  cardBrand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  billingAddress?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethodCreateInput {
  userId: string;
  type: (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];
  name: string;
  nameBangla?: string;
  isDefault?: boolean;
  provider?: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  branchName?: string;
  routingNumber?: string;
  swiftCode?: string;
  cardLast4?: string;
  cardBrand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  billingAddress?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentMethodUpdateInput {
  name?: string;
  nameBangla?: string;
  isDefault?: boolean;
  isActive?: boolean;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentMethodResponse {
  paymentMethod: PaymentMethod;
}
