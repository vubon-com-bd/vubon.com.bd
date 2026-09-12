import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { ACQUISITION_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/acquisition-analytics.constants';

export interface AcquisitionAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof ACQUISITION_ANALYTICS.TYPES | string;
  metric: keyof typeof ACQUISITION_ANALYTICS.METRICS | string;
  value: number;
  channel: keyof typeof ACQUISITION_ANALYTICS.ACQUISITION_CHANNELS | string;
  cost: Money;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
