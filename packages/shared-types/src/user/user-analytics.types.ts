import { BaseEntity } from '../common/base.types';
import { METRICS } from '@vubon/shared-constants/src/common/types.constants';
import { UserPublic } from './user.types';

/**
 * Metric name value type
 */
export type MetricName = (typeof METRICS)[keyof typeof METRICS];

/**
 * Business user analytics interface
 */
export interface BusinessUserAnalytics extends BaseEntity {
  analyticsId: string;
  userId: string;
  /** Public-safe user reference */
  user: UserPublic;
  metric: MetricName;
  value: number;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
