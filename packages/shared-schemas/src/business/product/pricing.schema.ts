/**
 * Pricing Schema
 * @module shared-schemas/business/product
 *
 * Values আসে shared-constants/business/pricing.constants থেকে।
 */

import { z } from 'zod';
import { PRICING_TYPE, COST_TYPE } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema, PositiveMoneySchema } from '../../common/primitives/money.schema';

export const PricingTypeSchema = z.enum(Object.values(PRICING_TYPE) as [string, ...string[]]);

export const CostTypeSchema = z.enum(Object.values(COST_TYPE) as [string, ...string[]]);

export const PricingSchema = z.object({
  productId: UuidSchema,
  variantId: UuidSchema.optional(),
  type: PricingTypeSchema,
  basePrice: PositiveMoneySchema,
  sellingPrice: PositiveMoneySchema,
  compareAtPrice: MoneySchema.optional(),
  costPrice: MoneySchema.optional(),
  wholesalePrice: MoneySchema.optional(),
  msrp: MoneySchema.optional(),
  currency: z.string().length(3),
  taxInclusive: z.boolean(),
  discountPercent: z.number().min(0).max(100).optional(),
  discountAmount: MoneySchema.optional(),
  effectiveFrom: z.string().datetime().optional(),
  effectiveTo: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
});

export const PriceTierSchema = z.object({
  minQuantity: z.number().int().positive(),
  maxQuantity: z.number().int().positive().optional(),
  unitPrice: PositiveMoneySchema,
  discountPercent: z.number().min(0).max(100).optional(),
});

export const PricingRuleSchema = z.object({
  id: UuidSchema,
  name: z.string().min(1).max(150),
  type: PricingTypeSchema,
  conditions: z.record(z.string(), z.unknown()),
  priceAdjustment: z.number(),
  isActive: z.boolean(),
});

export type PricingTypeSchemaType = z.infer<typeof PricingTypeSchema>;
export type CostTypeSchemaType = z.infer<typeof CostTypeSchema>;
export type PricingSchemaType = z.infer<typeof PricingSchema>;
export type PriceTierSchemaType = z.infer<typeof PriceTierSchema>;
export type PricingRuleSchemaType = z.infer<typeof PricingRuleSchema>;
