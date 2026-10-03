/**
 * Infrastructure Error Schema
 * @module shared-schemas/common/errors
 */

import { z } from 'zod';

export const InfrastructureErrorSchema = z.object({
  name: z.literal('InfrastructureError'),
  code: z.string().min(1),
  message: z.string().min(1),
  service: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const DatabaseErrorSchema = InfrastructureErrorSchema.extend({
  service: z.literal('database'),
  operation: z.string().min(1),
  table: z.string().optional(),
});

export const CacheErrorSchema = InfrastructureErrorSchema.extend({
  service: z.literal('cache'),
  key: z.string().optional(),
});

export const QueueErrorSchema = InfrastructureErrorSchema.extend({
  service: z.literal('queue'),
  queueName: z.string().min(1),
  jobId: z.string().optional(),
});

export const ExternalServiceErrorSchema = InfrastructureErrorSchema.extend({
  endpoint: z.string().optional(),
  statusCode: z.number().int().min(100).max(599).optional(),
});

export const TimeoutErrorSchema = InfrastructureErrorSchema.extend({
  timeoutMs: z.number().int().positive(),
});

export type InfrastructureErrorSchemaType = z.infer<typeof InfrastructureErrorSchema>;
export type DatabaseErrorSchemaType = z.infer<typeof DatabaseErrorSchema>;
export type CacheErrorSchemaType = z.infer<typeof CacheErrorSchema>;
export type QueueErrorSchemaType = z.infer<typeof QueueErrorSchema>;
export type ExternalServiceErrorSchemaType = z.infer<typeof ExternalServiceErrorSchema>;
export type TimeoutErrorSchemaType = z.infer<typeof TimeoutErrorSchema>;
