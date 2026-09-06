/**
 * Invoice Constants (EXTENDS common/status + common/types)
 * @module shared-constants/business/payment/invoice.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { TAX } from '../../common/tax.constants';

export const INVOICE = {
  // Base status from common
  STATUS: STATUS,

  // Types from common
  TYPES: TYPES,

  // Currency from common
  CURRENCY: CURRENCY,

  // Tax from common
  TAX: TAX,

  // Invoice specific
  INVOICE_CACHE_TTL: 3600,
  MAX_INVOICE_AMOUNT: 99999999.99,
  MIN_INVOICE_AMOUNT: 0,
  INVOICE_NUMBER_PREFIX: 'INV',
  INVOICE_NUMBER_LENGTH: 10,
  MAX_INVOICE_ITEMS: 100,
  INVOICE_RETENTION_DAYS: 730, // 2 years

  // Invoice status
  INVOICE_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    GENERATED: 'generated',
    SENT: 'sent',
    PAID: 'paid',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_PAID: 'partial_paid',
    VOIDED: 'voided',
    DRAFT: 'draft',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    DISPUTED: 'disputed',
  } as const,

  // Invoice type
  INVOICE_TYPE: {
    REGULAR: 'regular',
    RECURRING: 'recurring',
    PROFORMA: 'proforma',
    COMMERCIAL: 'commercial',
    TAX: 'tax',
    CREDIT: 'credit',
    DEBIT: 'debit',
    QUOTE: 'quote',
    ESTIMATE: 'estimate',
    RETAIL: 'retail',
    WHOLESALE: 'wholesale',
    CORPORATE: 'corporate',
  } as const,

  // Invoice template
  INVOICE_TEMPLATE: {
    STANDARD: 'standard',
    MODERN: 'modern',
    MINIMAL: 'minimal',
    CORPORATE: 'corporate',
    CREATIVE: 'creative',
    BILLING: 'billing',
    PROFESSIONAL: 'professional',
    ELEGANT: 'elegant',
  } as const,

  // Invoice validation
  INVOICE_VALIDATION: {
    REQUIRES_TAX: true,
    REQUIRES_COMPANY: false,
    REQUIRES_ADDRESS: true,
    REQUIRES_PHONE: true,
    REQUIRES_EMAIL: true,
    REQUIRES_DUE_DATE: true,
    REQUIRES_ITEMS: true,
    PAYMENT_TERM_DAYS: 30,
    MAX_ITEMS: 100,
  } as const,

  // Invoice discount
  INVOICE_DISCOUNT: {
    MAX_PERCENTAGE: 50,
    MIN_PERCENTAGE: 0,
    ALLOWED_TYPES: ['percentage', 'fixed', 'early_payment'],
  } as const,

  // Invoice tax
  INVOICE_TAX: {
    DEFAULT_RATE: 15,
    ALLOWED_TYPES: ['vat', 'gst', 'sales_tax', 'service_tax'],
    REQUIRES_REGISTRATION_NUMBER: true,
  } as const,

  // Bangladesh invoice specific
  BD_INVOICE: {
    REQUIRES_VAT_REGISTRATION: true,
    REQUIRES_BIN: true,
    REQUIRES_TIN: true,
    VAT_RATE: 15,
    DIGITAL_SIGNATURE_REQUIRED: false,
  } as const,
} as const;

export type InvoiceStatus = (typeof INVOICE.INVOICE_STATUS)[keyof typeof INVOICE.INVOICE_STATUS];
export type InvoiceType = (typeof INVOICE.INVOICE_TYPE)[keyof typeof INVOICE.INVOICE_TYPE];
export type InvoiceTemplate =
  (typeof INVOICE.INVOICE_TEMPLATE)[keyof typeof INVOICE.INVOICE_TEMPLATE];

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  generated: 'Generated',
  sent: 'Sent',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  partial_paid: 'Partial Paid',
  voided: 'Voided',
  draft: 'Draft',
  approved: 'Approved',
  rejected: 'Rejected',
  expired: 'Expired',
  disputed: 'Disputed',
};

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  generated: '#8b5cf6',
  sent: '#3b82f6',
  paid: '#22c55e',
  overdue: '#ef4444',
  cancelled: '#dc2626',
  refunded: '#6b7280',
  partial_paid: '#f59e0b',
  voided: '#9ca3af',
  draft: '#60a5fa',
  approved: '#22c55e',
  rejected: '#ef4444',
  expired: '#9ca3af',
  disputed: '#f59e0b',
};
