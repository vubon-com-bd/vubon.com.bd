import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { AIModelSchema } from './ai-model.schema';
import { AIRecommendationSchema } from './ai-recommendation.schema';
import { AIPersonalizationSchema } from './ai-personalization.schema';
import { AISearchSchema } from './ai-search.schema';
import { AIRankingSchema } from './ai-ranking.schema';
import { AIAnalyticsSchema } from './ai-analytics.schema';
import { AITrainingSchema } from './ai-training.schema';
import { AIFeatureSchema } from './ai-feature.schema';
import { AIForecastSchema } from './ai-forecast.schema';
import { AIInsightSchema } from './ai-insight.schema';
import { AI } from '@vubon/shared-constants/src/ai/ai.constants';

const aiStatusKeys = Object.keys(AI.STATUS) as [string, ...string[]];
const aiTypeKeys = Object.keys(AI.AI_TYPES) as [string, ...string[]];

export const AISchema = BaseSchema.extend({
  aiId: z.string().uuid(),
  models: z.array(AIModelSchema),
  recommendations: z.array(AIRecommendationSchema),
  personalizations: z.array(AIPersonalizationSchema),
  searches: z.array(AISearchSchema),
  rankings: z.array(AIRankingSchema),
  analytics: z.array(AIAnalyticsSchema),
  trainings: z.array(AITrainingSchema),
  features: z.array(AIFeatureSchema),
  forecasts: z.array(AIForecastSchema),
  insights: z.array(AIInsightSchema),
  userId: z.string().uuid().optional(),
  user: UserSchema.optional(),
  status: z.enum(aiStatusKeys),
  type: z.enum(aiTypeKeys),
  isActive: z.boolean().default(true),
  metadata: z.object({
    version: z.string(),
    environment: z.string(),
    config: z.record(z.unknown()),
    metrics: z.object({
      totalPredictions: z.number().int().min(0),
      accuracy: z.number().min(0).max(1),
      precision: z.number().min(0).max(1),
      recall: z.number().min(0).max(1),
      f1Score: z.number().min(0).max(1),
      latency: z.number().min(0),
      uptime: z.number().min(0).max(100),
    }),
  }),
});

export const AICreateSchema = AISchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const AIUpdateSchema = AICreateSchema.partial();
