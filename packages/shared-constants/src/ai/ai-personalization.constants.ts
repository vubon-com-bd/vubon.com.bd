import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { PERSONALIZATION } from '../platform/discovery/personalization.constants';
import { USER_PREFERENCES } from '../user/user-preferences.constants';

export const AI_PERSONALIZATION = {
  TYPES: {
    ...COMMON_TYPES,
    ...PERSONALIZATION.TYPES,
    AI_DRIVEN: 'ai_driven',
    RULE_BASED: 'rule_based',
    HYBRID: 'hybrid',
  },
  PERSONALIZATION: { ...PERSONALIZATION },
  USER_PREFERENCES: { ...USER_PREFERENCES },
  PERSONALIZATION_ALGORITHMS: {
    COLLABORATIVE: 'collaborative',
    CONTENT_BASED: 'content_based',
    HYBRID: 'hybrid',
    CONTEXTUAL: 'contextual',
  },
  PERSONALIZATION_FACTORS: {
    USER_HISTORY: 0.3,
    USER_PREFERENCES: 0.25,
    USER_BEHAVIOR: 0.2,
    CONTEXT: 0.15,
    DEMOGRAPHICS: 0.1,
  },
  MIN_USER_ACTIONS: 10,
  PERSONALIZATION_UPDATE_INTERVAL_MINUTES: 30,
} as const;
