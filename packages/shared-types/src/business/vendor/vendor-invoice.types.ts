/**
 * Vendor Invoice Types
 * ভেন্ডর ইনভয়েস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_INVOICE } from '@vubon/shared-constants';

export interface VendorInvoice extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  invoiceNumber: string;
  type: (typeof VENDOR_INVOICE.TYPES)[keyof typeof VENDOR_INVOICE.TYPES];
  status: (typeof VENDOR_INVOICE.STATUS)[keyof typeof VENDOR_INVOICE.STATUS];
  amount: number;
  currency: string;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  netAmount: number;
  dueDate: Date;
  issuedDate: Date;
  paidDate?: Date;
  paymentMethod?: string;
  paymentId?: string;
  description?: string;
  descriptionBangla?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorInvoiceCreateInput {
  vendorId: string;
  type: (typeof VENDOR_INVOICE.TYPES)[keyof typeof VENDOR_INVOICE.TYPES];
  amount: number;
  currency?: string;
  taxRate?: number;
  discountRate?: number;
  dueDate: Date;
  issuedDate?: Date;
  description?: string;
  descriptionBangla?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorInvoiceUpdateInput {
  status?: (typeof VENDOR_INVOICE.STATUS)[keyof typeof VENDOR_INVOICE.STATUS];
  paidDate?: Date;
  paymentMethod?: string;
  paymentId?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorInvoiceResponse {
  vendorInvoice: VendorInvoice;
}
