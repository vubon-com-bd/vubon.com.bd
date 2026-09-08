import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { NOTIFICATION_TYPE } from './notification-type.constants';
import { NOTIFICATION_CHANNEL } from './notification-channel.constants';

export const NOTIFICATION_PREFERENCE = {
  TYPES: {
    ...COMMON_TYPES,
    ...NOTIFICATION_TYPE.TYPES,
    OPT_IN: 'opt_in',
    OPT_OUT: 'opt_out',
    CUSTOM: 'custom',
  },
  NOTIFICATION_TYPE: { ...NOTIFICATION_TYPE },
  NOTIFICATION_CHANNEL: { ...NOTIFICATION_CHANNEL },
  PREFERENCE_OPTIONS: {
    ALLOW: 'allow',
    BLOCK: 'block',
    DIGEST: 'digest',
    PRIORITY: 'priority',
  },
  DEFAULT_PREFERENCES: {
    SYSTEM: { email: true, sms: false, push: true, in_app: true },
    ORDER: { email: true, sms: true, push: true, in_app: true },
    MARKETING: { email: false, sms: false, push: false, in_app: false },
  },
} as const;
