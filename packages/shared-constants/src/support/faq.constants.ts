import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { FAQ_CATEGORY } from '../content/faq-category.constants';

export const SUPPORT_FAQ = {
  STATUS: {
    ...COMMON_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'faq:view',
    CREATE: 'faq:create',
    UPDATE: 'faq:update',
    DELETE: 'faq:delete',
  },
  FAQ_CATEGORY: { ...FAQ_CATEGORY },
  FAQ_TYPES: {
    GENERAL: 'general',
    TECHNICAL: 'technical',
    BILLING: 'billing',
    PRODUCT: 'product',
    SHIPPING: 'shipping',
    RETURN: 'return',
  },
  MAX_QUESTION_LENGTH: 200,
  MAX_ANSWER_LENGTH: 2000,
  MIN_ANSWER_LENGTH: 20,
} as const;
