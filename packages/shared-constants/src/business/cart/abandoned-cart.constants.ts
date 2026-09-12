import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { NOTIFICATION_TYPES } from '../../common/notification.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { CART_STATUS } from './cart-status.constants';

export const ABANDONED_CART = {
  STATUS: {
    ...COMMON_STATUS,
    TRIGGERED: 'triggered',
    REMINDED: 'reminded',
    RECOVERED: 'recovered',
    LOST: 'lost',
    IGNORED: 'ignored',
  },
  NOTIFICATION_TYPES: {
    ...NOTIFICATION_TYPES,
    REMINDER_1H: 'reminder_1h',
    REMINDER_24H: 'reminder_24h',
    REMINDER_48H: 'reminder_48h',
    FINAL_REMINDER: 'final_reminder',
  },
  USER_STATUS: { ...USER_STATUS },
  CART_STATUS: { ...CART_STATUS },
  ABANDONMENT_TIMEOUT_HOURS: 3,
  MAX_REMINDERS: 4,
  REMINDER_INTERVALS: [1, 24, 48, 72],
} as const;
