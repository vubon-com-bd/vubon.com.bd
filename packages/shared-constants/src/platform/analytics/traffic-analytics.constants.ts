import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const TRAFFIC_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    SOURCE: 'source',
    DEVICE: 'device',
    GEOGRAPHY: 'geography',
    BEHAVIOR: 'behavior',
  },
  METRICS: {
    TOTAL_VISITS: 'total_visits',
    UNIQUE_VISITORS: 'unique_visitors',
    PAGE_VIEWS: 'page_views',
    BOUNCE_RATE: 'bounce_rate',
    SESSION_DURATION: 'session_duration',
    PAGES_PER_SESSION: 'pages_per_session',
  },
  SOURCE_TYPES: {
    ORGANIC: 'organic',
    DIRECT: 'direct',
    REFERRAL: 'referral',
    SOCIAL: 'social',
    PAID: 'paid',
    EMAIL: 'email',
  },
  DEVICE_TYPES: {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet',
  },
} as const;
