/**
 * Support Agent Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/support-agent.constants থেকে।
 */

import { z } from 'zod';
import { SUPPORT_AGENT_STATUS, SUPPORT_AGENT_SKILL } from '@vubon/shared-constants/support';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { EmailSchema } from '../common/primitives/email.schema';
import { SupportAgentLevelSchema } from './ticket-escalation.schema';

export const SupportAgentStatusSchema = z.enum(
  Object.values(SUPPORT_AGENT_STATUS) as [string, ...string[]]
);

export const SupportAgentSkillSchema = z.enum(
  Object.values(SUPPORT_AGENT_SKILL) as [string, ...string[]]
);

export const SupportAgentSchema = z.object({
  userId: UuidSchema,
  name: z.string().min(1).max(150),
  email: EmailSchema,
  status: SupportAgentStatusSchema,
  level: SupportAgentLevelSchema,
  skills: z.array(SupportAgentSkillSchema).max(20),
  teamIds: z.array(UuidSchema).max(20),
  languages: z.array(z.string().min(2).max(10)).max(10),
  activeTicketCount: z.number().int().nonnegative(),
  activeChatCount: z.number().int().nonnegative(),
  maxConcurrentTickets: z.number().int().positive(),
  maxConcurrentChats: z.number().int().positive(),
  resolvedToday: z.number().int().nonnegative(),
  averageResolutionMinutes: z.number().nonnegative(),
  satisfactionScore: z.number().min(0).max(5),
  lastActiveAt: z.string().datetime(),
  isAvailable: z.boolean(),
});

export const SupportAgentPublicSchema = SupportAgentSchema.pick({
  userId: true,
  name: true,
  status: true,
  level: true,
  isAvailable: true,
});

export const SupportAgentAvailabilitySchema = z.object({
  userId: UuidSchema,
  isOnline: z.boolean(),
  status: SupportAgentStatusSchema,
  activeTicketCount: z.number().int().nonnegative(),
  canAcceptNewTicket: z.boolean(),
  checkedAt: z.string().datetime(),
});

export type SupportAgentStatusSchemaType = z.infer<typeof SupportAgentStatusSchema>;
export type SupportAgentSkillSchemaType = z.infer<typeof SupportAgentSkillSchema>;
export type SupportAgentSchemaType = z.infer<typeof SupportAgentSchema>;
export type SupportAgentPublicSchemaType = z.infer<typeof SupportAgentPublicSchema>;
