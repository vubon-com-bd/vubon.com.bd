import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { CUSTOMER_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/customer-analytics.constants';

export interface CustomerAnalytics extends BaseEntity {
  analyticsId: string;
  userId: string;
  user: User;
  type: keyof typeof CUSTOMER_ANALYTICS.TYPES | string;
  metric: keyof typeof CUSTOMER_ANALYTICS.METRICS | string;
  value: number;
  segment: keyof typeof CUSTOMER_ANALYTICS.CUSTOMER_SEGMENTS | string;
  rfm: keyof typeof CUSTOMER_ANALYTICS.RFM_ANALYSIS | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
