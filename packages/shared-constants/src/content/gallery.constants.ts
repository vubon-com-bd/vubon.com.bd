import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { GALLERY_STATUS } from './gallery-status.constants';
import { MEDIA } from './media.constants';

export const GALLERY = {
  STATUS: {
    ...STATUS,
    ...GALLERY_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'gallery:view',
    CREATE: 'gallery:create',
    UPDATE: 'gallery:update',
    DELETE: 'gallery:delete',
  },
  GALLERY_STATUS: { ...GALLERY_STATUS },
  MEDIA: { ...MEDIA },
  GALLERY_TYPES: {
    PRODUCT: 'product',
    VENDOR: 'vendor',
    BLOG: 'blog',
    EVENT: 'event',
    CUSTOM: 'custom',
  },
  MAX_IMAGES_PER_GALLERY: 50,
  MIN_IMAGES_PER_GALLERY: 1,
} as const;
