/**
 * Frequently Bought Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/frequently-bought.constants থেকে।
 */

import { z } from 'zod';
import { FREQUENTLY_BOUGHT_TYPE } from '@vubon/shared-constants/platform';

export const FrequentlyBoughtTypeSchema = z.enum(
  Object.values(FREQUENTLY_BOUGHT_TYPE) as [string, ...string[]]
);

export const FrequentlyBoughtItemSchema = z.object({
  productId: z.string().min(1),
  coOccurrences: z.number().int().nonnegative(),
  confidence: z.number().min(0).max(1),
  lift: z.number().nonnegative(),
  support: z.number().min(0).max(1),
});

export const FrequentlyBoughtResultSchema = z.object({
  sourceProductId: z.string().min(1),
  type: FrequentlyBoughtTypeSchema,
  items: z.array(FrequentlyBoughtItemSchema).max(10),
  lookbackDays: z.number().int().positive(),
  generatedAt: z.string().datetime(),
});

export type FrequentlyBoughtTypeSchemaType = z.infer<typeof FrequentlyBoughtTypeSchema>;
export type FrequentlyBoughtItemSchemaType = z.infer<typeof FrequentlyBoughtItemSchema>;
export type FrequentlyBoughtResultSchemaType = z.infer<typeof FrequentlyBoughtResultSchema>;
