/**
 * Vendor configuration
 * @module shared-config/business/vendor
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const VENDOR_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('VENDOR_ENABLED', true),
  autoApprove: getOptionalEnvBool('VENDOR_AUTO_APPROVE', false),
  requireVerification: getOptionalEnvBool('VENDOR_REQUIRE_VERIFICATION', true),
  requireBusinessLicense: getOptionalEnvBool('VENDOR_REQUIRE_LICENSE', true),
  requireTaxId: getOptionalEnvBool('VENDOR_REQUIRE_TAX_ID', true),
  reviewSlaHours: getOptionalEnvInt('VENDOR_REVIEW_SLA_HOURS', 72),
  maxProducts: getOptionalEnvInt('VENDOR_MAX_PRODUCTS', 100000),
  maxTeamMembers: getOptionalEnvInt('VENDOR_MAX_TEAM', 50),
  allowMultiVendor: getOptionalEnvBool('VENDOR_MULTI_ENABLED', true),
});
