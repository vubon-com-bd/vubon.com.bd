/**
 * Return shipment configuration
 * @module shared-config/logistics/return-shipment
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const RETURN_SHIPMENT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('RETURN_SHIPMENT_ENABLED', true),
  maxReturnDays: getOptionalEnvInt('RETURN_MAX_DAYS', 30),
  pickupWindowDays: getOptionalEnvInt('RETURN_PICKUP_WINDOW_DAYS', 3),
  inspectionDays: getOptionalEnvInt('RETURN_INSPECTION_DAYS', 2),
  refundProcessingDays: getOptionalEnvInt('RETURN_REFUND_DAYS', 7),
  maxReturnValue: getOptionalEnvInt('RETURN_MAX_VALUE', 1000000),
  requirePhotos: getOptionalEnvBool('RETURN_REQUIRE_PHOTOS', true),
  maxPhotos: getOptionalEnvInt('RETURN_MAX_PHOTOS', 5),
  requireRma: getOptionalEnvBool('RETURN_REQUIRE_RMA', true),
  rmaPrefix: 'RMA',
});
