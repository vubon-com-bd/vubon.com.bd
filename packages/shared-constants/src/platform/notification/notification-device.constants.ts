import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const NOTIFICATION_DEVICE = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    REGISTERED: 'registered',
    UNREGISTERED: 'unregistered',
    EXPIRED: 'expired',
  },
  TYPES: {
    ...COMMON_TYPES,
    WEB: 'web',
    ANDROID: 'android',
    IOS: 'ios',
    DESKTOP: 'desktop',
  },
  MAX_DEVICES_PER_USER: 10,
  DEVICE_TOKEN_EXPIRY_DAYS: 30,
  DEVICE_REGISTRATION_TIMEOUT_MINUTES: 5,
} as const;
