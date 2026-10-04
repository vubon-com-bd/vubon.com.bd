/**
 * Tax Rate Schema
 * @module shared-schemas/business/tax
 *
 * Values আসে shared-constants/business/tax-rate.constants থেকে।
 */

import { z } from 'zod';
import { TAX_RATE_TYPE, TAX_INCLUSION, TAX_RATE_LIMIT } from '@vubon/shared-constants/business';

export const TaxRateTypeSchema = z.enum(Object.values(TAX_RATE_TYPE) as [string, ...string[]]);

export const TaxInclusionSchema = z.enum(Object.values(TAX_INCLUSION) as [string, ...string[]]);

export const TaxRateDefinitionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  type: TaxRateTypeSchema,
  rate: z.number().min(TAX_RATE_LIMIT.MIN_RATE).max(TAX_RATE_LIMIT.MAX_RATE),
  inclusion: TaxInclusionSchema,
  region: z.string().min(1).max(20),
  isActive: z.boolean(),
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().optional(),
});

export type TaxRateTypeSchemaType = z.infer<typeof TaxRateTypeSchema>;
export type TaxInclusionSchemaType = z.infer<typeof TaxInclusionSchema>;
export type TaxRateDefinitionSchemaType = z.infer<typeof TaxRateDefinitionSchema>;
