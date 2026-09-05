/**
 * Invoice Types
 * ইনভয়েস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { VENDOR_INVOICE } from '@vubon/shared-constants';

export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  orderId?: string;
  paymentId?: string;
  userId: string;
  amount: number;
  currency: string;
  status: (typeof VENDOR_INVOICE.STATUS)[keyof typeof VENDOR_INVOICE.STATUS];
  type: (typeof VENDOR_INVOICE.TYPES)[keyof typeof VENDOR_INVOICE.TYPES];
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  netAmount: number;
  dueDate: Date;
  issuedDate: Date;
  paidDate?: Date;
  paymentMethod?: string;
  invoicePaymentId?: string;
  description?: string;
  descriptionBangla?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceCreateInput {
  orderId?: string;
  invoicePaymentId?: string;
  userId: string;
  amount: number;
  currency?: string;
  type: (typeof VENDOR_INVOICE.TYPES)[keyof typeof VENDOR_INVOICE.TYPES];
  taxRate?: number;
  discountRate?: number;
  dueDate: Date;
  issuedDate?: Date;
  description?: string;
  descriptionBangla?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface InvoiceUpdateInput {
  status?: (typeof VENDOR_INVOICE.STATUS)[keyof typeof VENDOR_INVOICE.STATUS];
  paidDate?: Date;
  paymentMethod?: string;
  invoicePaymentId?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface InvoiceResponse {
  invoice: Invoice;
}
