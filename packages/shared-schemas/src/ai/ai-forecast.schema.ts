import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_FORECAST } from '@vubon/shared-constants/src/ai/ai-forecast.constants';

const aiForecastTypeKeys = Object.keys(AI_FORECAST.TYPES) as [string, ...string[]];
const forecastModelKeys = Object.keys(AI_FORECAST.FORECAST_MODELS) as [string, ...string[]];
const timeFrameKeys = Object.keys(AI_FORECAST.TIME_FRAMES) as [string, ...string[]];

export const AIForecastSchema = BaseSchema.extend({
  forecastId: z.string().uuid(),
  aiId: z.string().uuid(),
  type: z.enum(aiForecastTypeKeys),
  model: z.enum(forecastModelKeys),
  timeFrame: z.enum(timeFrameKeys),
  value: z.number(),
  confidenceLower: z.number(),
  confidenceUpper: z.number(),
  confidenceInterval: z.number().min(0).max(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
