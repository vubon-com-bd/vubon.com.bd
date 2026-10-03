/**
 * AI Forecast Schema
 * @module shared-schemas/ai
 *
 * Values আসে shared-constants/ai/ai-forecast.constants থেকে।
 */

import { z } from 'zod';
import { AI_FORECAST_TYPE, AI_FORECAST_MODEL } from '@vubon/shared-constants/ai';

export const AiForecastTypeSchema = z.enum(
  Object.values(AI_FORECAST_TYPE) as [string, ...string[]]
);

export const AiForecastModelSchema = z.enum(
  Object.values(AI_FORECAST_MODEL) as [string, ...string[]]
);

export const AiForecastDataPointSchema = z.object({
  timestamp: z.string().datetime(),
  predictedValue: z.number(),
  lowerBound: z.number(),
  upperBound: z.number(),
  actualValue: z.number().optional(),
});

export const AiForecastSchema = z.object({
  id: z.string().min(1),
  type: AiForecastTypeSchema,
  model: AiForecastModelSchema,
  horizonDays: z.number().int().positive().max(365),
  dataPoints: z.array(AiForecastDataPointSchema).max(10000),
  confidenceInterval: z.number().min(0).max(1),
  seasonalityDetected: z.boolean(),
  mape: z.number().nonnegative().optional(),
  mae: z.number().nonnegative().optional(),
  rmse: z.number().nonnegative().optional(),
  generatedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
});

export const AiForecastRequestSchema = z.object({
  type: AiForecastTypeSchema,
  model: AiForecastModelSchema.optional(),
  horizonDays: z.number().int().min(1).max(365),
  historyDays: z.number().int().min(30).max(1095),
  filters: z.record(z.string(), z.unknown()).optional(),
});

export type AiForecastTypeSchemaType = z.infer<typeof AiForecastTypeSchema>;
export type AiForecastModelSchemaType = z.infer<typeof AiForecastModelSchema>;
export type AiForecastSchemaType = z.infer<typeof AiForecastSchema>;
export type AiForecastRequestSchemaType = z.infer<typeof AiForecastRequestSchema>;
