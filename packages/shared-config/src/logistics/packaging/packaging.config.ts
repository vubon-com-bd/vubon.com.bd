/**
 * Packaging configuration
 * @module shared-config/logistics/packaging
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const PACKAGING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PACKAGING_ENABLED', true),
  maxWeightKg: getOptionalEnvInt('PACKAGING_MAX_WEIGHT_KG', 500),
  maxLengthCm: getOptionalEnvInt('PACKAGING_MAX_LENGTH_CM', 300),
  maxWidthCm: getOptionalEnvInt('PACKAGING_MAX_WIDTH_CM', 300),
  maxHeightCm: getOptionalEnvInt('PACKAGING_MAX_HEIGHT_CM', 300),
  minWeightKg: getOptionalEnvInt('PACKAGING_MIN_WEIGHT_KG', 1),
  fragileHandling: getOptionalEnvBool('PACKAGING_FRAGILE_HANDLING', true),
  temperatureControlled: getOptionalEnvBool('PACKAGING_TEMP_CONTROLLED', false),
  maxCustomPackagings: getOptionalEnvInt('PACKAGING_MAX_CUSTOM', 50),
});
