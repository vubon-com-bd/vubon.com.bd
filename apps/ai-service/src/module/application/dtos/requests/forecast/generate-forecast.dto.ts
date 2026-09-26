import { z } from 'zod';

export const GenerateForecastSchema = z.object({
  target: z.string().min(1),
  historicalData: z.array(z.object({
    timestamp: z.string().datetime(),
    value: z.number(),
  })).min(3),
  horizonDays: z.number().int().min(1).max(365),
  model: z.enum(['moving_average', 'linear_regression', 'arima', 'prophet']).default('linear_regression'),
  windowSize: z.number().int().min(2).max(100).optional(),
});

export type GenerateForecastRequestDTO = z.infer<typeof GenerateForecastSchema>;
