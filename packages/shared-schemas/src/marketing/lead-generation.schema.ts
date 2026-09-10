import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { LeadSourceSchema } from './lead-source.schema';
import { LEAD_STATUS } from '@vubon/shared-constants/src/marketing/lead-status.constants';

const leadStatusKeys = Object.keys(LEAD_STATUS) as [string, ...string[]];

export const LeadGenerationSchema = BaseSchema.extend({
  leadId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().optional(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  status: z.enum(leadStatusKeys),
  source: LeadSourceSchema,
  score: z.number().int().min(0).max(100),
  interest: z.array(z.string()),
  budget: z.number().min(0).optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  assignedTo: z.string().uuid().optional(),
  assignedToUser: UserSchema.optional(),
  convertedToUserId: z.string().uuid().optional(),
  convertedToUser: UserSchema.optional(),
  convertedAt: z.date().optional(),
  lostAt: z.date().optional(),
  lostReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
