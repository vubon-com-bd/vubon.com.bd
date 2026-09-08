import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { NOTIFICATION_TYPES } from '../common/notification.constants';

export const ADMIN_NOTIFICATION = {
  ...COMMON_TYPES,
  ...NOTIFICATION_TYPES,
  ALERT: 'alert',
  REMINDER: 'reminder',
  REPORT: 'report',
} as const;
