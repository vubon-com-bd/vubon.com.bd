import { Pagination } from '../../common/pagination.types';
import { ANALYTICS_PAGINATION } from '@vubon/shared-constants/src/platform/analytics/analytics-pagination.constants';
import { Analytics } from './analytics.types';

export interface AnalyticsPagination extends Pagination {
  paginationId: string;
  analyticsId: string;
  analytics: Analytics;
  type: keyof typeof ANALYTICS_PAGINATION.TYPES | string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  cursor?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
