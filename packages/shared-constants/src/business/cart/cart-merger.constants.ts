import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { AUTH_STATUS } from '../../auth/auth-status.constants';
import { CART_STATUS } from './cart-status.constants';

export const CART_MERGER = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    MERGING: 'merging',
    MERGED: 'merged',
    FAILED: 'failed',
    CONFLICT: 'conflict',
  },
  TYPES: {
    ...COMMON_TYPES,
    GUEST_TO_USER: 'guest_to_user',
    SESSION_TO_SESSION: 'session_to_session',
    DEVICE_TO_DEVICE: 'device_to_device',
  },
  AUTH_STATUS: { ...AUTH_STATUS },
  CART_STATUS: { ...CART_STATUS },
  MERGE_STRATEGY: {
    KEEP_LATEST: 'keep_latest',
    KEEP_OLDEST: 'keep_oldest',
    MERGE_ALL: 'merge_all',
    ASK_USER: 'ask_user',
  },
} as const;
