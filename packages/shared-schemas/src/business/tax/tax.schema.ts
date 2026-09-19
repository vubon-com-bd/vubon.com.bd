/**
 * Tax Core Schema
 * @module shared-schemas/business/tax
 *
 * Tax entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { MoneySchema } from '../../common/primitives/money.schema';
import { TaxTypeSchema, TaxCategorySchema } from './tax-type.schema';
import { TaxRateTypeSchema, TaxInclusionSchema } from './tax-rate.schema';

export const TaxStatusSchema = z.enum(['active', 'inactive', 'draft', 'archived', 'expired']);

export const TaxAppliesToSchema = z.enum([
  'product',
  'category',
  'brand',
  'shipping',
  'service',
  'digital',
  'order',
]);

export const TaxRegionSchema = z.enum(['bd', 'in', 'us', 'eu', 'uk', 'ae', 'sa', 'global']);

export const TaxSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  code: z.string().min(1).max(50),
  type: TaxTypeSchema,
  category: TaxCategorySchema,
  status: TaxStatusSchema,
  appliesTo: TaxAppliesToSchema,
  region: TaxRegionSchema,
  rate: z.number().min(0).max(100),
  rateType: TaxRateTypeSchema,
  inclusion: TaxInclusionSchema,
  description: z.string().max(1000).optional(),
  isCompound: z.boolean(),
  priority: z.number().int().min(0).max(100),
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().optional(),
});

export const TaxPublicSchema = TaxSchema.pick({
  id: true,
  name: true,
  code: true,
  type: true,
  rate: true,
  inclusion: true,
  region: true,
});

export const AppliedTaxSchema = z.object({
  taxId: z.string().min(1),
  name: z.string().min(1).max(150),
  rate: z.number().min(0).max(100),
  amount: MoneySchema,
});

export const TaxCalculationResultSchema = z.object({
  taxableAmount: MoneySchema,
  taxAmount: MoneySchema,
  totalAmount: MoneySchema,
  currency: z.string().length(3),
  appliedTaxes: z.array(AppliedTaxSchema).max(20),
});

export type TaxStatusSchemaType = z.infer<typeof TaxStatusSchema>;
export type TaxAppliesToSchemaType = z.infer<typeof TaxAppliesToSchema>;
export type TaxRegionSchemaType = z.infer<typeof TaxRegionSchema>;
export type TaxSchemaType = z.infer<typeof TaxSchema>;
export type TaxPublicSchemaType = z.infer<typeof TaxPublicSchema>;
export type AppliedTaxSchemaType = z.infer<typeof AppliedTaxSchema>;
export type TaxCalculationResultSchemaType = z.infer<typeof TaxCalculationResultSchema>;
