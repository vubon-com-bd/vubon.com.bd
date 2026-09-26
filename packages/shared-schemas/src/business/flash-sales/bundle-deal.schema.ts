/**
 * Bundle Deal Schema
 * @module shared-schemas/business/flash-sales
 *
 * Values আসে shared-constants/business/bundle-deal.constants থেকে।
 */

import { z } from 'zod';
import { BUNDLE_DEAL_STATUS, BUNDLE_DEAL_TYPE } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';

export const BundleDealStatusSchema = z.enum(
  Object.values(BUNDLE_DEAL_STATUS) as [string, ...string[]]
);

export const BundleDealTypeSchema = z.enum(
  Object.values(BUNDLE_DEAL_TYPE) as [string, ...string[]]
);

export const BundleDealSchema = z.object({
  id: UuidSchema,
  dealId: UuidSchema,
  name: z.string().min(1).max(150),
  status: BundleDealStatusSchema,
  type: BundleDealTypeSchema,
  productIds: z.array(UuidSchema).min(2).max(20),
  itemCount: z.number().int().min(2).max(20),
  originalTotal: PositiveMoneySchema,
  bundlePrice: PositiveMoneySchema,
  discountAmount: PositiveMoneySchema,
  discountPercent: z.number().min(0).max(100),
  currency: z.string().length(3),
  minItems: z.number().int().min(2).max(20),
  maxItems: z.number().int().min(2).max(20),
  perUserLimit: z.number().int().positive().max(100),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
});

export const BundleDealPublicSchema = BundleDealSchema.pick({
  id: true,
  name: true,
  type: true,
  itemCount: true,
  bundlePrice: true,
  discountPercent: true,
  currency: true,
});

export type BundleDealStatusSchemaType = z.infer<typeof BundleDealStatusSchema>;
export type BundleDealTypeSchemaType = z.infer<typeof BundleDealTypeSchema>;
export type BundleDealSchemaType = z.infer<typeof BundleDealSchema>;
export type BundleDealPublicSchemaType = z.infer<typeof BundleDealPublicSchema>;
