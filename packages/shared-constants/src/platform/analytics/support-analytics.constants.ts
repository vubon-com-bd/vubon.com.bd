import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { TICKET_STATUS } from '../../support/ticket-status.constants';

export const SUPPORT_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    TICKETS: 'tickets',
    SATISFACTION: 'satisfaction',
    PERFORMANCE: 'performance',
  },
  TICKET_STATUS: { ...TICKET_STATUS },
  METRICS: {
    TOTAL_TICKETS: 'total_tickets',
    OPEN_TICKETS: 'open_tickets',
    RESOLVED_TICKETS: 'resolved_tickets',
    AVERAGE_RESPONSE_TIME: 'average_response_time',
    AVERAGE_RESOLUTION_TIME: 'average_resolution_time',
    SATISFACTION_SCORE: 'satisfaction_score',
    ESCALATION_RATE: 'escalation_rate',
    REOPEN_RATE: 'reopen_rate',
  },
  AGENT_PERFORMANCE: {
    TICKETS_RESOLVED: 'tickets_resolved',
    AVERAGE_RESPONSE_TIME: 'average_response_time',
    AVERAGE_RESOLUTION_TIME: 'average_resolution_time',
    SATISFACTION_SCORE: 'satisfaction_score',
  },
} as const;
