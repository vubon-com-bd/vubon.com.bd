import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { USER_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/user-analytics.constants';

export interface UserAnalytics extends BaseEntity {
  analyticsId: string;
  userId: string;
  user: User;
  type: keyof typeof USER_ANALYTICS.TYPES | string;
  metric: keyof typeof USER_ANALYTICS.METRICS | string;
  value: number;
  period: keyof typeof USER_ANALYTICS.RETENTION_PERIODS | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
