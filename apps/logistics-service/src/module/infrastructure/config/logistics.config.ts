import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const LOGISTICS_CONFIG = Object.freeze({
  maxShipmentsPerUser: getOptionalEnvInt('LOGISTICS_MAX_SHIPMENTS_PER_USER', 100),
  maxDeliveryAttempts: getOptionalEnvInt('LOGISTICS_MAX_DELIVERY_ATTEMPTS', 3),
  returnWindowDays: getOptionalEnvInt('LOGISTICS_RETURN_WINDOW_DAYS', 7),
  autoAssignCourier: getOptionalEnv('LOGISTICS_AUTO_ASSIGN_COURIER', 'true') === 'true',
});
