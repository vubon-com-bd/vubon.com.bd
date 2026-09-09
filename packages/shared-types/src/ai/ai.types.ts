import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { AI } from '@vubon/shared-constants/src/ai/ai.constants';
import { AIModel } from './ai-model.types';
import { AIRecommendation } from './ai-recommendation.types';
import { AIPersonalization } from './ai-personalization.types';
import { AISearch } from './ai-search.types';
import { AIRanking } from './ai-ranking.types';
import { AIAnalytics } from './ai-analytics.types';
import { AITraining } from './ai-training.types';
import { AIFeature } from './ai-feature.types';
import { AIForecast } from './ai-forecast.types';
import { AIInsight } from './ai-insight.types';

export interface AIMetrics {
  totalPredictions: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  latency: number;
  uptime: number;
}

export interface AIMetadata {
  version: string;
  environment: string;
  config: Record<string, unknown>;
  metrics: AIMetrics;
}

export interface AI extends BaseEntity {
  aiId: string;
  models: AIModel[];
  recommendations: AIRecommendation[];
  personalizations: AIPersonalization[];
  searches: AISearch[];
  rankings: AIRanking[];
  analytics: AIAnalytics[];
  trainings: AITraining[];
  features: AIFeature[];
  forecasts: AIForecast[];
  insights: AIInsight[];
  userId?: string;
  user?: User;
  status: keyof typeof AI.STATUS | string;
  type: keyof typeof AI.AI_TYPES | string;
  isActive: boolean;
  metadata: AIMetadata;
}
