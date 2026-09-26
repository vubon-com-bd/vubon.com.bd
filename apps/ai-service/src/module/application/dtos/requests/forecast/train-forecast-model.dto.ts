import { z } from 'zod';

export const TrainForecastModelSchema = z.object({
  name: z.string().min(1).max(100),
  target: z.string().min(1),
  datasetId: z.string().min(1),
  model: z.enum(['arima', 'prophet', 'lstm', 'transformer']),
});

export type TrainForecastModelRequestDTO = z.infer<typeof TrainForecastModelSchema>;
