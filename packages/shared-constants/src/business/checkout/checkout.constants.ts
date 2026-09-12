import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { CART_STATUS } from '../cart/cart-status.constants';
import { PAYMENT_METHODS } from '../../common/payment-methods.constants';

export const CHECKOUT = {
  STATUS: {
    ...STATUS,
    INITIATED: 'initiated',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    ABANDONED: 'abandoned',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'checkout:view',
    CREATE: 'checkout:create',
    UPDATE: 'checkout:update',
    CANCEL: 'checkout:cancel',
    MANAGE: 'checkout:manage',
  },
  USER_STATUS: { ...USER_STATUS },
  CART_STATUS: { ...CART_STATUS },
  PAYMENT_METHODS: { ...PAYMENT_METHODS },
  TIMEOUT_MINUTES: 30,
  MAX_RETRY: 3,
} as const;
