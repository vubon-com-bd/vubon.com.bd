/**
 * Invoice Config
 * ইনভয়েস কনফিগারেশন
 */

import { VENDOR_INVOICE } from '@vubon/shared-constants';

export interface InvoiceConfig {
  enabled: boolean;
  status: Record<string, string>;
  types: Record<string, string>;
  paymentMethods: Record<string, string>;
  prefix: string;
  dueDays: number;
  taxRate: number;
  discountRate: number;
  defaults: {
    dueDays: number;
    taxRate: number;
    discountRate: number;
    maxLineItems: number;
  };
}

export const invoiceConfig: InvoiceConfig = {
  enabled: true,

  status: {
    draft: VENDOR_INVOICE.STATUS.DRAFT,
    pending: VENDOR_INVOICE.STATUS.PENDING,
    sent: VENDOR_INVOICE.STATUS.SENT,
    paid: VENDOR_INVOICE.STATUS.PAID,
    overdue: VENDOR_INVOICE.STATUS.OVERDUE,
    cancelled: VENDOR_INVOICE.STATUS.CANCELLED,
    void: VENDOR_INVOICE.STATUS.VOID,
    partial_paid: VENDOR_INVOICE.STATUS.PARTIAL_PAID,
  },

  types: {
    regular: VENDOR_INVOICE.TYPES.REGULAR,
    credit: VENDOR_INVOICE.TYPES.CREDIT,
    debit: VENDOR_INVOICE.TYPES.DEBIT,
    proforma: VENDOR_INVOICE.TYPES.PROFORMA,
    commercial: VENDOR_INVOICE.TYPES.COMMERCIAL,
    tax: VENDOR_INVOICE.TYPES.TAX,
  },

  paymentMethods: {
    bank_transfer: VENDOR_INVOICE.PAYMENT_METHODS.BANK_TRANSFER,
    mobile_banking: VENDOR_INVOICE.PAYMENT_METHODS.MOBILE_BANKING,
    cash: VENDOR_INVOICE.PAYMENT_METHODS.CASH,
    check: VENDOR_INVOICE.PAYMENT_METHODS.CHECK,
    payment_gateway: VENDOR_INVOICE.PAYMENT_METHODS.PAYMENT_GATEWAY,
  },

  prefix: 'INV',
  dueDays: 15,
  taxRate: 15,
  discountRate: 0,

  defaults: {
    dueDays: VENDOR_INVOICE.DEFAULTS.DUE_DAYS,
    taxRate: VENDOR_INVOICE.DEFAULTS.TAX_RATE,
    discountRate: VENDOR_INVOICE.DEFAULTS.DISCOUNT_RATE,
    maxLineItems: VENDOR_INVOICE.DEFAULTS.MAX_LINE_ITEMS,
  },
} as const;

export type InvoiceConfigType = typeof invoiceConfig;
