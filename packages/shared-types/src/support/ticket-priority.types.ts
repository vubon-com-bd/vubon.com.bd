import { TypeObject } from '../common/types.types';
import { TICKET_PRIORITY } from '@vubon/shared-constants/src/support/ticket-priority.constants';

export interface TicketPriority extends TypeObject {
  type: keyof typeof TICKET_PRIORITY.TYPES | string;
  category: 'ticket_priority';
  level: keyof typeof TICKET_PRIORITY.PRIORITY_LEVELS | string;
  responseTimeMinutes: number;
  resolutionTimeHours: number;
  isLow: boolean;
  isMedium: boolean;
  isHigh: boolean;
  isUrgent: boolean;
  isCritical: boolean;
}

export type TicketPriorityKey = keyof typeof TICKET_PRIORITY.TYPES;
