import { z } from 'zod';
import { TICKET_TYPE } from '@vubon/shared-constants/src/support/ticket-type.constants';

const ticketTypeKeys = Object.keys(TICKET_TYPE.TYPES) as [string, ...string[]];

export const TicketTypeSchema = z.object({
  type: z.enum(ticketTypeKeys),
  category: z.literal('ticket_type'),
  isGeneral: z.boolean().default(false),
  isTechnical: z.boolean().default(false),
  isBilling: z.boolean().default(false),
  isOrder: z.boolean().default(false),
  isPayment: z.boolean().default(false),
  isShipping: z.boolean().default(false),
  isReturn: z.boolean().default(false),
  isRefund: z.boolean().default(false),
  isProduct: z.boolean().default(false),
  isVendor: z.boolean().default(false),
  isAccount: z.boolean().default(false),
  isSecurity: z.boolean().default(false),
  isFeature: z.boolean().default(false),
  isComplaint: z.boolean().default(false),
  isFeedback: z.boolean().default(false),
});

export const TicketTypeEnumSchema = z.enum(ticketTypeKeys);
