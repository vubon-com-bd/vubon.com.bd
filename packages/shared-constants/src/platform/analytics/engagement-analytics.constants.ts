import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const ENGAGEMENT_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    USER: 'user',
    CONTENT: 'content',
    FEATURE: 'feature',
  },
  METRICS: {
    ACTIVE_USERS: 'active_users',
    SESSION_DURATION: 'session_duration',
    PAGES_PER_SESSION: 'pages_per_session',
    BOUNCE_RATE: 'bounce_rate',
    RETURN_RATE: 'return_rate',
    FEATURE_USAGE: 'feature_usage',
    CONTENT_ENGAGEMENT: 'content_engagement',
  },
  ENGAGEMENT_SCORES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  },
} as const;
