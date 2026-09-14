/**
 * Vendor subscription configuration
 * @module shared-config/business/vendor
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const VENDOR_SUBSCRIPTION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('VENDOR_SUBSCRIPTION_ENABLED', false),
  trialDays: getOptionalEnvInt('VENDOR_SUBSCRIPTION_TRIAL_DAYS', 14),
  gracePeriodDays: getOptionalEnvInt('VENDOR_SUBSCRIPTION_GRACE_DAYS', 7),
  autoRenew: getOptionalEnvBool('VENDOR_SUBSCRIPTION_AUTO_RENEW', true),
  cancelAtPeriodEnd: getOptionalEnvBool('VENDOR_SUBSCRIPTION_CANCEL_AT_END', true),
});
