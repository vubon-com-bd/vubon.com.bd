/**
 * AI Personalization Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-personalization.constants থেকে।
 */

import { z } from 'zod';
import { AI_PERSONALIZATION_TYPE, AI_PERSONALIZATION_SIGNAL } from '@vubon/shared-constants/ai';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const AiPersonalizationTypeSchema = z.enum(
  Object.values(AI_PERSONALIZATION_TYPE) as [string, ...string[]]
);

export const AiPersonalizationSignalSchema = z.enum(
  Object.values(AI_PERSONALIZATION_SIGNAL) as [string, ...string[]]
);

export const AiPersonalizationSignalItemSchema = z.object({
  signal: AiPersonalizationSignalSchema,
  weight: z.number(),
  targetId: z.string().max(100).optional(),
  occurredAt: z.string().datetime(),
});

export const AiPersonalizationProfileSchema = z.object({
  userId: UuidSchema,
  type: AiPersonalizationTypeSchema,
  interests: z.array(z.string().max(100)).max(50),
  categories: z.array(z.string().max(100)).max(50),
  brands: z.array(z.string().max(100)).max(50),
  signals: z.array(AiPersonalizationSignalItemSchema).max(1000),
  confidence: z.number().min(0).max(1),
  lastUpdatedAt: z.string().datetime(),
});

export const AiPersonalizationUpdateSchema = z.object({
  userId: UuidSchema,
  type: AiPersonalizationTypeSchema.optional(),
  interests: z.array(z.string().max(100)).max(50).optional(),
  categories: z.array(z.string().max(100)).max(50).optional(),
  brands: z.array(z.string().max(100)).max(50).optional(),
});

export type AiPersonalizationTypeSchemaType = z.infer<typeof AiPersonalizationTypeSchema>;
export type AiPersonalizationSignalSchemaType = z.infer<typeof AiPersonalizationSignalSchema>;
export type AiPersonalizationProfileSchemaType = z.infer<typeof AiPersonalizationProfileSchema>;
