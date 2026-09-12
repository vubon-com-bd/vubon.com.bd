import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { METRICS } from '../common/types.constants';
import { SHIPMENT_STATUS } from './shipment-status.constants';
import { DELIVERY_STATUS } from './delivery-status.constants';

export const LOGISTICS_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    SHIPMENT: 'shipment',
    DELIVERY: 'delivery',
    COURIER: 'courier',
    PERFORMANCE: 'performance',
    COST: 'cost',
    TIME: 'time',
  },
  METRICS: {
    ...METRICS,
    TOTAL_SHIPMENTS: 'total_shipments',
    ON_TIME_DELIVERY: 'on_time_delivery',
    DELIVERY_SUCCESS_RATE: 'delivery_success_rate',
    AVERAGE_DELIVERY_TIME: 'average_delivery_time',
    AVERAGE_SHIPPING_COST: 'average_shipping_cost',
    RETURN_RATE: 'return_rate',
    DAMAGE_RATE: 'damage_rate',
    COURIER_PERFORMANCE: 'courier_performance',
  },
  SHIPMENT_STATUS: { ...SHIPMENT_STATUS },
  DELIVERY_STATUS: { ...DELIVERY_STATUS },
  ANALYTICS_GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  PERFORMANCE_THRESHOLDS: {
    EXCELLENT: 95,
    GOOD: 85,
    AVERAGE: 70,
    POOR: 50,
  },
  ANALYSIS_PERIOD_DAYS: 30,
} as const;
