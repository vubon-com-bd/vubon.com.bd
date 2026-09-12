import { BaseEntity } from '../common/base.types';
import { AI_MODEL } from '@vubon/shared-constants/src/ai/ai-model.constants';
import { AIModelType } from './ai-model-type.types';
import { AIModelProvider } from './ai-model-provider.types';
import { AIFeature } from './ai-feature.types';
import { AI } from './ai.types';

export interface AIModelMetadata {
  description?: string;
  tags: string[];
  hyperparameters: Record<string, unknown>;
  evaluationMetrics: Record<string, number>;
  limitations: string[];
  useCases: string[];
}

export interface AIModel extends BaseEntity {
  modelId: string;
  aiId: string;
  ai: AI;
  name: string;
  version: string;
  type: AIModelType;
  status: keyof typeof AI_MODEL.STATUS | string;
  provider: AIModelProvider;
  features: AIFeature[];
  modelSize: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingDataSize: number;
  trainingTime: number;
  isActive: boolean;
  isDeployed: boolean;
  isDeprecated: boolean;
  deployedAt?: Date;
  deprecatedAt?: Date;
  metadata: AIModelMetadata;
}
