import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { NEWSLETTER_STATUS } from '../content/newsletter-status.constants';

export const EMAIL_MARKETING = {
  STATUS: {
    ...STATUS,
    ...NEWSLETTER_STATUS,
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    SENDING: 'sending',
    SENT: 'sent',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'email_marketing:view',
    CREATE: 'email_marketing:create',
    UPDATE: 'email_marketing:update',
    DELETE: 'email_marketing:delete',
    SEND: 'email_marketing:send',
  },
  NEWSLETTER_STATUS: { ...NEWSLETTER_STATUS },
  EMAIL_TEMPLATE: {
    WELCOME: 'welcome',
    PROMOTIONAL: 'promotional',
    TRANSACTIONAL: 'transactional',
    NEWSLETTER: 'newsletter',
    DIGEST: 'digest',
    ABANDONED_CART: 'abandoned_cart',
    ORDER_CONFIRMATION: 'order_confirmation',
    SHIPPING_UPDATE: 'shipping_update',
    REVIEW_REQUEST: 'review_request',
  },
  EMAIL_TYPES: {
    PROMOTIONAL: 'promotional',
    INFORMATIONAL: 'informational',
    TRANSACTIONAL: 'transactional',
    NEWSLETTER: 'newsletter',
    DIGEST: 'digest',
    ABANDONED_CART: 'abandoned_cart',
    ORDER_CONFIRMATION: 'order_confirmation',
    SHIPPING_UPDATE: 'shipping_update',
    REVIEW_REQUEST: 'review_request',
  },
  MAX_SUBJECT_LENGTH: 100,
  MAX_CONTENT_LENGTH: 10000,
  SEND_LIMIT_PER_HOUR: 1000,
  SEND_LIMIT_PER_DAY: 10000,
  MIN_SEND_INTERVAL_SECONDS: 5,
} as const;
