/**
 * Queue Schema
 * @module shared-schemas/infrastructure
 *
 * Values আসে shared-constants/infrastructure/queue.constants থেকে।
 */

import { z } from 'zod';
import { QUEUE_NAME, QUEUE_PRIORITY, QUEUE_STATUS } from '@vubon/shared-constants/infrastructure';

export const QueueNameSchema = z.enum(Object.values(QUEUE_NAME) as [string, ...string[]]);

export const QueuePrioritySchema = z
  .number()
  .int()
  .min(QUEUE_PRIORITY.CRITICAL)
  .max(QUEUE_PRIORITY.BACKGROUND);

export const QueueStatusSchema = z.enum(Object.values(QUEUE_STATUS) as [string, ...string[]]);

export const QueueJobSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  queue: QueueNameSchema,
  payload: z.unknown(),
  priority: QueuePrioritySchema,
  status: QueueStatusSchema,
  attempts: z.number().int().nonnegative(),
  maxAttempts: z.number().int().positive(),
  createdAt: z.string().datetime(),
  processedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  error: z.string().optional(),
});

export const QueueOptionsSchema = z.object({
  priority: QueuePrioritySchema.optional(),
  delayMs: z.number().int().nonnegative().optional(),
  attempts: z.number().int().positive().max(10).optional(),
  backoffMs: z.number().int().nonnegative().optional(),
  jobId: z.string().min(1).max(128).optional(),
  removeOnComplete: z.boolean().optional(),
  removeOnFail: z.boolean().optional(),
});

export const QueueMetricsSchema = z.object({
  queue: QueueNameSchema,
  waiting: z.number().int().nonnegative(),
  active: z.number().int().nonnegative(),
  completed: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  delayed: z.number().int().nonnegative(),
  paused: z.boolean(),
});

export type QueueNameSchemaType = z.infer<typeof QueueNameSchema>;
export type QueuePrioritySchemaType = z.infer<typeof QueuePrioritySchema>;
export type QueueStatusSchemaType = z.infer<typeof QueueStatusSchema>;
export type QueueJobSchemaType = z.infer<typeof QueueJobSchema>;
export type QueueOptionsSchemaType = z.infer<typeof QueueOptionsSchema>;
export type QueueMetricsSchemaType = z.infer<typeof QueueMetricsSchema>;
