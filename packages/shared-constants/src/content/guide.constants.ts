import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { GUIDE_STATUS } from './guide-status.constants';

export const GUIDE = {
  STATUS: {
    ...STATUS,
    ...GUIDE_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'guide:view',
    CREATE: 'guide:create',
    UPDATE: 'guide:update',
    DELETE: 'guide:delete',
  },
  GUIDE_STATUS: { ...GUIDE_STATUS },
  GUIDE_TYPES: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  },
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 50000,
} as const;
