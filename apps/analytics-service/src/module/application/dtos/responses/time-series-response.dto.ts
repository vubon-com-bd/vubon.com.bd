import { z } from 'zod';

export const TimeSeriesPointSchema = z.object({
  bucketMs: z.number().int().nonnegative(),
  value: z.number(),
});

export const TimeSeriesResponseSchema = z.object({
  metricName: z.string(),
  interval: z.string(),
  points: z.array(TimeSeriesPointSchema),
  sum: z.number(),
  avg: z.number(),
  min: z.number(),
  max: z.number(),
  pointCount: z.number().int().nonnegative(),
});

export type TimeSeriesResponseDTO = z.infer<typeof TimeSeriesResponseSchema>;

export interface TimeSeriesPoint {
  readonly bucketMs: number;
  readonly value: number;
}

/**
 * Business logic: computes summary statistics from series.
 */
export function toTimeSeriesResponse(
  metricName: string,
  interval: string,
  points: readonly TimeSeriesPoint[],
): TimeSeriesResponseDTO {
  const values = points.map((p) => p.value);
  const pointCount = values.length;
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = pointCount === 0 ? 0 : sum / pointCount;
  const min = pointCount === 0 ? 0 : Math.min(...values);
  const max = pointCount === 0 ? 0 : Math.max(...values);

  return {
    metricName,
    interval,
    points: [...points],
    sum,
    avg,
    min,
    max,
    pointCount,
  };
}
