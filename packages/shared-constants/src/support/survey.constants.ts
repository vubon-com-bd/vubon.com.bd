import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { TICKET_SATISFACTION } from './ticket-satisfaction.constants';

export const SURVEY = {
  STATUS: {
    ...COMMON_STATUS,
    DRAFT: 'draft',
    ACTIVE: 'active',
    CLOSED: 'closed',
    ARCHIVED: 'archived',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'survey:view',
    CREATE: 'survey:create',
    UPDATE: 'survey:update',
    DELETE: 'survey:delete',
    RESPOND: 'survey:respond',
  },
  TICKET_SATISFACTION: { ...TICKET_SATISFACTION },
  SURVEY_TYPES: {
    CUSTOMER_SATISFACTION: 'customer_satisfaction',
    SUPPORT_QUALITY: 'support_quality',
    PRODUCT_FEEDBACK: 'product_feedback',
    SERVICE_FEEDBACK: 'service_feedback',
  },
  MAX_QUESTIONS: 20,
  MIN_QUESTIONS: 3,
  SURVEY_DURATION_DAYS: 30,
  REMINDER_DAYS: 7,
} as const;
