import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_PREFERENCES } from '../../user/user-preferences.constants';

export const PERSONALIZATION = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    TRAINING: 'training',
    OPTIMIZING: 'optimizing',
  },
  TYPES: {
    ...COMMON_TYPES,
    EXPLICIT: 'explicit',
    IMPLICIT: 'implicit',
    HYBRID: 'hybrid',
  },
  USER_PREFERENCES: { ...USER_PREFERENCES },
  PERSONALIZATION_FACTORS: {
    USER_HISTORY: 'user_history',
    USER_PREFERENCES: 'user_preferences',
    USER_DEMOGRAPHICS: 'user_demographics',
    USER_BEHAVIOR: 'user_behavior',
    CONTEXT: 'context',
    LOCATION: 'location',
    DEVICE: 'device',
    TIME: 'time',
    SEASON: 'season',
  },
  MIN_USER_ACTIONS_FOR_PERSONALIZATION: 10,
  PERSONALIZATION_MODEL: 'deep_learning',
  MODEL_UPDATE_INTERVAL_HOURS: 12,
} as const;
