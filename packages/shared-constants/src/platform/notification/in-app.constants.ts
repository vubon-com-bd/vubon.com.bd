import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const IN_APP = {
  STATUS: {
    ...COMMON_STATUS,
    CREATED: 'created',
    DISPLAYED: 'displayed',
    INTERACTED: 'interacted',
    DISMISSED: 'dismissed',
    EXPIRED: 'expired',
  },
  TYPES: {
    ...COMMON_TYPES,
    BANNER: 'banner',
    MODAL: 'modal',
    TOAST: 'toast',
    BADGE: 'badge',
    POPUP: 'popup',
  },
  MAX_MESSAGE_LENGTH: 500,
  DISPLAY_DURATION_SECONDS: 5,
  MAX_IN_APP_NOTIFICATIONS: 50,
} as const;
