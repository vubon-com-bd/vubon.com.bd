import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const TICKET_CHANNEL = {
  TYPES: {
    ...COMMON_TYPES,
    EMAIL: 'email',
    PHONE: 'phone',
    CHAT: 'chat',
    WHATSAPP: 'whatsapp',
    MESSENGER: 'messenger',
    SOCIAL: 'social',
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    BOT: 'bot',
  },
  CHANNEL_PRIORITY: {
    URGENT: ['phone', 'chat'],
    HIGH: ['whatsapp', 'messenger'],
    MEDIUM: ['email', 'web'],
    LOW: ['social', 'api'],
  },
} as const;
