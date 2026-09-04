/**
 * Vendor Invoice Constants
 * ভেন্ডর ইনভয়েস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const VENDOR_INVOICE = {
  // Invoice status
  STATUS: {
    DRAFT: 'draft',
    PENDING: STATUS.PENDING,
    SENT: 'sent',
    PAID: 'paid',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled',
    VOID: 'void',
    PARTIAL_PAID: 'partial_paid',
  },

  // Invoice types
  TYPES: {
    REGULAR: 'regular',
    CREDIT: 'credit',
    DEBIT: 'debit',
    PROFORMA: 'proforma',
    COMMERCIAL: 'commercial',
    TAX: 'tax',
  },

  // Invoice payment methods
  PAYMENT_METHODS: {
    BANK_TRANSFER: 'bank_transfer',
    MOBILE_BANKING: 'mobile_banking',
    CASH: 'cash',
    CHECK: 'check',
    PAYMENT_GATEWAY: 'payment_gateway',
  },

  // Default values
  DEFAULTS: {
    DUE_DAYS: 15,
    TAX_RATE: 15,
    DISCOUNT_RATE: 0,
    MAX_LINE_ITEMS: 100,
  },
} as const;

export type VendorInvoiceStatus =
  (typeof VENDOR_INVOICE.STATUS)[keyof typeof VENDOR_INVOICE.STATUS];
export type VendorInvoiceType = (typeof VENDOR_INVOICE.TYPES)[keyof typeof VENDOR_INVOICE.TYPES];
export type VendorInvoicePaymentMethod =
  (typeof VENDOR_INVOICE.PAYMENT_METHODS)[keyof typeof VENDOR_INVOICE.PAYMENT_METHODS];
