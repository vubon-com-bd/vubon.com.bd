import { z } from 'zod';
import { FilterSchema } from '../../common/filter.schema';
import { ANALYTICS_FILTER } from '@vubon/shared-constants/src/platform/analytics/analytics-filter.constants';

const analyticsFilterTypeKeys = Object.keys(ANALYTICS_FILTER.TYPES) as [string, ...string[]];
const analyticsFilterOperatorKeys = Object.keys(ANALYTICS_FILTER.FILTER_OPERATORS) as [
  string,
  ...string[],
];

export const AnalyticsFilterSchema = FilterSchema.extend({
  filterId: z.string().uuid(),
  analyticsId: z.string().uuid(),
  type: z.enum(analyticsFilterTypeKeys),
  operator: z.enum(analyticsFilterOperatorKeys),
  field: z.string(),
  value: z.unknown(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
