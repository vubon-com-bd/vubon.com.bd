import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { NOTIFICATION_CHANNEL } from './notification-channel.constants';
import { NOTIFICATION_PRIORITY } from './notification-priority.constants';

export const NOTIFICATION_SETTINGS = {
  TYPES: {
    ...COMMON_TYPES,
    ...NOTIFICATION_CHANNEL.TYPES,
    GENERAL: 'general',
    DELIVERY: 'delivery',
    PRIORITY: 'priority',
    THROTTLING: 'throttling',
  },
  NOTIFICATION_CHANNEL: { ...NOTIFICATION_CHANNEL },
  NOTIFICATION_PRIORITY: { ...NOTIFICATION_PRIORITY },
  SETTINGS_CATEGORIES: {
    EMAIL_SETTINGS: 'email_settings',
    SMS_SETTINGS: 'sms_settings',
    PUSH_SETTINGS: 'push_settings',
    IN_APP_SETTINGS: 'in_app_settings',
    WEBHOOK_SETTINGS: 'webhook_settings',
  },
  DEFAULT_SETTINGS: {
    ENABLE_EMAIL: true,
    ENABLE_SMS: true,
    ENABLE_PUSH: true,
    ENABLE_IN_APP: true,
    ENABLE_WEBHOOK: false,
    MAX_DAILY_NOTIFICATIONS: 100,
    MAX_HOURLY_NOTIFICATIONS: 10,
  },
} as const;
