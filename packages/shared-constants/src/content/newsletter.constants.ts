import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { NEWSLETTER_STATUS } from './newsletter-status.constants';

export const NEWSLETTER = {
  STATUS: {
    ...STATUS,
    ...NEWSLETTER_STATUS,
    DRAFT: 'draft',
    SENT: 'sent',
    SCHEDULED: 'scheduled',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'newsletter:view',
    CREATE: 'newsletter:create',
    UPDATE: 'newsletter:update',
    DELETE: 'newsletter:delete',
    SEND: 'newsletter:send',
  },
  NEWSLETTER_STATUS: { ...NEWSLETTER_STATUS },
  NEWSLETTER_TYPES: {
    PROMOTIONAL: 'promotional',
    INFORMATIONAL: 'informational',
    TRANSACTIONAL: 'transactional',
    DIGEST: 'digest',
  },
  MAX_SUBJECT_LENGTH: 100,
  MAX_CONTENT_LENGTH: 10000,
  SEND_LIMIT_PER_DAY: 10000,
} as const;
