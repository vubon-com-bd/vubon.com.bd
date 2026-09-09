import { BaseEntity } from '../common/base.types';
import { AI_FORECAST } from '@vubon/shared-constants/src/ai/ai-forecast.constants';
import { AI } from './ai.types';

export interface AIForecast extends BaseEntity {
  forecastId: string;
  aiId: string;
  ai: AI;
  type: keyof typeof AI_FORECAST.TYPES | string;
  model: keyof typeof AI_FORECAST.FORECAST_MODELS | string;
  timeFrame: keyof typeof AI_FORECAST.TIME_FRAMES | string;
  value: number;
  confidenceLower: number;
  confidenceUpper: number;
  confidenceInterval: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
