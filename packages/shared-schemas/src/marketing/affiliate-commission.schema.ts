import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { AFFILIATE_COMMISSION } from '@vubon/shared-constants/src/marketing/affiliate-commission.constants';

const affiliateCommissionTypeKeys = Object.keys(AFFILIATE_COMMISSION.TYPES) as [
  string,
  ...string[],
];
const affiliateCommissionTierKeys = Object.keys(AFFILIATE_COMMISSION.COMMISSION_TIERS) as [
  string,
  ...string[],
];

export const AffiliateCommissionSchema = BaseSchema.extend({
  commissionId: z.string().uuid(),
  affiliateId: z.string().uuid(),
  type: z.enum(affiliateCommissionTypeKeys),
  rate: z.number().min(0).max(100),
  tier: z.enum(affiliateCommissionTierKeys),
  amount: MoneySchema,
  minAmount: MoneySchema,
  maxAmount: MoneySchema,
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
