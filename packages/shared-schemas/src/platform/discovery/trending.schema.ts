import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { TRENDING } from '@vubon/shared-constants/src/platform/discovery/trending.constants';

const trendingTypeKeys = Object.keys(TRENDING.TYPES) as [string, ...string[]];
const timeFrameKeys = Object.keys(TRENDING.TIME_FRAMES) as [string, ...string[]];

export const TrendingSchema = BaseSchema.extend({
  trendingId: z.string().uuid(),
  type: z.enum(trendingTypeKeys),
  timeFrame: z.enum(timeFrameKeys),
  score: z.number().min(0),
  rank: z.number().int().min(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
