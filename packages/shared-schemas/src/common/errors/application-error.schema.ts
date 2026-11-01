/**
 * Application Error Schema
 * @module shared-schemas/common/errors
 */

import { z } from 'zod';

export const ApplicationErrorSchema = z.object({
  name: z.literal('ApplicationError'),
  code: z.string().min(1),
  message: z.string().min(1),
  statusCode: z.number().int().min(400).max(599),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UnauthorizedErrorSchema = ApplicationErrorSchema.extend({
  statusCode: z.literal(401),
});

export const ForbiddenErrorSchema = ApplicationErrorSchema.extend({
  statusCode: z.literal(403),
  requiredPermission: z.string().optional(),
});

export const NotFoundErrorSchema = ApplicationErrorSchema.extend({
  statusCode: z.literal(404),
  resource: z.string().min(1),
});

export const ConflictErrorSchema = ApplicationErrorSchema.extend({
  statusCode: z.literal(409),
});

export const RateLimitErrorSchema = ApplicationErrorSchema.extend({
  statusCode: z.literal(429),
  retryAfter: z.number().int().nonnegative(),
});

export type ApplicationErrorSchemaType = z.infer<typeof ApplicationErrorSchema>;
export type UnauthorizedErrorSchemaType = z.infer<typeof UnauthorizedErrorSchema>;
export type ForbiddenErrorSchemaType = z.infer<typeof ForbiddenErrorSchema>;
export type NotFoundErrorSchemaType = z.infer<typeof NotFoundErrorSchema>;
export type ConflictErrorSchemaType = z.infer<typeof ConflictErrorSchema>;
export type RateLimitErrorSchemaType = z.infer<typeof RateLimitErrorSchema>;
