import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { E_BOOK_STATUS } from './e-book-status.constants';

export const E_BOOK = {
  STATUS: {
    ...STATUS,
    ...E_BOOK_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'e_book:view',
    CREATE: 'e_book:create',
    UPDATE: 'e_book:update',
    DELETE: 'e_book:delete',
  },
  E_BOOK_STATUS: { ...E_BOOK_STATUS },
  E_BOOK_TYPES: {
    FREE: 'free',
    PREMIUM: 'premium',
    EXCLUSIVE: 'exclusive',
  },
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 100000,
  MAX_PAGES: 500,
  MIN_PAGES: 10,
} as const;
