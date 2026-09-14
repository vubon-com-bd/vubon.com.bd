/**
 * Affiliate Payout Schema
 * @module shared-schemas/marketing
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../common/primitives/money.schema';

export const AffiliatePayoutStatusSchema = z.enum([
  'pending',
  'approved',
  'processing',
  'paid',
  'rejected',
  'failed',
  'on_hold',
]);

export const AffiliatePayoutSchema = BaseEntitySchema.extend({
  affiliateId: UuidSchema,
  status: AffiliatePayoutStatusSchema,
  amount: PositiveMoneySchema,
  currency: z.string().length(3),
  method: z.string().min(1).max(50),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  reference: z.string().max(255).optional(),
  notes: z.string().max(1000).optional(),
  paidAt: z.string().datetime().optional(),
  failureReason: z.string().max(500).optional(),
});

export const AffiliatePayoutPublicSchema = AffiliatePayoutSchema.pick({
  id: true,
  status: true,
  amount: true,
  currency: true,
  paidAt: true,
});

export type AffiliatePayoutStatusSchemaType = z.infer<typeof AffiliatePayoutStatusSchema>;
export type AffiliatePayoutSchemaType = z.infer<typeof AffiliatePayoutSchema>;
export type AffiliatePayoutPublicSchemaType = z.infer<typeof AffiliatePayoutPublicSchema>;
