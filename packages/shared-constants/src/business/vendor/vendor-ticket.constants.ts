import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { VENDOR_SUPPORT } from './vendor-support.constants';

export const VENDOR_TICKET = {
  STATUS: {
    ...COMMON_STATUS,
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    REOPENED: 'reopened',
  },
  VENDOR_SUPPORT: { ...VENDOR_SUPPORT },
  TICKET_PRIORITY: {
    URGENT: 'urgent',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  },
  MAX_TICKETS_PER_VENDOR: 100,
  AUTO_CLOSE_DAYS: 7,
  ESCALATION_HOURS: 48,
} as const;
