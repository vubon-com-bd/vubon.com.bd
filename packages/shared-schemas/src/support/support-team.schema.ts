/**
 * Support Team Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/support-team.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import {
  SUPPORT_TEAM_TYPE,
  SUPPORT_TEAM_STATUS,
  SUPPORT_TEAM_ROUTING,
} from '@vubon/shared-constants/support';

export const SupportTeamTypeSchema = z.enum(
  Object.values(SUPPORT_TEAM_TYPE) as [string, ...string[]]
);

export const SupportTeamStatusSchema = z.enum(
  Object.values(SUPPORT_TEAM_STATUS) as [string, ...string[]]
);

export const SupportTeamRoutingSchema = z.enum(
  Object.values(SUPPORT_TEAM_ROUTING) as [string, ...string[]]
);

export const SupportTeamSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: SupportTeamTypeSchema,
  status: SupportTeamStatusSchema,
  routing: SupportTeamRoutingSchema,
  leaderId: UuidSchema.optional(),
  memberIds: z.array(UuidSchema).max(200),
  skills: z.array(z.string().max(50)).max(20),
  categories: z.array(z.string().max(50)).max(20),
  maxTickets: z.number().int().positive(),
  activeTicketCount: z.number().int().nonnegative(),
  isDefault: z.boolean(),
});

export const SupportTeamPublicSchema = SupportTeamSchema.pick({
  id: true,
  name: true,
  type: true,
  status: true,
  activeTicketCount: true,
}).extend({
  memberCount: z.number().int().nonnegative(),
});

export const SupportTeamMembershipSchema = z.object({
  teamId: UuidSchema,
  userId: UuidSchema,
  isLeader: z.boolean(),
  joinedAt: z.string().datetime(),
  leftAt: z.string().datetime().optional(),
});

export type SupportTeamTypeSchemaType = z.infer<typeof SupportTeamTypeSchema>;
export type SupportTeamStatusSchemaType = z.infer<typeof SupportTeamStatusSchema>;
export type SupportTeamRoutingSchemaType = z.infer<typeof SupportTeamRoutingSchema>;
export type SupportTeamSchemaType = z.infer<typeof SupportTeamSchema>;
export type SupportTeamPublicSchemaType = z.infer<typeof SupportTeamPublicSchema>;
