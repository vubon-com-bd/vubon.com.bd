/**
 * Affiliate Core Schema
 * @module shared-schemas/marketing
 *
 * Affiliate entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { EmailSchema } from '../common/primitives/email.schema';

import { AffiliateStatusSchema, AffiliateTypeSchema } from './affiliate-status.schema';
import { AffiliateCommissionSchema } from './affiliate-commission.schema';

export const AffiliateSchema = BaseEntitySchema.extend({
  userId: UuidSchema.optional(),
  name: z.string().min(1).max(200),
  email: EmailSchema,
  type: AffiliateTypeSchema,
  status: AffiliateStatusSchema,
  commission: AffiliateCommissionSchema,
  referralCode: z.string().min(6).max(32),
  website: z.string().url().optional(),
  socialProfiles: z.array(z.string().url()).max(20).optional(),
  country: z.string().length(2).optional(),
  totalEarnings: z.number().nonnegative(),
  totalPayouts: z.number().nonnegative(),
  currency: z.string().length(3),
  approvedBy: UuidSchema.optional(),
  approvedAt: z.string().datetime().optional(),
  joinedAt: z.string().datetime(),
});

export const AffiliatePublicSchema = AffiliateSchema.pick({
  id: true,
  name: true,
  status: true,
  referralCode: true,
  totalEarnings: true,
  currency: true,
});

export const AffiliateSummarySchema = AffiliateSchema.pick({
  id: true,
  name: true,
  email: true,
  type: true,
  status: true,
  totalEarnings: true,
  currency: true,
});

export const AffiliateListFilterSchema = z.object({
  status: AffiliateStatusSchema.optional(),
  type: AffiliateTypeSchema.optional(),
  country: z.string().length(2).optional(),
  search: z.string().max(200).optional(),
});

export const AffiliateStatsSchema = z.object({
  affiliateId: UuidSchema,
  totalClicks: z.number().int().nonnegative(),
  totalConversions: z.number().int().nonnegative(),
  conversionRate: z.number().min(0).max(1),
  totalEarnings: z.number().nonnegative(),
  totalPaid: z.number().nonnegative(),
  pendingPayout: z.number().nonnegative(),
  currency: z.string().length(3),
});

export type AffiliateSchemaType = z.infer<typeof AffiliateSchema>;
export type AffiliatePublicSchemaType = z.infer<typeof AffiliatePublicSchema>;
export type AffiliateSummarySchemaType = z.infer<typeof AffiliateSummarySchema>;
export type AffiliateListFilterSchemaType = z.infer<typeof AffiliateListFilterSchema>;
export type AffiliateStatsSchemaType = z.infer<typeof AffiliateStatsSchema>;
