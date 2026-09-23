import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SHIPMENT_CONFIG = Object.freeze({
  autoGenerateNumber: getOptionalEnv('SHIPMENT_AUTO_NUMBER', 'true') === 'true',
  requireWeight: getOptionalEnv('SHIPMENT_REQUIRE_WEIGHT', 'false') === 'true',
  maxItemsPerShipment: getOptionalEnvInt('SHIPMENT_MAX_ITEMS', 100),
});
