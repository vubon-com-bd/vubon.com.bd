/**
 * Payment Settings Types
 * পেমেন্ট সেটিংস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface PaymentSettings extends BaseEntity {
  userId: string;
  defaultMethod: string;
  defaultCurrency: string;
  autoPayment: boolean;
  autoPaymentThreshold?: number;
  paymentReminder: boolean;
  paymentReminderDays: number;
  invoiceGeneration: boolean;
  receiptGeneration: boolean;
  allowPartialPayment: boolean;
  allowInstallment: boolean;
  maxInstallments: number;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
  discountEnabled: boolean;
  couponEnabled: boolean;
  loyaltyPointsEnabled: boolean;
  loyaltyPointsRate: number;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentSettingsCreateInput {
  userId: string;
  defaultMethod?: string;
  defaultCurrency?: string;
  autoPayment?: boolean;
  autoPaymentThreshold?: number;
  paymentReminder?: boolean;
  paymentReminderDays?: number;
  invoiceGeneration?: boolean;
  receiptGeneration?: boolean;
  allowPartialPayment?: boolean;
  allowInstallment?: boolean;
  maxInstallments?: number;
  taxRate?: number;
  shippingFee?: number;
  freeShippingThreshold?: number;
  discountEnabled?: boolean;
  couponEnabled?: boolean;
  loyaltyPointsEnabled?: boolean;
  loyaltyPointsRate?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentSettingsUpdateInput {
  defaultMethod?: string;
  defaultCurrency?: string;
  autoPayment?: boolean;
  autoPaymentThreshold?: number;
  paymentReminder?: boolean;
  paymentReminderDays?: number;
  invoiceGeneration?: boolean;
  receiptGeneration?: boolean;
  allowPartialPayment?: boolean;
  allowInstallment?: boolean;
  maxInstallments?: number;
  taxRate?: number;
  shippingFee?: number;
  freeShippingThreshold?: number;
  discountEnabled?: boolean;
  couponEnabled?: boolean;
  loyaltyPointsEnabled?: boolean;
  loyaltyPointsRate?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentSettingsResponse {
  paymentSettings: PaymentSettings;
}
