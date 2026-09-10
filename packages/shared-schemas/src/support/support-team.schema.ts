import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SUPPORT_TEAM } from '@vubon/shared-constants/src/support/support-team.constants';
import { SupportAgentSchema } from './support-agent.schema';

const supportTeamStatusKeys = Object.keys(SUPPORT_TEAM.STATUS) as [string, ...string[]];
const supportTeamTypeKeys = Object.keys(SUPPORT_TEAM.TYPES) as [string, ...string[]];

export const SupportTeamSchema = BaseSchema.extend({
  teamId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(supportTeamStatusKeys),
  type: z.enum(supportTeamTypeKeys),
  leadId: z.string().uuid(),
  lead: SupportAgentSchema,
  members: z.array(SupportAgentSchema),
  memberCount: z.number().int().min(0).default(0),
  minSize: z.number().int().min(1),
  maxSize: z.number().int().min(1),
  shiftRotationDays: z.number().int().min(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
