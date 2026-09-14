/**
 * GST configuration (India, etc.)
 * @module shared-config/business/tax
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const GST_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('GST_ENABLED', false),
  defaultRate: getOptionalEnvInt('GST_DEFAULT_RATE', 18),
  reducedRate: getOptionalEnvInt('GST_REDUCED_RATE', 12),
  standardRate: getOptionalEnvInt('GST_STANDARD_RATE', 18),
  zeroRate: 0,
  inclusive: getOptionalEnvBool('GST_INCLUSIVE', false),
});
