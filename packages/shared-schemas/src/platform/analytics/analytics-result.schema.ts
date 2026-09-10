import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ANALYTICS_RESULT } from '@vubon/shared-constants/src/platform/analytics/analytics-result.constants';

const analyticsResultTypeKeys = Object.keys(ANALYTICS_RESULT.TYPES) as [string, ...string[]];
const analyticsResultFormatKeys = Object.keys(ANALYTICS_RESULT.RESULT_FORMATS) as [
  string,
  ...string[],
];

export const AnalyticsResultSchema = BaseSchema.extend({
  resultId: z.string().uuid(),
  analyticsId: z.string().uuid(),
  queryId: z.string().uuid(),
  type: z.enum(analyticsResultTypeKeys),
  format: z.enum(analyticsResultFormatKeys),
  data: z.unknown(),
  rowCount: z.number().int().min(0),
  isCached: z.boolean().default(false),
  cachedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
