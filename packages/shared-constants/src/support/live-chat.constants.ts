import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { SUPPORT_MESSAGE } from './message.constants';
import { SUPPORT_AGENT } from './support-agent.constants';

export const LIVE_CHAT = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BUSY: 'busy',
    OFFLINE: 'offline',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'chat:view',
    START: 'chat:start',
    END: 'chat:end',
    TRANSFER: 'chat:transfer',
  },
  MESSAGE: { ...SUPPORT_MESSAGE },
  SUPPORT_AGENT: { ...SUPPORT_AGENT },
  CHAT_TYPES: {
    USER: 'user',
    VENDOR: 'vendor',
    GUEST: 'guest',
  },
  CHAT_TIMEOUT_MINUTES: 30,
  MAX_CHATS_PER_AGENT: 5,
  QUEUE_TIMEOUT_MINUTES: 5,
  TYPING_TIMEOUT_SECONDS: 5,
} as const;
