export const VENDOR_INVOICE_STATUS = {
  DRAFT: 'draft',
  SENT: 'sent',
  VIEWED: 'viewed',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export const VENDOR_INVOICE_TYPE = {
  ORDER: 'order',
  COMMISSION: 'commission',
  SUBSCRIPTION: 'subscription',
  PENALTY: 'penalty',
  ADJUSTMENT: 'adjustment',
  PAYOUT: 'payout',
} as const;

export const VENDOR_INVOICE = {
  PREFIX: 'INV',
  NUMBER_LENGTH: 10,
  DUE_DAYS: 15,
  GRACE_PERIOD_DAYS: 5,
  MAX_AMOUNT: 10000000,
  TAX_INCLUSIVE: false,
  AUTO_GENERATE: true,
  SEND_EMAIL: true,
  MAX_ATTACHMENTS: 5,
} as const;

export type VendorInvoiceStatusType =
  (typeof VENDOR_INVOICE_STATUS)[keyof typeof VENDOR_INVOICE_STATUS];
export type VendorInvoiceTypeType = (typeof VENDOR_INVOICE_TYPE)[keyof typeof VENDOR_INVOICE_TYPE];
