import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { CONTENT_CATEGORY } from '../content/content-category.constants';

export const KNOWLEDGE_BASE = {
  STATUS: {
    ...COMMON_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
    UPDATED: 'updated',
    ARCHIVED: 'archived',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'knowledge:view',
    CREATE: 'knowledge:create',
    UPDATE: 'knowledge:update',
    DELETE: 'knowledge:delete',
  },
  CONTENT_CATEGORY: { ...CONTENT_CATEGORY },
  ARTICLE_TYPES: {
    TUTORIAL: 'tutorial',
    GUIDE: 'guide',
    TROUBLESHOOTING: 'troubleshooting',
    REFERENCE: 'reference',
    BEST_PRACTICE: 'best_practice',
  },
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 50000,
  MIN_CONTENT_LENGTH: 100,
  MAX_TAGS: 10,
} as const;
