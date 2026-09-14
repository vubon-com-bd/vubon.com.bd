/**
 * Ticket Escalation Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/ticket-escalation.constants থেকে।
 */

import { z } from 'zod';
import { SUPPORT_AGENT_LEVEL } from '@vubon/shared-constants/support';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const SupportAgentLevelSchema = z.enum(
  Object.values(SUPPORT_AGENT_LEVEL) as [string, ...string[]]
);

export const TicketEscalationSchema = z.object({
  id: z.string().min(1),
  ticketId: UuidSchema,
  fromLevel: SupportAgentLevelSchema.optional(),
  toLevel: SupportAgentLevelSchema,
  reason: z.string().min(1).max(500),
  escalatedBy: UuidSchema,
  escalatedTo: UuidSchema.optional(),
  escalatedAt: z.string().datetime(),
  resolvedAt: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
});

export const EscalationConditionSchema = z.object({
  type: z.enum(['priority', 'time_elapsed', 'no_response', 'sla_breach', 'keyword']),
  value: z.union([z.string(), z.number()]),
});

export const EscalationRuleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  condition: EscalationConditionSchema,
  targetLevel: SupportAgentLevelSchema,
  isActive: z.boolean(),
});

export type SupportAgentLevelSchemaType = z.infer<typeof SupportAgentLevelSchema>;
export type TicketEscalationSchemaType = z.infer<typeof TicketEscalationSchema>;
export type EscalationRuleSchemaType = z.infer<typeof EscalationRuleSchema>;
