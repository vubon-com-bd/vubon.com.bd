/**
 * Affiliate Commission Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/affiliate.constants থেকে।
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { MoneySchema } from '../common/primitives/money.schema';
import { AFFILIATE } from '@vubon/shared-constants/marketing';
import { AffiliateCommissionTypeSchema } from './affiliate-status.schema';

export const AffiliateCommissionSchema = z.object({
  affiliateId: UuidSchema,
  type: AffiliateCommissionTypeSchema,
  percent: z
    .number()
    .min(AFFILIATE.MIN_COMMISSION_PERCENT)
    .max(AFFILIATE.MAX_COMMISSION_PERCENT)
    .optional(),
  fixedAmount: MoneySchema.optional(),
  currency: z.string().length(3),
  tier: z.string().max(50).optional(),
  isActive: z.boolean(),
  updatedAt: z.string().datetime(),
});

export const AffiliateCommissionTierSchema = z.object({
  tier: z.string().min(1).max(50),
  minSales: z.number().nonnegative(),
  maxSales: z.number().nonnegative().nullable(),
  percent: z.number().min(0).max(100),
});

export type AffiliateCommissionSchemaType = z.infer<typeof AffiliateCommissionSchema>;
export type AffiliateCommissionTierSchemaType = z.infer<typeof AffiliateCommissionTierSchema>;
