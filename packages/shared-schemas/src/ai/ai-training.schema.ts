/**
 * AI Training Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-training.constants থেকে।
 */

import { z } from 'zod';
import { AI_TRAINING_STATUS, AI_TRAINING_TYPE } from '@vubon/shared-constants/ai';
import { BaseEntitySchema } from '../common/base/base-entity.schema';

export const AiTrainingStatusSchema = z.enum(
  Object.values(AI_TRAINING_STATUS) as [string, ...string[]]
);

export const AiTrainingTypeSchema = z.enum(
  Object.values(AI_TRAINING_TYPE) as [string, ...string[]]
);

export const AiTrainingCheckpointSchema = z.object({
  step: z.number().int().nonnegative(),
  loss: z.number(),
  createdAt: z.string().datetime(),
  url: z.string().url().optional(),
});

export const AiTrainingMetricsSchema = z.object({
  trainLoss: z.number(),
  validationLoss: z.number().optional(),
  trainAccuracy: z.number().min(0).max(1).optional(),
  validationAccuracy: z.number().min(0).max(1).optional(),
  f1Score: z.number().min(0).max(1).optional(),
  precision: z.number().min(0).max(1).optional(),
  recall: z.number().min(0).max(1).optional(),
});

export const AiTrainingSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  type: AiTrainingTypeSchema,
  status: AiTrainingStatusSchema,
  baseModel: z.string().min(1).max(100),
  datasetUrl: z.string().url().optional(),
  datasetSize: z.number().int().nonnegative().optional(),
  epochs: z.number().int().positive().max(100),
  completedEpochs: z.number().int().nonnegative().optional(),
  batchSize: z.number().int().positive().max(512),
  learningRate: z.number().positive().max(1),
  validationSplit: z.number().min(0).max(1),
  testSplit: z.number().min(0).max(1).optional(),
  checkpoints: z.array(AiTrainingCheckpointSchema).max(100),
  metrics: AiTrainingMetricsSchema.optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  error: z.string().max(2000).optional(),
  durationMs: z.number().int().nonnegative().optional(),
  createdBy: z.string().min(1),
});

export const AiTrainingRequestSchema = z.object({
  name: z.string().trim().min(1).max(150),
  type: AiTrainingTypeSchema,
  baseModel: z.string().min(1).max(100),
  datasetUrl: z.string().url().optional(),
  epochs: z.number().int().min(1).max(100).optional(),
  batchSize: z.number().int().min(1).max(512).optional(),
  learningRate: z.number().positive().max(1).optional(),
});

export type AiTrainingStatusSchemaType = z.infer<typeof AiTrainingStatusSchema>;
export type AiTrainingTypeSchemaType = z.infer<typeof AiTrainingTypeSchema>;
export type AiTrainingSchemaType = z.infer<typeof AiTrainingSchema>;
export type AiTrainingRequestSchemaType = z.infer<typeof AiTrainingRequestSchema>;
