export const VENDOR_PERFORMANCE_METRIC = {
  ORDER_FULFILLMENT_RATE: 'order_fulfillment_rate',
  ON_TIME_SHIPPING_RATE: 'on_time_shipping_rate',
  ORDER_CANCELLATION_RATE: 'order_cancellation_rate',
  RETURN_RATE: 'return_rate',
  CUSTOMER_SATISFACTION: 'customer_satisfaction',
  RESPONSE_TIME: 'response_time',
  RESOLUTION_TIME: 'resolution_time',
} as const;

export const VENDOR_PERFORMANCE_GRADE = {
  A_PLUS: 'a_plus',
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  F: 'f',
} as const;

export const VENDOR_PERFORMANCE = {
  EVALUATION_PERIOD_DAYS: 30,
  MIN_ORDERS_FOR_EVALUATION: 10,
  A_PLUS_THRESHOLD: 95,
  A_THRESHOLD: 90,
  B_THRESHOLD: 80,
  C_THRESHOLD: 70,
  D_THRESHOLD: 60,
  AUTO_SUSPEND_BELOW: 40,
  WARNING_BELOW: 60,
} as const;

export type VendorPerformanceMetricType =
  (typeof VENDOR_PERFORMANCE_METRIC)[keyof typeof VENDOR_PERFORMANCE_METRIC];
export type VendorPerformanceGradeType =
  (typeof VENDOR_PERFORMANCE_GRADE)[keyof typeof VENDOR_PERFORMANCE_GRADE];
