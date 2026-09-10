import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_INSIGHT } from '@vubon/shared-constants/src/ai/ai-insight.constants';
import { AIAnalyticsSchema } from './ai-analytics.schema';
import { AIForecastSchema } from './ai-forecast.schema';

const aiInsightTypeKeys = Object.keys(AI_INSIGHT.TYPES) as [string, ...string[]];
const insightPriorityKeys = Object.keys(AI_INSIGHT.INSIGHT_PRIORITY) as [string, ...string[]];

export const AIInsightSchema = BaseSchema.extend({
  insightId: z.string().uuid(),
  aiId: z.string().uuid(),
  type: z.enum(aiInsightTypeKeys),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  priority: z.enum(insightPriorityKeys),
  confidence: z.number().min(0).max(1),
  analytics: z.array(AIAnalyticsSchema),
  forecasts: z.array(AIForecastSchema),
  recommendations: z.array(z.string()),
  isActive: z.boolean().default(true),
  isActioned: z.boolean().default(false),
  actionedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
