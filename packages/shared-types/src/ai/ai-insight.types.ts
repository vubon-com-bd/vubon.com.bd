import { BaseEntity } from '../common/base.types';
import { AI_INSIGHT } from '@vubon/shared-constants/src/ai/ai-insight.constants';
import { AIAnalytics } from './ai-analytics.types';
import { AIForecast } from './ai-forecast.types';
import { AI } from './ai.types';

export interface AIInsight extends BaseEntity {
  insightId: string;
  aiId: string;
  ai: AI;
  type: keyof typeof AI_INSIGHT.TYPES | string;
  title: string;
  description: string;
  priority: keyof typeof AI_INSIGHT.INSIGHT_PRIORITY | string;
  confidence: number;
  analytics: AIAnalytics[];
  forecasts: AIForecast[];
  recommendations: string[];
  isActive: boolean;
  isActioned: boolean;
  actionedAt?: Date;
  metadata: Record<string, unknown>;
}
