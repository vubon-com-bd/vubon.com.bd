import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const DELIVERY_CONFIG = Object.freeze({
  defaultDeliveryType: 'standard',
  maxRescheduleCount: getOptionalEnvInt('DELIVERY_MAX_RESCHEDULE', 3),
  trackingUpdateIntervalSeconds: getOptionalEnvInt('DELIVERY_TRACKING_INTERVAL', 300),
  defaultCarrier: 'Vubon Express',
} as const);
