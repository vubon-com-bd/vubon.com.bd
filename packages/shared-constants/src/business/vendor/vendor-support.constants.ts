import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { VENDOR_STATUS } from './vendor-status.constants';

export const VENDOR_SUPPORT = {
  TYPES: {
    ...COMMON_TYPES,
    GENERAL: 'general',
    TECHNICAL: 'technical',
    FINANCIAL: 'financial',
    OPERATIONAL: 'operational',
  },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  SUPPORT_CHANNELS: {
    EMAIL: 'email',
    PHONE: 'phone',
    CHAT: 'chat',
    TICKET: 'ticket',
    WHATSAPP: 'whatsapp',
  },
  RESPONSE_TIME_HOURS: {
    URGENT: 1,
    HIGH: 4,
    NORMAL: 12,
    LOW: 24,
  },
  SUPPORT_PRIORITY: {
    CRITICAL: 1,
    HIGH: 2,
    MEDIUM: 3,
    LOW: 4,
  },
} as const;
