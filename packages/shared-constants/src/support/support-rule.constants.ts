import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { TICKET_PRIORITY } from './ticket-priority.constants';

export const SUPPORT_RULE = {
  TYPES: {
    ...COMMON_TYPES,
    AUTO_ASSIGN: 'auto_assign',
    AUTO_CLOSE: 'auto_close',
    AUTO_ESCALATE: 'auto_escalate',
    AUTO_RESPOND: 'auto_respond',
    CATEGORIZE: 'categorize',
  },
  TICKET_PRIORITY: { ...TICKET_PRIORITY },
  RULE_CONDITIONS: {
    KEYWORD: 'keyword',
    CATEGORY: 'category',
    PRIORITY: 'priority',
    TYPE: 'type',
    CHANNEL: 'channel',
    USER_TYPE: 'user_type',
  },
  RULE_ACTIONS: {
    ASSIGN_AGENT: 'assign_agent',
    CHANGE_PRIORITY: 'change_priority',
    CHANGE_STATUS: 'change_status',
    SEND_EMAIL: 'send_email',
    SEND_SMS: 'send_sms',
    ADD_TAG: 'add_tag',
    ESCALATE: 'escalate',
  },
  MAX_RULES: 100,
} as const;
