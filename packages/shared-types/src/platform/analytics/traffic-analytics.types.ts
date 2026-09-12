import { BaseEntity } from '../../common/base.types';
import { TRAFFIC_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/traffic-analytics.constants';

export interface TrafficAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof TRAFFIC_ANALYTICS.TYPES | string;
  metric: keyof typeof TRAFFIC_ANALYTICS.METRICS | string;
  value: number;
  source: keyof typeof TRAFFIC_ANALYTICS.SOURCE_TYPES | string;
  device: keyof typeof TRAFFIC_ANALYTICS.DEVICE_TYPES | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
