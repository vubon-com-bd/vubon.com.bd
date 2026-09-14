/**
 * Feature Flag Schema
 * @module shared-schemas/common/config
 */

import { z } from 'zod';
import { UuidSchema } from '../primitives/uuid.schema';

export const FeatureFlagSchema = z.object({
  key: z.string().min(1).max(100),
  enabled: z.boolean(),
  description: z.string().max(500).optional(),
  rolloutPercent: z.number().int().min(0).max(100).default(100),
  allowedRoles: z.array(z.string().min(1).max(50)).max(50).optional(),
  allowedUserIds: z.array(UuidSchema).max(1000).optional(),
  allowedEnvironments: z.array(z.string().min(1).max(50)).max(10).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const FeatureFlagOverrideSchema = z.object({
  flagKey: z.string().min(1).max(100),
  userId: UuidSchema,
  enabled: z.boolean(),
  reason: z.string().max(500).optional(),
  expiresAt: z.string().datetime().optional(),
});

export const FeatureFlagEvaluationSchema = z.object({
  flagKey: z.string().min(1),
  enabled: z.boolean(),
  reason: z.string().min(1),
  evaluatedAt: z.string().datetime(),
});

export type FeatureFlagSchemaType = z.infer<typeof FeatureFlagSchema>;
export type FeatureFlagOverrideSchemaType = z.infer<typeof FeatureFlagOverrideSchema>;
export type FeatureFlagEvaluationSchemaType = z.infer<typeof FeatureFlagEvaluationSchema>;
