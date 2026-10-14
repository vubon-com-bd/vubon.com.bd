/**
 * Vendor core configuration
 * @module vendor-service/infrastructure/config
 */
import {
  getOptionalEnv,
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const VENDOR_CONFIG = Object.freeze({
  enableAutoApproval: getOptionalEnvBool('VENDOR_AUTO_APPROVAL', false),
  requireEmailVerification: getOptionalEnvBool('VENDOR_REQUIRE_EMAIL_VERIFICATION', true),
  maxSlugAttempts: getOptionalEnvInt('VENDOR_MAX_SLUG_ATTEMPTS', 1000),
  cacheTtlSeconds: getOptionalEnvInt('VENDOR_CACHE_TTL_SECONDS', 300),
  slugReservedList: getOptionalEnv(
    'VENDOR_RESERVED_SLUGS',
    'new,edit,search,admin,api,vendor,vendors,store,shop',
  ).split(','),
} as const);
