/**
 * Upselling Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/upselling.constants থেকে।
 */

import { z } from 'zod';
import { UPSELL_TYPE } from '@vubon/shared-constants/platform';

export const UpsellTypeSchema = z.enum(Object.values(UPSELL_TYPE) as [string, ...string[]]);

export const UpsellItemSchema = z.object({
  productId: z.string().min(1),
  type: UpsellTypeSchema,
  priceIncrease: z.number(),
  priceIncreasePercent: z.number(),
  reason: z.string().min(1).max(200),
});

export const UpsellResultSchema = z.object({
  sourceProductId: z.string().min(1),
  items: z.array(UpsellItemSchema).max(10),
  generatedAt: z.string().datetime(),
});

export type UpsellTypeSchemaType = z.infer<typeof UpsellTypeSchema>;
export type UpsellItemSchemaType = z.infer<typeof UpsellItemSchema>;
export type UpsellResultSchemaType = z.infer<typeof UpsellResultSchema>;
