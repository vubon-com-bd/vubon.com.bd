import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const FULFILLMENT_CONFIG = Object.freeze({
  maxPackTimeHours: getOptionalEnvInt('FULFILLMENT_MAX_PACK_HOURS', 48),
  autoCompleteAfterShipDays: getOptionalEnvInt('FULFILLMENT_AUTO_COMPLETE_DAYS', 7),
  requireTrackingNumber: true,
} as const);
