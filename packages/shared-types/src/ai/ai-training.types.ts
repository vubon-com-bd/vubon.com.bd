/**
 * AI Training Types
 * @module shared-types/ai
 *
 * Values আসে shared-constants/ai/ai-training.constants থেকে।
 */

import type { AI_TRAINING_STATUS, AI_TRAINING_TYPE } from '@vubon/shared-constants/ai';
import type { BaseEntity } from '../common/base';
import type { Url } from '../common/primitives';

export type AiTrainingStatusValue = (typeof AI_TRAINING_STATUS)[keyof typeof AI_TRAINING_STATUS];

export type AiTrainingTypeValue = (typeof AI_TRAINING_TYPE)[keyof typeof AI_TRAINING_TYPE];

export interface AiTraining extends BaseEntity<string> {
  readonly name: string;
  readonly type: AiTrainingTypeValue;
  readonly status: AiTrainingStatusValue;
  readonly baseModel: string;
  readonly datasetUrl?: Url;
  readonly datasetSize?: number;
  readonly epochs: number;
  readonly completedEpochs?: number;
  readonly batchSize: number;
  readonly learningRate: number;
  readonly validationSplit: number;
  readonly testSplit?: number;
  readonly checkpoints: readonly AiTrainingCheckpoint[];
  readonly metrics?: AiTrainingMetrics;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly failedAt?: string;
  readonly error?: string;
  readonly durationMs?: number;
  readonly createdBy: string;
}

export interface AiTrainingCheckpoint {
  readonly step: number;
  readonly loss: number;
  readonly createdAt: string;
  readonly url?: Url;
}

export interface AiTrainingMetrics {
  readonly trainLoss: number;
  readonly validationLoss?: number;
  readonly trainAccuracy?: number;
  readonly validationAccuracy?: number;
  readonly f1Score?: number;
  readonly precision?: number;
  readonly recall?: number;
}

export interface AiTrainingRequest {
  readonly name: string;
  readonly type: AiTrainingTypeValue;
  readonly baseModel: string;
  readonly datasetUrl?: string;
  readonly epochs?: number;
  readonly batchSize?: number;
  readonly learningRate?: number;
}
