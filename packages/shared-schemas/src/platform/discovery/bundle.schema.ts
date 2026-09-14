/**
 * Bundle Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/bundle.constants থেকে।
 */

import { z } from 'zod';
import { BUNDLE_TYPE, BUNDLE_STATUS, BUNDLE_PRICING } from '@vubon/shared-constants/platform';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';

export const BundleTypeSchema = z.enum(Object.values(BUNDLE_TYPE) as [string, ...string[]]);

export const BundleStatusSchema = z.enum(Object.values(BUNDLE_STATUS) as [string, ...string[]]);

export const BundlePricingSchema = z.enum(Object.values(BUNDLE_PRICING) as [string, ...string[]]);

export const DiscoveryBundleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  type: BundleTypeSchema,
  status: BundleStatusSchema,
  pricing: BundlePricingSchema,
  productIds: z.array(z.string().min(1)).min(2).max(20),
  originalTotal: PositiveMoneySchema,
  bundlePrice: PositiveMoneySchema,
  discountPercent: z.number().min(0).max(100),
  currency: z.string().length(3),
  isPersonalized: z.boolean(),
  generatedAt: z.string().datetime(),
});

export const BundleGenerationInputSchema = z.object({
  sourceProductId: z.string().min(1).optional(),
  userId: z.string().min(1).optional(),
  maxItems: z.number().int().min(2).max(20).optional(),
  minDiscountPercent: z.number().min(0).max(100).optional(),
});

export type BundleTypeSchemaType = z.infer<typeof BundleTypeSchema>;
export type BundleStatusSchemaType = z.infer<typeof BundleStatusSchema>;
export type BundlePricingSchemaType = z.infer<typeof BundlePricingSchema>;
export type DiscoveryBundleSchemaType = z.infer<typeof DiscoveryBundleSchema>;
