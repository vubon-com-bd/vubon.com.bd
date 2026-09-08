import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { CURRENCY } from '../../common/currency.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { ORDER_STATUS } from '../checkout/order-status.constants';
import { CHECKOUT_STATUS } from '../checkout/checkout-status.constants';

export const PAYMENT = {
  STATUS: {
    ...STATUS,
    INITIATED: 'initiated',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PENDING: 'pending',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_REFUND: 'partial_refund',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'payment:view',
    CREATE: 'payment:create',
    PROCESS: 'payment:process',
    REFUND: 'payment:refund',
    MANAGE: 'payment:manage',
    VERIFY: 'payment:verify',
  },
  CURRENCY: { ...CURRENCY },
  USER_STATUS: { ...USER_STATUS },
  ORDER_STATUS: { ...ORDER_STATUS },
  CHECKOUT_STATUS: { ...CHECKOUT_STATUS },
  PAYMENT_TIMEOUT_MINUTES: 15,
  MAX_RETRY_ATTEMPTS: 3,
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 9999999,
} as const;
