/**
 * VAT configuration (Bangladesh: 15%)
 * @module shared-config/business/tax
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const VAT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('VAT_ENABLED', true),
  standardRate: getOptionalEnvInt('VAT_STANDARD_RATE', 15),
  reducedRate: getOptionalEnvInt('VAT_REDUCED_RATE', 7.5),
  zeroRate: 0,
  registrationThreshold: getOptionalEnvInt('VAT_REG_THRESHOLD', 3000000),
  inclusive: getOptionalEnvBool('VAT_INCLUSIVE', true),
  applyOnServices: getOptionalEnvBool('VAT_ON_SERVICES', true),
});
