import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { NOTIFICATION_TYPE } from './notification-type.constants';
import { NOTIFICATION_CHANNEL } from './notification-channel.constants';

export const NOTIFICATION_RULE = {
  TYPES: {
    ...COMMON_TYPES,
    ...NOTIFICATION_TYPE.TYPES,
    FILTER: 'filter',
    ROUTING: 'routing',
    PRIORITY: 'priority',
    THROTTLING: 'throttling',
  },
  NOTIFICATION_TYPE: { ...NOTIFICATION_TYPE },
  NOTIFICATION_CHANNEL: { ...NOTIFICATION_CHANNEL },
  RULE_CONDITIONS: {
    USER_ROLE: 'user_role',
    USER_PREFERENCE: 'user_preference',
    EVENT_TYPE: 'event_type',
    PRIORITY: 'priority',
  },
  RULE_ACTIONS: {
    SEND: 'send',
    BLOCK: 'block',
    ROUTE: 'route',
    TRANSFORM: 'transform',
  },
  MAX_RULES: 100,
} as const;
