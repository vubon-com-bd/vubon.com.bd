import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { TICKET_STATUS } from '@vubon/shared-constants/src/support/ticket-status.constants';

const ticketStatusKeys = Object.keys(TICKET_STATUS) as [string, ...string[]];

export const TicketStatusSchema = StatusSchema.extend({
  status: z.enum(ticketStatusKeys),
  category: z.literal('ticket'),
  isOpen: z.boolean().default(false),
  isInProgress: z.boolean().default(false),
  isOnHold: z.boolean().default(false),
  isPendingCustomer: z.boolean().default(false),
  isPendingAgent: z.boolean().default(false),
  isResolved: z.boolean().default(false),
  isClosed: z.boolean().default(false),
  isReopened: z.boolean().default(false),
  isEscalated: z.boolean().default(false),
  isAssigned: z.boolean().default(false),
  isUnassigned: z.boolean().default(false),
});

export const TicketStatusEnumSchema = z.enum(ticketStatusKeys);
