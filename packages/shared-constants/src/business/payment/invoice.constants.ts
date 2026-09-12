import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { DATE_FORMAT } from '../../common/date-format.constants';
import { ORDER_STATUS } from '../checkout/order-status.constants';
import { PAYMENT_STATUS } from './payment-status.constants';

export const INVOICE = {
  STATUS: {
    ...COMMON_STATUS,
    DRAFT: 'draft',
    PENDING: 'pending',
    PAID: 'paid',
    UNPAID: 'unpaid',
    PARTIALLY_PAID: 'partially_paid',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled',
    VOID: 'void',
  },
  TYPES: {
    ...COMMON_TYPES,
    INVOICE: 'invoice',
    TAX_INVOICE: 'tax_invoice',
    PROFORMA: 'proforma',
    CREDIT_NOTE: 'credit_note',
    DEBIT_NOTE: 'debit_note',
  },
  CURRENCY: { ...CURRENCY },
  DATE_FORMAT: { ...DATE_FORMAT },
  ORDER_STATUS: { ...ORDER_STATUS },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  INVOICE_NUMBER_PREFIX: 'INV',
  INVOICE_NUMBER_LENGTH: 10,
  DUE_DATE_DAYS: 30,
  INVOICE_RETENTION_DAYS: 3650, // 10 years
  TAX_RATE: 0.15,
  DISCOUNT_RATE: 0.05,
} as const;
