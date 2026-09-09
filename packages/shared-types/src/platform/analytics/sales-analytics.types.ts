import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { SALES_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/sales-analytics.constants';

export interface SalesAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof SALES_ANALYTICS.TYPES | string;
  metric: keyof typeof SALES_ANALYTICS.METRICS | string;
  value: number;
  amount: Money;
  period: keyof typeof SALES_ANALYTICS.COMPARISON_PERIODS | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
