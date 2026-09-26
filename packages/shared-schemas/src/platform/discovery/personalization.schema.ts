/**
 * Personalization Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/personalization.constants থেকে।
 */

import { z } from 'zod';
import { PERSONALIZATION_TYPE, PERSONALIZATION_STATUS } from '@vubon/shared-constants/platform';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const PersonalizationTypeSchema = z.enum(
  Object.values(PERSONALIZATION_TYPE) as [string, ...string[]]
);

export const PersonalizationStatusSchema = z.enum(
  Object.values(PERSONALIZATION_STATUS) as [string, ...string[]]
);

export const PersonalizationProfileSchema = z.object({
  userId: UuidSchema,
  type: PersonalizationTypeSchema,
  status: PersonalizationStatusSchema,
  interests: z.array(z.string().max(100)).max(50),
  categories: z.array(z.string().max(100)).max(50),
  brands: z.array(z.string().max(100)).max(50),
  priceRange: z
    .object({
      min: z.number().nonnegative(),
      max: z.number().nonnegative(),
    })
    .optional(),
  interactionCount: z.number().int().nonnegative(),
  lastUpdatedAt: z.string().datetime(),
  confidenceScore: z.number().min(0).max(1),
});

export const PersonalizationSignalSchema = z.object({
  userId: UuidSchema,
  type: z.string().min(1).max(50),
  value: z.unknown(),
  weight: z.number(),
  occurredAt: z.string().datetime(),
});

export type PersonalizationTypeSchemaType = z.infer<typeof PersonalizationTypeSchema>;
export type PersonalizationStatusSchemaType = z.infer<typeof PersonalizationStatusSchema>;
export type PersonalizationProfileSchemaType = z.infer<typeof PersonalizationProfileSchema>;
export type PersonalizationSignalSchemaType = z.infer<typeof PersonalizationSignalSchema>;
