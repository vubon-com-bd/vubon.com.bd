import { z } from 'zod';
import { TICKET_PRIORITY } from '@vubon/shared-constants/src/support/ticket-priority.constants';

const ticketPriorityTypeKeys = Object.keys(TICKET_PRIORITY.TYPES) as [string, ...string[]];
const ticketPriorityLevelKeys = Object.keys(TICKET_PRIORITY.PRIORITY_LEVELS) as [
  string,
  ...string[],
];

export const TicketPrioritySchema = z.object({
  priority: z.enum(ticketPriorityTypeKeys),
  category: z.literal('ticket_priority'),
  level: z.enum(ticketPriorityLevelKeys),
  responseTimeMinutes: z.number().int().min(1),
  resolutionTimeHours: z.number().int().min(1),
  isLow: z.boolean().default(false),
  isMedium: z.boolean().default(false),
  isHigh: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
  isCritical: z.boolean().default(false),
});

export const TicketPriorityEnumSchema = z.enum(ticketPriorityTypeKeys);
