import { STATUS } from '../common/status.constants';
import { TYPES } from '../common/types.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../admin/admin-permission.constants';
import { USER_STATUS } from '../user/user-status.constants';
import { VENDOR_STATUS } from '../business/vendor/vendor-status.constants';

export const CONTENT = {
  STATUS: {
    ...STATUS,
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  },
  TYPES: {
    ...TYPES,
    BLOG: 'blog',
    PAGE: 'page',
    MEDIA: 'media',
    GALLERY: 'gallery',
    ANNOUNCEMENT: 'announcement',
    NEWSLETTER: 'newsletter',
    TESTIMONIAL: 'testimonial',
    FAQ: 'faq',
    GUIDE: 'guide',
    CASE_STUDY: 'case_study',
    WHITE_PAPER: 'white_paper',
    E_BOOK: 'e_book',
    VIDEO: 'video',
    PODCAST: 'podcast',
    WEBINAR: 'webinar',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'content:view',
    CREATE: 'content:create',
    UPDATE: 'content:update',
    DELETE: 'content:delete',
    PUBLISH: 'content:publish',
    APPROVE: 'content:approve',
    MANAGE: 'content:manage',
  },
  USER_STATUS: { ...USER_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  MAX_TITLE_LENGTH: 255,
  MAX_DESCRIPTION_LENGTH: 5000,
  MAX_CONTENT_LENGTH: 100000,
  MIN_CONTENT_LENGTH: 100,
} as const;
