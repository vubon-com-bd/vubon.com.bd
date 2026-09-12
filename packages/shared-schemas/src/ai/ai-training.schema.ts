import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_TRAINING } from '@vubon/shared-constants/src/ai/ai-training.constants';

const aiTrainingStatusKeys = Object.keys(AI_TRAINING.STATUS) as [string, ...string[]];
const aiTrainingTypeKeys = Object.keys(AI_TRAINING.TYPES) as [string, ...string[]];

export const AITrainingSchema = BaseSchema.extend({
  trainingId: z.string().uuid(),
  aiId: z.string().uuid(),
  modelId: z.string().uuid(),
  status: z.enum(aiTrainingStatusKeys),
  type: z.enum(aiTrainingTypeKeys),
  dataSize: z.number().int().min(0),
  epochs: z.number().int().min(0),
  batchSize: z.number().int().min(1),
  learningRate: z.number().min(0),
  optimizer: z.string(),
  lossFunction: z.string(),
  trainSplit: z.number().min(0).max(1),
  validationSplit: z.number().min(0).max(1),
  testSplit: z.number().min(0).max(1),
  accuracy: z.number().min(0).max(1),
  loss: z.number().min(0),
  trainingTime: z.number().min(0),
  startedAt: z.date(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
