/**
 * Substitute Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/substitute.constants থেকে।
 */

import { z } from 'zod';
import { SUBSTITUTE_TYPE } from '@vubon/shared-constants/platform';

export const SubstituteTypeSchema = z.enum(Object.values(SUBSTITUTE_TYPE) as [string, ...string[]]);

export const SubstituteItemSchema = z.object({
  productId: z.string().min(1),
  type: SubstituteTypeSchema,
  similarity: z.number().min(0).max(1),
  priceDifference: z.number().optional(),
  ratingDifference: z.number().optional(),
});

export const SubstituteResultSchema = z.object({
  sourceProductId: z.string().min(1),
  items: z.array(SubstituteItemSchema).max(20),
  generatedAt: z.string().datetime(),
});

export type SubstituteTypeSchemaType = z.infer<typeof SubstituteTypeSchema>;
export type SubstituteItemSchemaType = z.infer<typeof SubstituteItemSchema>;
export type SubstituteResultSchemaType = z.infer<typeof SubstituteResultSchema>;
