import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SHIPPING_RATE_CONFIG = Object.freeze({
  baseRate: getOptionalEnvInt('SHIPPING_RATE_BASE', 50),
  perKgRate: getOptionalEnvInt('SHIPPING_RATE_PER_KG', 10),
  freeShippingThreshold: getOptionalEnvInt('SHIPPING_RATE_FREE_THRESHOLD', 1000),
});
