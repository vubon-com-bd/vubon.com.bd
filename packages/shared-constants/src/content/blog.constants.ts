import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { CONTENT_STATUS } from './content-status.constants';
import { BLOG_CATEGORY } from './blog-category.constants';
import { BLOG_TAG } from './blog-tag.constants';
import { USER_STATUS } from '../user/user-status.constants';

export const BLOG = {
  STATUS: {
    ...STATUS,
    ...CONTENT_STATUS,
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'blog:view',
    CREATE: 'blog:create',
    UPDATE: 'blog:update',
    DELETE: 'blog:delete',
    PUBLISH: 'blog:publish',
  },
  CONTENT_STATUS: { ...CONTENT_STATUS },
  BLOG_CATEGORY: { ...BLOG_CATEGORY },
  BLOG_TAG: { ...BLOG_TAG },
  USER_STATUS: { ...USER_STATUS },
  BLOG_TYPES: {
    STANDARD: 'standard',
    NEWS: 'news',
    TUTORIAL: 'tutorial',
    REVIEW: 'review',
    OPINION: 'opinion',
    INTERVIEW: 'interview',
  },
  MAX_TITLE_LENGTH: 200,
  MAX_EXCERPT_LENGTH: 300,
  MIN_EXCERPT_LENGTH: 50,
  READING_TIME_WORDS: 200,
  BLOG_URL_PREFIX: '/blog/',
} as const;
