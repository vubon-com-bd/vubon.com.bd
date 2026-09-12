import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TICKET_STATUS } from './ticket-status.constants';
import { SUPPORT_MESSAGE } from './message.constants';

export const CONVERSATION = {
  STATUS: {
    ...COMMON_STATUS,
    ...TICKET_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
  },
  TICKET_STATUS: { ...TICKET_STATUS },
  MESSAGE: { ...SUPPORT_MESSAGE },
  CONVERSATION_TYPES: {
    TICKET: 'ticket',
    CHAT: 'chat',
    EMAIL: 'email',
    COMMENT: 'comment',
  },
  MAX_MESSAGES_PER_CONVERSATION: 1000,
  CONVERSATION_TIMEOUT_MINUTES: 60,
} as const;
