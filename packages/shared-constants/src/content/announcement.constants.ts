import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { ANNOUNCEMENT_TYPE } from './announcement-type.constants';
import { ANNOUNCEMENT_STATUS } from './announcement-status.constants';

export const ANNOUNCEMENT = {
  STATUS: {
    ...STATUS,
    ...ANNOUNCEMENT_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'announcement:view',
    CREATE: 'announcement:create',
    UPDATE: 'announcement:update',
    DELETE: 'announcement:delete',
  },
  ANNOUNCEMENT_TYPE: { ...ANNOUNCEMENT_TYPE },
  ANNOUNCEMENT_STATUS: { ...ANNOUNCEMENT_STATUS },
  PRIORITY: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    URGENT: 4,
  },
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 1000,
  ANNOUNCEMENT_DURATION_DAYS: 30,
} as const;
