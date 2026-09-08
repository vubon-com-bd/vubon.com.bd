import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../admin/admin-permission.constants';
import { USER_STATUS } from '../user/user-status.constants';
import { VENDOR_STATUS } from '../business/vendor/vendor-status.constants';

export const AI = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    TRAINING: 'training',
    DEPLOYED: 'deployed',
    FAILED: 'failed',
    MAINTENANCE: 'maintenance',
    DEPRECATED: 'deprecated',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'ai:view',
    MANAGE: 'ai:manage',
    CONFIGURE: 'ai:configure',
    TRAIN: 'ai:train',
    DEPLOY: 'ai:deploy',
    ANALYZE: 'ai:analyze',
    OPTIMIZE: 'ai:optimize',
  },
  USER_STATUS: { ...USER_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  AI_TYPES: {
    RECOMMENDATION: 'recommendation',
    PERSONALIZATION: 'personalization',
    SEARCH: 'search',
    RANKING: 'ranking',
    ANALYTICS: 'analytics',
    FORECAST: 'forecast',
    INSIGHT: 'insight',
    NLP: 'nlp',
    CV: 'cv',
    GENERATIVE: 'generative',
  },
  MAX_MODELS: 50,
  MAX_TRAINING_JOBS: 10,
  MAX_CONCURRENT_JOBS: 3,
  TRAINING_TIMEOUT_HOURS: 24,
} as const;
