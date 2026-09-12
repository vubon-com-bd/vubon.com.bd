import { BaseEntity } from '../common/base.types';
import { LOGISTICS_ANALYTICS } from '@vubon/shared-constants/src/logistics/logistics-analytics.constants';
import { Logistics } from './logistics.types';

export interface LogisticsPerformance {
  totalShipments: number;
  onTimeDelivery: number;
  deliverySuccessRate: number;
  averageDeliveryTime: number;
  averageShippingCost: number;
  returnRate: number;
  damageRate: number;
  courierPerformance: Record<string, number>;
}

export interface LogisticsAnalytics extends BaseEntity {
  analyticsId: string;
  logisticsId: string;
  logistics: Logistics;
  type: keyof typeof LOGISTICS_ANALYTICS.TYPES | string;
  metric: keyof typeof LOGISTICS_ANALYTICS.METRICS | string;
  value: number;
  period: keyof typeof LOGISTICS_ANALYTICS.ANALYTICS_GRANULARITY | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
