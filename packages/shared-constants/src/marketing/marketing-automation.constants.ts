import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CAMPAIGN_STATUS } from './campaign-status.constants';

export const MARKETING_AUTOMATION = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    ERROR: 'error',
    COMPLETED: 'completed',
  },
  TYPES: {
    ...COMMON_TYPES,
    EMAIL: 'email',
    SMS: 'sms',
    SOCIAL: 'social',
    PUSH: 'push',
    LEAD_SCORING: 'lead_scoring',
    LEAD_NURTURING: 'lead_nurturing',
    ABANDONED_CART: 'abandoned_cart',
    CUSTOMER_JOURNEY: 'customer_journey',
  },
  CAMPAIGN_STATUS: { ...CAMPAIGN_STATUS },
  TRIGGER_TYPES: {
    TIME_BASED: 'time_based',
    EVENT_BASED: 'event_based',
    BEHAVIORAL: 'behavioral',
  },
  EXECUTION_TIMES: {
    INSTANT: 'instant',
    SCHEDULED: 'scheduled',
    RECURRING: 'recurring',
  },
  MAX_WORKFLOWS: 50,
  MAX_STEPS_PER_WORKFLOW: 20,
  WORKFLOW_TIMEOUT_DAYS: 30,
} as const;
