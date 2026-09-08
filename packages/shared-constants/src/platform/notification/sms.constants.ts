import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const SMS = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    SENDING: 'sending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    BOUNCED: 'bounced',
  },
  TYPES: {
    ...COMMON_TYPES,
    PROMOTIONAL: 'promotional',
    TRANSACTIONAL: 'transactional',
    OTP: 'otp',
    ALERT: 'alert',
  },
  SMS_PROVIDERS: {
    TWILIO: 'twilio',
    VONAGE: 'vonage',
    BULKSMS: 'bulksms',
    BANGLALINK: 'banglalink',
    GRAMEENPHONE: 'grameenphone',
  },
  MAX_SMS_LENGTH: 160,
  MAX_UNICODE_SMS_LENGTH: 70,
  MAX_SMS_PER_BATCH: 100,
  SMS_TIMEOUT_SECONDS: 10,
} as const;
