import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { SESSION } from '../../common/session.constants';
import { AUTH_STATUS } from '../../auth/auth-status.constants';
import { USER_TYPES } from '../../user/user-type.constants';

export const CART_GUEST = {
  STATUS: {
    ...COMMON_STATUS,
    ANONYMOUS: 'anonymous',
    IDENTIFIED: 'identified',
    CONVERTED: 'converted',
  },
  SESSION: { ...SESSION },
  AUTH_STATUS: { ...AUTH_STATUS },
  USER_TYPES: { ...USER_TYPES },
  GUEST_SESSION_TIMEOUT_HOURS: 24,
  MAX_GUEST_CARTS_PER_DEVICE: 3,
} as const;
