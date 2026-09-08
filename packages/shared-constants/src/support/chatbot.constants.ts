import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { CHATBOT_INTENT } from './chatbot-intent.constants';
import { CHATBOT_ENTITY } from './chatbot-entity.constants';

export const CHATBOT = {
  STATUS: {
    ...COMMON_STATUS,
    TRAINING: 'training',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ERROR: 'error',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'chatbot:view',
    CONFIGURE: 'chatbot:configure',
    TRAIN: 'chatbot:train',
    TEST: 'chatbot:test',
  },
  CHATBOT_INTENT: { ...CHATBOT_INTENT },
  CHATBOT_ENTITY: { ...CHATBOT_ENTITY },
  CHATBOT_TYPES: {
    RULE_BASED: 'rule_based',
    AI_BASED: 'ai_based',
    HYBRID: 'hybrid',
  },
  CONFIDENCE_THRESHOLD: 0.7,
  MAX_RETRY_ATTEMPTS: 3,
  SESSION_TIMEOUT_MINUTES: 15,
} as const;
