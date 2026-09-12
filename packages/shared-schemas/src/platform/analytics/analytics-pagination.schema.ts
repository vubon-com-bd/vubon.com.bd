import { z } from 'zod';
import { PaginationSchema } from '../../common/pagination.schema';
import { ANALYTICS_PAGINATION } from '@vubon/shared-constants/src/platform/analytics/analytics-pagination.constants';

const analyticsPaginationTypeKeys = Object.keys(ANALYTICS_PAGINATION.TYPES) as [
  string,
  ...string[],
];

export const AnalyticsPaginationSchema = PaginationSchema.extend({
  paginationId: z.string().uuid(),
  analyticsId: z.string().uuid(),
  type: z.enum(analyticsPaginationTypeKeys),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  cursor: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
