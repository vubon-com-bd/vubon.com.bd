import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { LEAD_STATUS } from '@vubon/shared-constants/src/marketing/lead-status.constants';

const leadStatusKeys = Object.keys(LEAD_STATUS) as [string, ...string[]];

export const LeadStatusSchema = StatusSchema.extend({
  status: z.enum(leadStatusKeys),
  category: z.literal('lead'),
  isNew: z.boolean().default(false),
  isContacted: z.boolean().default(false),
  isQualified: z.boolean().default(false),
  isUnqualified: z.boolean().default(false),
  isConverted: z.boolean().default(false),
  isLost: z.boolean().default(false),
});

export const LeadStatusEnumSchema = z.enum(leadStatusKeys);
