import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TICKET_PRIORITY } from './ticket-priority.constants';
import { TICKET_STATUS } from './ticket-status.constants';

export const TICKET_ESCALATION = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
  },
  TICKET_PRIORITY: { ...TICKET_PRIORITY },
  TICKET_STATUS: { ...TICKET_STATUS },
  ESCALATION_LEVELS: {
    LEVEL_1: 'level_1',
    LEVEL_2: 'level_2',
    LEVEL_3: 'level_3',
    LEVEL_4: 'level_4',
  },
  ESCALATION_TRIGGERS: {
    TIME: 'time',
    PRIORITY: 'priority',
    CUSTOMER: 'customer',
    SYSTEM: 'system',
  },
  ESCALATION_TIMEOUT_HOURS: {
    LEVEL_1: 24,
    LEVEL_2: 12,
    LEVEL_3: 6,
    LEVEL_4: 3,
  },
} as const;
