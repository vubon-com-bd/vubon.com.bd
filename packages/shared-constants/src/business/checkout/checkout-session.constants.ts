import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { SESSION } from '../../common/session.constants';
import { AUTH_SESSION } from '../../auth/auth-session.constants';
import { CART_STATUS } from '../cart/cart-status.constants';

export const CHECKOUT_SESSION = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    EXPIRED: 'expired',
    COMPLETED: 'completed',
    ABANDONED: 'abandoned',
  },
  SESSION: { ...SESSION },
  AUTH_SESSION: { ...AUTH_SESSION },
  CART_STATUS: { ...CART_STATUS },
  SESSION_TIMEOUT_MINUTES: 30,
  MAX_SESSIONS_PER_USER: 5,
} as const;
