/**
 * Cross-Selling Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/cross-selling.constants থেকে।
 */

import { z } from 'zod';
import { CROSS_SELL_TYPE, CROSS_SELL_LOCATION } from '@vubon/shared-constants/platform';

export const CrossSellTypeSchema = z.enum(Object.values(CROSS_SELL_TYPE) as [string, ...string[]]);

export const CrossSellLocationSchema = z.enum(
  Object.values(CROSS_SELL_LOCATION) as [string, ...string[]]
);

export const CrossSellItemSchema = z.object({
  productId: z.string().min(1),
  type: CrossSellTypeSchema,
  affinity: z.number().min(0).max(1),
  reason: z.string().max(200).optional(),
});

export const CrossSellResultSchema = z.object({
  sourceProductId: z.string().min(1),
  location: CrossSellLocationSchema.optional(),
  items: z.array(CrossSellItemSchema).max(20),
  generatedAt: z.string().datetime(),
});

export type CrossSellTypeSchemaType = z.infer<typeof CrossSellTypeSchema>;
export type CrossSellLocationSchemaType = z.infer<typeof CrossSellLocationSchema>;
export type CrossSellItemSchemaType = z.infer<typeof CrossSellItemSchema>;
export type CrossSellResultSchemaType = z.infer<typeof CrossSellResultSchema>;
