import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { FINANCIAL_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/financial-analytics.constants';

export interface FinancialAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof FINANCIAL_ANALYTICS.TYPES | string;
  metric: keyof typeof FINANCIAL_ANALYTICS.METRICS | string;
  value: number;
  amount: Money;
  ratio: keyof typeof FINANCIAL_ANALYTICS.FINANCIAL_RATIOS | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
