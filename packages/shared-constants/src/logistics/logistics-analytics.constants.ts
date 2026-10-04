export const LOGISTICS_ANALYTICS_METRIC = {
  SHIPMENTS_CREATED: 'shipments_created',
  SHIPMENTS_DELIVERED: 'shipments_delivered',
  SHIPMENTS_IN_TRANSIT: 'shipments_in_transit',
  SHIPMENTS_FAILED: 'shipments_failed',
  ON_TIME_DELIVERY_RATE: 'on_time_delivery_rate',
  AVG_DELIVERY_TIME: 'avg_delivery_time',
  AVG_TRANSIT_TIME: 'avg_transit_time',
  FIRST_ATTEMPT_SUCCESS_RATE: 'first_attempt_success_rate',
  RETURN_RATE: 'return_rate',
  DAMAGE_RATE: 'damage_rate',
  LOSS_RATE: 'loss_rate',
  COST_PER_SHIPMENT: 'cost_per_shipment',
  COST_PER_KM: 'cost_per_km',
  FUEL_EFFICIENCY: 'fuel_efficiency',
  VEHICLE_UTILIZATION: 'vehicle_utilization',
  DRIVER_UTILIZATION: 'driver_utilization',
  ROUTE_EFFICIENCY: 'route_efficiency',
  WAREHOUSE_UTILIZATION: 'warehouse_utilization',
  COD_COLLECTION_RATE: 'cod_collection_rate',
} as const;

export const LOGISTICS_ANALYTICS_PERIOD = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_QUARTER: 'this_quarter',
  THIS_YEAR: 'this_year',
  CUSTOM: 'custom',
} as const;

export const LOGISTICS_ANALYTICS = {
  METRIC: LOGISTICS_ANALYTICS_METRIC,
  PERIOD: LOGISTICS_ANALYTICS_PERIOD,
  RETENTION_DAYS: 730,
  REFRESH_INTERVAL_SECONDS: 300,
  TRACK_DELIVERY: true,
  TRACK_COST: true,
  TRACK_PERFORMANCE: true,
  TRACK_UTILIZATION: true,
  TRACK_EXCEPTIONS: true,
  ANONYMIZE_DATA: true,
  MAX_DATE_RANGE_DAYS: 730,
} as const;

export type LogisticsAnalyticsMetricType =
  (typeof LOGISTICS_ANALYTICS_METRIC)[keyof typeof LOGISTICS_ANALYTICS_METRIC];
export type LogisticsAnalyticsPeriodType =
  (typeof LOGISTICS_ANALYTICS_PERIOD)[keyof typeof LOGISTICS_ANALYTICS_PERIOD];
