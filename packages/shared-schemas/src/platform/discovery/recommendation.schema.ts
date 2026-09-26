/**
 * Recommendation Core Schema
 * @module shared-schemas/platform/discovery
 *
 * Recommendation entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { RecommendationTypeSchema } from './recommendation-type.schema';
import { RecommendationStrategySchema } from './recommendation-strategy.schema';

export const RecommendationContextSchema = z.object({
  sourceProductId: z.string().min(1).optional(),
  sourceCategoryId: z.string().min(1).optional(),
  sourceBrandId: z.string().min(1).optional(),
  cartItems: z.array(z.string().min(1)).max(100).optional(),
  lastViewedAt: z.string().datetime().optional(),
});

export const RecommendationItemSchema = z.object({
  productId: z.string().min(1),
  score: z.number(),
  rank: z.number().int().positive(),
  reason: z.string().max(200).optional(),
  strategy: RecommendationStrategySchema.optional(),
});

export const RecommendationRequestSchema = z.object({
  userId: UuidSchema.optional(),
  sessionId: z.string().max(128).optional(),
  type: RecommendationTypeSchema,
  context: RecommendationContextSchema.optional(),
  limit: z.number().int().min(1).max(50).optional(),
  excludePurchased: z.boolean().optional(),
});

export const RecommendationResultSchema = z.object({
  items: z.array(RecommendationItemSchema).max(50),
  total: z.number().int().nonnegative(),
  strategy: RecommendationStrategySchema,
  took: z.number().nonnegative(),
  cached: z.boolean(),
});

export const RecommendationSchema = BaseEntitySchema.extend({
  userId: UuidSchema.optional(),
  sessionId: z.string().max(128).optional(),
  type: RecommendationTypeSchema,
  strategy: RecommendationStrategySchema,
  items: z.array(RecommendationItemSchema).max(50),
  context: RecommendationContextSchema.optional(),
  generatedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  score: z.number().optional(),
});

export const RecommendationPublicSchema = RecommendationSchema.pick({
  id: true,
  type: true,
  items: true,
  generatedAt: true,
});

export const RecommendationUsageSchema = z.object({
  recommendationId: z.string().min(1),
  userId: UuidSchema.optional(),
  itemCount: z.number().int().nonnegative(),
  generatedAt: z.string().datetime(),
  servedCount: z.number().int().nonnegative(),
  clickedCount: z.number().int().nonnegative(),
  convertedCount: z.number().int().nonnegative(),
});

export type RecommendationContextSchemaType = z.infer<typeof RecommendationContextSchema>;
export type RecommendationItemSchemaType = z.infer<typeof RecommendationItemSchema>;
export type RecommendationRequestSchemaType = z.infer<typeof RecommendationRequestSchema>;
export type RecommendationResultSchemaType = z.infer<typeof RecommendationResultSchema>;
export type RecommendationSchemaType = z.infer<typeof RecommendationSchema>;
export type RecommendationPublicSchemaType = z.infer<typeof RecommendationPublicSchema>;
export type RecommendationUsageSchemaType = z.infer<typeof RecommendationUsageSchema>;
