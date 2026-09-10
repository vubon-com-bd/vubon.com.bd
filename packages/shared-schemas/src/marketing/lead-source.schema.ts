import { z } from 'zod';
import { LEAD_SOURCE } from '@vubon/shared-constants/src/marketing/lead-source.constants';

const leadSourceTypeKeys = Object.keys(LEAD_SOURCE.TYPES) as [string, ...string[]];

export const LeadSourceSchema = z.object({
  source: z.enum(leadSourceTypeKeys),
  category: z.literal('lead_source'),
  isWebsite: z.boolean().default(false),
  isSocialMedia: z.boolean().default(false),
  isEmail: z.boolean().default(false),
  isReferral: z.boolean().default(false),
  isOrganic: z.boolean().default(false),
  isPaid: z.boolean().default(false),
  isDirect: z.boolean().default(false),
  isEvent: z.boolean().default(false),
  isPartner: z.boolean().default(false),
  isOther: z.boolean().default(false),
});

export const LeadSourceEnumSchema = z.enum(leadSourceTypeKeys);
