import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const PRODUCT_CONFIG = Object.freeze({
  maxVariants: getOptionalEnvInt('PRODUCT_MAX_VARIANTS', 50),
  maxMedia: getOptionalEnvInt('PRODUCT_MAX_MEDIA', 20),
  defaultPageSize: getOptionalEnvInt('PRODUCT_DEFAULT_PAGE_SIZE', 20),
  maxPageSize: getOptionalEnvInt('PRODUCT_MAX_PAGE_SIZE', 100),
  requireCategory: getOptionalEnvBool('PRODUCT_REQUIRE_CATEGORY', false),
  autoPublish: getOptionalEnvBool('PRODUCT_AUTO_PUBLISH', false),
} as const);
