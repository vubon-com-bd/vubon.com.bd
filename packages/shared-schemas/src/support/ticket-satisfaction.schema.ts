/**
 * Ticket Satisfaction Schema
 * @module shared-schemas/support
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const TicketSatisfactionSchema = z.object({
  ticketId: UuidSchema,
  rating: z.number().int().min(1).max(5),
  scale: z.enum(['csat', 'nps', 'ces']),
  comment: z.string().max(2000).optional(),
  feedback: z.array(z.string().max(100)).max(20).optional(),
  ratedBy: UuidSchema,
  ratedAt: z.string().datetime(),
});

export const SatisfactionStatsSchema = z.object({
  period: z.string().min(1).max(50),
  averageRating: z.number().min(0).max(5),
  totalResponses: z.number().int().nonnegative(),
  csat: z.number().min(0).max(100),
  nps: z.number().min(-100).max(100),
  ces: z.number().min(0).max(7),
});

export type TicketSatisfactionSchemaType = z.infer<typeof TicketSatisfactionSchema>;
export type SatisfactionStatsSchemaType = z.infer<typeof SatisfactionStatsSchema>;
