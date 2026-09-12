import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { TICKET_PRIORITY } from './ticket-priority.constants';

export const SUPPORT_SLA = {
  TYPES: {
    ...COMMON_TYPES,
    RESPONSE_TIME: 'response_time',
    RESOLUTION_TIME: 'resolution_time',
    FIRST_RESPONSE_TIME: 'first_response_time',
  },
  TICKET_PRIORITY: { ...TICKET_PRIORITY },
  SLA_TARGETS: {
    FIRST_RESPONSE: {
      LOW: 7200,
      MEDIUM: 3600,
      HIGH: 1800,
      URGENT: 600,
      CRITICAL: 300,
    },
    RESOLUTION: {
      LOW: 172800,
      MEDIUM: 86400,
      HIGH: 43200,
      URGENT: 21600,
      CRITICAL: 10800,
    },
  },
  PENALTY_RATE_PERCENTAGE: 10,
  SLA_BREACH_NOTIFY_MINUTES: 30,
  SLA_ESCALATION_MINUTES: 15,
} as const;
