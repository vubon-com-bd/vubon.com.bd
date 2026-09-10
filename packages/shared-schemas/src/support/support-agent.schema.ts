import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { SUPPORT_AGENT } from '@vubon/shared-constants/src/support/support-agent.constants';

const supportAgentStatusKeys = Object.keys(SUPPORT_AGENT.STATUS) as [string, ...string[]];
const supportAgentRoleKeys = Object.keys(SUPPORT_AGENT.ROLES) as [string, ...string[]];
const supportAgentTypeKeys = Object.keys(SUPPORT_AGENT.AGENT_TYPES) as [string, ...string[]];

export const SupportAgentSchema = BaseSchema.extend({
  agentId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(supportAgentStatusKeys),
  role: z.enum(supportAgentRoleKeys),
  type: z.enum(supportAgentTypeKeys),
  teamId: z.string().uuid().optional(),
  skills: z.array(z.string()),
  languages: z.array(z.string()),
  timezone: z.string(),
  shiftStart: z.string(),
  shiftEnd: z.string(),
  maxTickets: z.number().int().min(1),
  maxChats: z.number().int().min(1),
  currentTickets: z.number().int().min(0).default(0),
  currentChats: z.number().int().min(0).default(0),
  totalResolved: z.number().int().min(0).default(0),
  averageRating: z.number().min(0).max(5).default(0),
  satisfactionScore: z.number().min(0).max(100).default(0),
  isAvailable: z.boolean().default(true),
  isOnDuty: z.boolean().default(false),
  isOnLeave: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
