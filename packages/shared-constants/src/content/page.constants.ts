import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { PAGE_STATUS } from './page-status.constants';
import { PAGE_TEMPLATE } from './page-template.constants';
import { PAGE_LAYOUT } from './page-layout.constants';

export const PAGE = {
  STATUS: {
    ...STATUS,
    ...PAGE_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'page:view',
    CREATE: 'page:create',
    UPDATE: 'page:update',
    DELETE: 'page:delete',
  },
  PAGE_STATUS: { ...PAGE_STATUS },
  PAGE_TEMPLATE: { ...PAGE_TEMPLATE },
  PAGE_LAYOUT: { ...PAGE_LAYOUT },
  PAGE_TYPES: {
    HOME: 'home',
    ABOUT: 'about',
    CONTACT: 'contact',
    TERMS: 'terms',
    PRIVACY: 'privacy',
    RETURN: 'return',
    SHIPPING: 'shipping',
    FAQ: 'faq',
    BLOG: 'blog',
    SHOP: 'shop',
    CUSTOM: 'custom',
  },
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 50000,
  PAGE_URL_PREFIX: '/page/',
} as const;
