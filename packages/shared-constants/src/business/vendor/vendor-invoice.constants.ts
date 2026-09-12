import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { INVOICE } from '../payment/invoice.constants';
import { VENDOR_COMMISSION } from './vendor-commission.constants';

export const VENDOR_INVOICE = {
  STATUS: {
    ...COMMON_STATUS,
    ...INVOICE.STATUS,
    GENERATED: 'generated',
    SENT: 'sent',
    PAID: 'paid',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled',
  },
  INVOICE: { ...INVOICE },
  VENDOR_COMMISSION: { ...VENDOR_COMMISSION },
  INVOICE_TYPES: {
    COMMISSION: 'commission',
    SUBSCRIPTION: 'subscription',
    SERVICE: 'service',
    ADJUSTMENT: 'adjustment',
  },
  INVOICE_PREFIX: 'VINV',
  INVOICE_LENGTH: 10,
  DUE_DAYS: 15,
  TAX_RATE: 0.15,
  DISCOUNT_RATE: 0.05,
} as const;
