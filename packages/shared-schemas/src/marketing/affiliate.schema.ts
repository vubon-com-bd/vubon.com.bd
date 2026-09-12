import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { UserSchema } from '../user/user.schema';
import { AffiliateCommissionSchema } from './affiliate-commission.schema';
import { AffiliatePayoutSchema } from './affiliate-payout.schema';
import { AFFILIATE_STATUS } from '@vubon/shared-constants/src/marketing/affiliate-status.constants';

const affiliateStatusKeys = Object.keys(AFFILIATE_STATUS) as [string, ...string[]];

export const AffiliateSchema = BaseSchema.extend({
  affiliateId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  code: z.string().min(3).max(20),
  status: z.enum(affiliateStatusKeys),
  commission: AffiliateCommissionSchema,
  payouts: z.array(AffiliatePayoutSchema),
  totalSales: MoneySchema,
  totalCommission: MoneySchema,
  totalPayout: MoneySchema,
  pendingCommission: MoneySchema,
  clickCount: z.number().int().min(0).default(0),
  conversionCount: z.number().int().min(0).default(0),
  conversionRate: z.number().min(0).max(100).default(0),
  referralCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isApproved: z.boolean().default(false),
  approvedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
