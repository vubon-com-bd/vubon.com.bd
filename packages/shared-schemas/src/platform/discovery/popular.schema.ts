import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { POPULAR } from '@vubon/shared-constants/src/platform/discovery/popular.constants';

const popularTypeKeys = Object.keys(POPULAR.TYPES) as [string, ...string[]];
const popularityMetricKeys = Object.keys(POPULAR.POPULARITY_METRICS) as [string, ...string[]];

export const PopularSchema = BaseSchema.extend({
  popularId: z.string().uuid(),
  type: z.enum(popularTypeKeys),
  metric: z.enum(popularityMetricKeys),
  score: z.number().min(0),
  rank: z.number().int().min(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
