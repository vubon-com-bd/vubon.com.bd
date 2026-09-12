import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const TICKET_STATUS = {
  ...COMMON_STATUS,
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  ON_HOLD: 'on_hold',
  PENDING_CUSTOMER: 'pending_customer',
  PENDING_AGENT: 'pending_agent',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REOPENED: 'reopened',
  ESCALATED: 'escalated',
  ASSIGNED: 'assigned',
  UNASSIGNED: 'unassigned',
} as const;
