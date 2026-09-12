import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const NOTIFICATION_CHANNEL = {
  TYPES: {
    ...COMMON_TYPES,
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
    WHATSAPP: 'whatsapp',
    MESSENGER: 'messenger',
    TELEGRAM: 'telegram',
    SLACK: 'slack',
    DISCORD: 'discord',
  },
  CHANNEL_PRIORITIES: {
    CRITICAL: ['sms', 'push'],
    HIGH: ['email', 'whatsapp'],
    MEDIUM: ['in_app', 'messenger'],
    LOW: ['telegram', 'slack'],
  },
  MAX_CHANNELS_PER_NOTIFICATION: 5,
} as const;
