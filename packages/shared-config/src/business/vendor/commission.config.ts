/**
 * Commission configuration
 * @module shared-config/business/vendor
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const COMMISSION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('COMMISSION_ENABLED', true),
  defaultPercent: getOptionalEnvInt('COMMISSION_DEFAULT_PERCENT', 15),
  minPercent: getOptionalEnvInt('COMMISSION_MIN_PERCENT', 1),
  maxPercent: getOptionalEnvInt('COMMISSION_MAX_PERCENT', 50),
  applyOnShipping: getOptionalEnvBool('COMMISSION_ON_SHIPPING', false),
  applyOnTax: getOptionalEnvBool('COMMISSION_ON_TAX', false),
  deductOnPayout: getOptionalEnvBool('COMMISSION_DEDUCT_ON_PAYOUT', true),
});
