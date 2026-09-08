import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { FAQ_STATUS } from './faq-status.constants';
import { FAQ_CATEGORY } from './faq-category.constants';

export const FAQ = {
  STATUS: {
    ...STATUS,
    ...FAQ_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'faq:view',
    CREATE: 'faq:create',
    UPDATE: 'faq:update',
    DELETE: 'faq:delete',
  },
  FAQ_STATUS: { ...FAQ_STATUS },
  FAQ_CATEGORY: { ...FAQ_CATEGORY },
  MAX_QUESTION_LENGTH: 200,
  MAX_ANSWER_LENGTH: 2000,
  MIN_ANSWER_LENGTH: 20,
} as const;
