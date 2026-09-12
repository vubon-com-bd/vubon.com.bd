import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO_SETTINGS } from './seo-settings.constants';
import { SEO_KEYWORD } from './seo-keyword.constants';

export const SEO_PREFERENCES = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEO_KEYWORD.TYPES,
    USER: 'user',
    SYSTEM: 'system',
    DEFAULT: 'default',
  },
  SEO_SETTINGS: { ...SEO_SETTINGS },
  SEO_KEYWORD: { ...SEO_KEYWORD },
  PREFERENCE_GROUPS: {
    KEYWORD_TRACKING: 'keyword_tracking',
    RANKING_ALERTS: 'ranking_alerts',
    AUDIT_SCHEDULE: 'audit_schedule',
    REPORT_SCHEDULE: 'report_schedule',
    NOTIFICATION_PREFERENCES: 'notification_preferences',
  },
  DEFAULT_PREFERENCES: {
    KEYWORD_TRACKING: { enabled: true, frequency: 'weekly' },
    RANKING_ALERTS: { enabled: true, threshold: 5 },
    AUDIT_SCHEDULE: { frequency: 'monthly', auto_fix: false },
    REPORT_SCHEDULE: { frequency: 'monthly', format: 'pdf' },
    NOTIFICATION_PREFERENCES: { email: true, in_app: true },
  },
} as const;
