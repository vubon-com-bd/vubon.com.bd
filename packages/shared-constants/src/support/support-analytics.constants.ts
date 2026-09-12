import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { METRICS } from '../common/types.constants';
import { TICKET_STATUS } from './ticket-status.constants';
import { TICKET_PRIORITY } from './ticket-priority.constants';
import { TICKET_SATISFACTION } from './ticket-satisfaction.constants';
import { SUPPORT_AGENT } from './support-agent.constants';

export const SUPPORT_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    TICKET: 'ticket',
    RESPONSE: 'response',
    RESOLUTION: 'resolution',
    SATISFACTION: 'satisfaction',
    AGENT: 'agent',
    PERFORMANCE: 'performance',
  },
  METRICS: {
    ...METRICS,
    TOTAL_TICKETS: 'total_tickets',
    OPEN_TICKETS: 'open_tickets',
    RESOLVED_TICKETS: 'resolved_tickets',
    AVERAGE_RESPONSE_TIME: 'average_response_time',
    AVERAGE_RESOLUTION_TIME: 'average_resolution_time',
    FIRST_RESPONSE_TIME: 'first_response_time',
    SATISFACTION_SCORE: 'satisfaction_score',
    ESCALATION_RATE: 'escalation_rate',
    REOPEN_RATE: 'reopen_rate',
  },
  TICKET_STATUS: { ...TICKET_STATUS },
  TICKET_PRIORITY: { ...TICKET_PRIORITY },
  TICKET_SATISFACTION: { ...TICKET_SATISFACTION },
  SUPPORT_AGENT: { ...SUPPORT_AGENT },
  ANALYTICS_GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  PERFORMANCE_THRESHOLDS: {
    EXCELLENT: 95,
    GOOD: 85,
    AVERAGE: 70,
    POOR: 50,
  },
  REPORT_RETENTION_DAYS: 365,
} as const;
