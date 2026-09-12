import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { NOTIFICATION_SETTINGS } from './notification-settings.constants';
import { NOTIFICATION_TYPE } from './notification-type.constants';
import { NOTIFICATION_CHANNEL } from './notification-channel.constants';

export const NOTIFICATION_PREFERENCES = {
  TYPES: {
    ...COMMON_TYPES,
    ...NOTIFICATION_TYPE.TYPES,
    USER: 'user',
    SYSTEM: 'system',
    DEFAULT: 'default',
  },
  NOTIFICATION_SETTINGS: { ...NOTIFICATION_SETTINGS },
  NOTIFICATION_TYPE: { ...NOTIFICATION_TYPE },
  NOTIFICATION_CHANNEL: { ...NOTIFICATION_CHANNEL },
  PREFERENCE_GROUPS: {
    ORDER_UPDATES: 'order_updates',
    PAYMENT_UPDATES: 'payment_updates',
    PROMOTIONAL: 'promotional',
    SYSTEM_ALERTS: 'system_alerts',
    VENDOR_UPDATES: 'vendor_updates',
    SUPPORT_UPDATES: 'support_updates',
  },
  DEFAULT_PREFERENCES: {
    ORDER_UPDATES: { email: true, sms: true, push: true, in_app: true },
    PAYMENT_UPDATES: { email: true, sms: true, push: true, in_app: true },
    PROMOTIONAL: { email: false, sms: false, push: false, in_app: false },
    SYSTEM_ALERTS: { email: true, sms: false, push: true, in_app: true },
    VENDOR_UPDATES: { email: true, sms: false, push: true, in_app: true },
    SUPPORT_UPDATES: { email: true, sms: false, push: true, in_app: true },
  },
} as const;
