import { BaseEntity } from '../common/base.types';
import { AI_ANALYTICS } from '@vubon/shared-constants/src/ai/ai-analytics.constants';
import { AI } from './ai.types';

export interface AIAnalytics extends BaseEntity {
  analyticsId: string;
  aiId: string;
  ai: AI;
  type: keyof typeof AI_ANALYTICS.TYPES | string;
  algorithm: keyof typeof AI_ANALYTICS.ANALYTICS_ALGORITHMS | string;
  metric: keyof typeof AI_ANALYTICS.METRICS | string;
  value: number;
  confidence: number;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  timestamp: Date;
  metadata: Record<string, unknown>;
}
