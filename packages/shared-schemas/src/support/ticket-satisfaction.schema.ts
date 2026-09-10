import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { TICKET_SATISFACTION } from '@vubon/shared-constants/src/support/ticket-satisfaction.constants';

const ticketSatisfactionTypeKeys = Object.keys(TICKET_SATISFACTION.TYPES) as [string, ...string[]];
const ticketSatisfactionScoreKeys = Object.keys(TICKET_SATISFACTION.SATISFACTION_SCORES) as [
  string,
  ...string[],
];

export const TicketSatisfactionSchema = BaseSchema.extend({
  satisfactionId: z.string().uuid(),
  ticketId: z.string().uuid(),
  rating: z.enum(ticketSatisfactionTypeKeys),
  score: z.enum(ticketSatisfactionScoreKeys),
  comment: z.string().optional(),
  agentId: z.string().uuid().optional(),
  feedback: z.array(z.string()),
  isGood: z.boolean().default(false),
  isExcellent: z.boolean().default(false),
  submittedAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
