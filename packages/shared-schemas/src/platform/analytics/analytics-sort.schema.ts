import { z } from 'zod';
import { SortSchema } from '../../common/sort.schema';
import { ANALYTICS_SORT } from '@vubon/shared-constants/src/platform/analytics/analytics-sort.constants';

const analyticsSortTypeKeys = Object.keys(ANALYTICS_SORT.TYPES) as [string, ...string[]];
const analyticsSortDirectionKeys = Object.keys(ANALYTICS_SORT.DEFAULT_SORT_DIRECTION) as [
  string,
  ...string[],
];

export const AnalyticsSortSchema = SortSchema.extend({
  sortId: z.string().uuid(),
  analyticsId: z.string().uuid(),
  type: z.enum(analyticsSortTypeKeys),
  field: z.string(),
  direction: z.enum(analyticsSortDirectionKeys),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
