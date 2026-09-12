import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { AFFILIATE_STATUS } from '@vubon/shared-constants/src/marketing/affiliate-status.constants';

const affiliateStatusKeys = Object.keys(AFFILIATE_STATUS) as [string, ...string[]];

export const AffiliateStatusSchema = StatusSchema.extend({
  status: z.enum(affiliateStatusKeys),
  category: z.literal('affiliate'),
  isPending: z.boolean().default(false),
  isApproved: z.boolean().default(false),
  isRejected: z.boolean().default(false),
  isActive: z.boolean().default(false),
  isInactive: z.boolean().default(false),
  isSuspended: z.boolean().default(false),
  isBanned: z.boolean().default(false),
});

export const AffiliateStatusEnumSchema = z.enum(affiliateStatusKeys);
