import { BaseEntity } from '../common/base.types';
import { AI_TRAINING } from '@vubon/shared-constants/src/ai/ai-training.constants';
import { AIModel } from './ai-model.types';
import { AI } from './ai.types';

export interface AITraining extends BaseEntity {
  trainingId: string;
  aiId: string;
  ai: AI;
  modelId: string;
  model: AIModel;
  status: keyof typeof AI_TRAINING.STATUS | string;
  type: keyof typeof AI_TRAINING.TYPES | string;
  dataSize: number;
  epochs: number;
  batchSize: number;
  learningRate: number;
  optimizer: string;
  lossFunction: string;
  trainSplit: number;
  validationSplit: number;
  testSplit: number;
  accuracy: number;
  loss: number;
  trainingTime: number;
  startedAt: Date;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
