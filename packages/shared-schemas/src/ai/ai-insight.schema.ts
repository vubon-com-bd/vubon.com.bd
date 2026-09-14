/**
 * AI Insight Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-insight.constants থেকে।
 */

import { z } from 'zod';
import {
  AI_INSIGHT_TYPE,
  AI_INSIGHT_PRIORITY,
  AI_INSIGHT_STATUS,
} from '@vubon/shared-constants/ai';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const AiInsightTypeSchema = z.enum(Object.values(AI_INSIGHT_TYPE) as [string, ...string[]]);

export const AiInsightPrioritySchema = z.enum(
  Object.values(AI_INSIGHT_PRIORITY) as [string, ...string[]]
);

export const AiInsightStatusSchema = z.enum(
  Object.values(AI_INSIGHT_STATUS) as [string, ...string[]]
);

export const AiInsightSchema = BaseEntitySchema.extend({
  type: AiInsightTypeSchema,
  priority: AiInsightPrioritySchema,
  status: AiInsightStatusSchema,
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  confidence: z.number().min(0).max(1),
  source: z.string().min(1).max(100),
  metrics: z.record(z.string(), z.number()).optional(),
  recommendations: z.array(z.string().max(500)).max(20).optional(),
  referenceType: z.string().max(50).optional(),
  referenceId: z.string().max(100).optional(),
  actionedBy: UuidSchema.optional(),
  actionedAt: z.string().datetime().optional(),
  dismissedBy: UuidSchema.optional(),
  dismissedAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
});

export const AiInsightPublicSchema = AiInsightSchema.pick({
  id: true,
  type: true,
  priority: true,
  status: true,
  title: true,
  description: true,
  confidence: true,
  createdAt: true,
});

export const AiInsightListFilterSchema = z.object({
  type: AiInsightTypeSchema.optional(),
  priority: AiInsightPrioritySchema.optional(),
  status: AiInsightStatusSchema.optional(),
  minConfidence: z.number().min(0).max(1).optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type AiInsightTypeSchemaType = z.infer<typeof AiInsightTypeSchema>;
export type AiInsightPrioritySchemaType = z.infer<typeof AiInsightPrioritySchema>;
export type AiInsightStatusSchemaType = z.infer<typeof AiInsightStatusSchema>;
export type AiInsightSchemaType = z.infer<typeof AiInsightSchema>;
export type AiInsightPublicSchemaType = z.infer<typeof AiInsightPublicSchema>;
export type AiInsightListFilterSchemaType = z.infer<typeof AiInsightListFilterSchema>;
