import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const PUSH = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    SENDING: 'sending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    OPENED: 'opened',
    FAILED: 'failed',
  },
  TYPES: {
    ...COMMON_TYPES,
    WEB: 'web',
    MOBILE: 'mobile',
    ANDROID: 'android',
    IOS: 'ios',
  },
  PUSH_PROVIDERS: {
    FIREBASE: 'firebase',
    APNS: 'apns',
    ONE_SIGNAL: 'one_signal',
    WEB_PUSH: 'web_push',
  },
  MAX_TITLE_LENGTH: 50,
  MAX_BODY_LENGTH: 200,
  MAX_ICON_SIZE_KB: 100,
  PUSH_TIMEOUT_SECONDS: 15,
} as const;
