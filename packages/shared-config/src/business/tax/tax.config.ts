/**
 * Tax base configuration
 * @module shared-config/business/tax
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const TAX_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('TAX_ENABLED', true),
  inclusive: getOptionalEnvBool('TAX_INCLUSIVE', true),
  defaultRegion: 'bd',
  applyOnShipping: getOptionalEnvBool('TAX_ON_SHIPPING', false),
  compound: getOptionalEnvBool('TAX_COMPOUND', false),
  roundingMode: 'round', // round | floor | ceil
  decimalPlaces: getOptionalEnvInt('TAX_DECIMALS', 2),
  showBreakdown: getOptionalEnvBool('TAX_SHOW_BREAKDOWN', true),
});
