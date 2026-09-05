/**
 * Billing Types
 * বিলিং সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { BILLING } from '@vubon/shared-constants';

export interface Billing extends BaseEntity {
  userId: string;
  orderId?: string;
  paymentId?: string;
  amount: number;
  currency: string;
  status: (typeof BILLING.STATUS)[keyof typeof BILLING.STATUS];
  cycle: (typeof BILLING.CYCLES)[keyof typeof BILLING.CYCLES];
  dueDate: Date;
  paidAt?: Date;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    division: string;
    district: string;
  };
  note?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillingCreateInput {
  userId: string;
  orderId?: string;
  paymentId?: string;
  amount: number;
  currency?: string;
  cycle: (typeof BILLING.CYCLES)[keyof typeof BILLING.CYCLES];
  dueDate: Date;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    division: string;
    district: string;
  };
  note?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface BillingUpdateInput {
  status?: (typeof BILLING.STATUS)[keyof typeof BILLING.STATUS];
  paidAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface BillingResponse {
  billing: Billing;
}
