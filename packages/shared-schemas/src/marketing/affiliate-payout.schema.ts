import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { AFFILIATE_PAYOUT } from '@vubon/shared-constants/src/marketing/affiliate-payout.constants';

const affiliatePayoutStatusKeys = Object.keys(AFFILIATE_PAYOUT.STATUS) as [string, ...string[]];
const affiliatePayoutMethodKeys = Object.keys(AFFILIATE_PAYOUT.PAYOUT_METHODS) as [
  string,
  ...string[],
];

export const AffiliatePayoutSchema = BaseSchema.extend({
  payoutId: z.string().uuid(),
  affiliateId: z.string().uuid(),
  status: z.enum(affiliatePayoutStatusKeys),
  method: z.enum(affiliatePayoutMethodKeys),
  amount: MoneySchema,
  fee: MoneySchema,
  netAmount: MoneySchema,
  reference: z.string(),
  description: z.string().optional(),
  requestedAt: z.date(),
  processedAt: z.date().optional(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
