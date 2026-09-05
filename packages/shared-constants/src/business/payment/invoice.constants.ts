/**
 * Invoice Constants
 * ইনভয়েস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const INVOICE = {
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
  TYPES: {
    REGULAR: 'regular',
    CREDIT: 'credit',
    DEBIT: 'debit',
    PROFORMA: 'proforma',
    COMMERCIAL: 'commercial',
    TAX: 'tax',
  },
  DEFAULTS: {
    DUE_DAYS: 15,
    TAX_RATE: 15,
    DISCOUNT_RATE: 0,
    MAX_LINE_ITEMS: 100,
  },
} as const;

export type InvoiceStatus = (typeof INVOICE.STATUS)[keyof typeof INVOICE.STATUS];
export type InvoiceType = (typeof INVOICE.TYPES)[keyof typeof INVOICE.TYPES];
