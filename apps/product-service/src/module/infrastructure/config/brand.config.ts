import { getOptionalEnvBool } from '@vubon/shared-config/common';

export const BRAND_CONFIG = Object.freeze({
  requireLogo: getOptionalEnvBool('BRAND_REQUIRE_LOGO', false),
  autoGenerateSlug: getOptionalEnvBool('BRAND_AUTO_GENERATE_SLUG', true),
  maxNameLength: 100,
} as const);
