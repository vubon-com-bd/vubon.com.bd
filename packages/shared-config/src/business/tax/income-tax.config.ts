/**
 * Income tax configuration
 * @module shared-config/business/tax
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const INCOME_TAX_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('INCOME_TAX_ENABLED', false),
  tdsEnabled: getOptionalEnvBool('TDS_ENABLED', true),
  tdsDefaultPercent: getOptionalEnvInt('TDS_DEFAULT_PERCENT', 5),
  vdsEnabled: getOptionalEnvBool('VDS_ENABLED', true),
  vdsDefaultPercent: getOptionalEnvInt('VDS_DEFAULT_PERCENT', 5),
});
