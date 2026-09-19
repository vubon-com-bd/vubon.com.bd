/**
 * Complementary Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/complementary.constants থেকে।
 */

import { z } from 'zod';
import { COMPLEMENTARY_TYPE } from '@vubon/shared-constants/platform';

export const ComplementaryTypeSchema = z.enum(
  Object.values(COMPLEMENTARY_TYPE) as [string, ...string[]]
);

export const ComplementaryItemSchema = z.object({
  productId: z.string().min(1),
  type: ComplementaryTypeSchema,
  affinity: z.number().min(0).max(1),
  reason: z.string().max(200).optional(),
});

export const ComplementaryResultSchema = z.object({
  sourceProductId: z.string().min(1),
  items: z.array(ComplementaryItemSchema).max(20),
  generatedAt: z.string().datetime(),
});

export type ComplementaryTypeSchemaType = z.infer<typeof ComplementaryTypeSchema>;
export type ComplementaryItemSchemaType = z.infer<typeof ComplementaryItemSchema>;
export type ComplementaryResultSchemaType = z.infer<typeof ComplementaryResultSchema>;
