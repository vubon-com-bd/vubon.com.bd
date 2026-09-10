import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SUPPORT_SLA } from '@vubon/shared-constants/src/support/support-sla.constants';
import { TicketPrioritySchema } from './ticket-priority.schema';

const supportSlaTypeKeys = Object.keys(SUPPORT_SLA.TYPES) as [string, ...string[]];

export const SupportSlaSchema = BaseSchema.extend({
  slaId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  type: z.enum(supportSlaTypeKeys),
  priority: TicketPrioritySchema,
  responseTimeTarget: z.number().int().min(1),
  resolutionTimeTarget: z.number().int().min(1),
  firstResponseTimeTarget: z.number().int().min(1),
  penaltyRate: z.number().min(0).max(100),
  breachNotifyMinutes: z.number().int().min(1),
  escalationMinutes: z.number().int().min(1),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
