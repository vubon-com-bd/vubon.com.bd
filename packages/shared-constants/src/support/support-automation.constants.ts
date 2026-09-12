import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { SUPPORT_RULE } from './support-rule.constants';

export const SUPPORT_AUTOMATION = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ERROR: 'error',
    PAUSED: 'paused',
  },
  TYPES: {
    ...COMMON_TYPES,
    AUTO_REPLY: 'auto_reply',
    TICKET_ROUTING: 'ticket_routing',
    PRIORITY_SET: 'priority_set',
    ESCALATION: 'escalation',
    FOLLOW_UP: 'follow_up',
  },
  SUPPORT_RULE: { ...SUPPORT_RULE },
  EXECUTION_TIMES: {
    ON_CREATE: 'on_create',
    ON_UPDATE: 'on_update',
    ON_CLOSE: 'on_close',
    SCHEDULED: 'scheduled',
  },
} as const;
