import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { NOTIFICATION_TYPES } from '../../common/notification.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { FLASH_SALE_STATUS } from './flash-sale-status.constants';

export const FLASH_SALE_NOTIFICATION = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  NOTIFICATION_TYPES: {
    ...NOTIFICATION_TYPES,
    SALE_START: 'sale_start',
    SALE_END: 'sale_end',
    PRICE_DROP: 'price_drop',
    LIMITED_STOCK: 'limited_stock',
    LAST_CHANCE: 'last_chance',
    REMINDER: 'reminder',
    EARLY_ACCESS: 'early_access',
  },
  USER_STATUS: { ...USER_STATUS },
  FLASH_SALE_STATUS: { ...FLASH_SALE_STATUS },
  NOTIFICATION_CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WHATSAPP: 'whatsapp',
  },
  MIN_NOTIFICATION_INTERVAL_MINUTES: 30,
  MAX_NOTIFICATIONS_PER_USER: 10,
} as const;
