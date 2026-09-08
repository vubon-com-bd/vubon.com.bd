import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';

export const SMS_MARKETING = {
  STATUS: {
    ...STATUS,
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    SENDING: 'sending',
    SENT: 'sent',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'sms_marketing:view',
    CREATE: 'sms_marketing:create',
    UPDATE: 'sms_marketing:update',
    DELETE: 'sms_marketing:delete',
    SEND: 'sms_marketing:send',
  },
  SMS_TYPES: {
    PROMOTIONAL: 'promotional',
    TRANSACTIONAL: 'transactional',
    OTP: 'otp',
    ALERT: 'alert',
    REMINDER: 'reminder',
    NOTIFICATION: 'notification',
  },
  MAX_SMS_LENGTH: 160,
  MAX_UNICODE_SMS_LENGTH: 70,
  SEND_LIMIT_PER_HOUR: 500,
  SEND_LIMIT_PER_DAY: 5000,
} as const;
