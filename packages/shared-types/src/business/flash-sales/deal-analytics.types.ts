import { BaseEntity } from '../../common/base.types';
import { DEAL_ANALYTICS } from '@vubon/shared-constants/src/business/flash-sales/deal-analytics.constants';
import { Deal } from './deal.types';

export interface DealAnalytics extends BaseEntity {
  analyticsId: string;
  dealId: string;
  deal: Deal;
  type: keyof typeof DEAL_ANALYTICS.TYPES | string;
  metric: keyof typeof DEAL_ANALYTICS.METRICS | string;
  value: number;
  period: keyof typeof DEAL_ANALYTICS.ANALYTICS_GRANULARITY | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
