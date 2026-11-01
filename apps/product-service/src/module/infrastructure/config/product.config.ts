/**
 * Product Infrastructure Configuration
 * @module product-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const PRODUCT_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PRODUCT_ENABLED', true),
  cacheTtlSeconds: getOptionalEnvInt('PRODUCT_CACHE_TTL', 300),
  staleDraftHours: getOptionalEnvInt('PRODUCT_STALE_DRAFT_HOURS', 72),
  searchBatchSize: getOptionalEnvInt('PRODUCT_SEARCH_BATCH', 100),
  maxVariantsPerProduct: getOptionalEnvInt('PRODUCT_MAX_VARIANTS', 100),
  maxAttributesPerProduct: getOptionalEnvInt('PRODUCT_MAX_ATTRIBUTES', 50),
  maxMediaPerProduct: getOptionalEnvInt('PRODUCT_MAX_MEDIA', 30),
} as const);

export type ProductInfraConfig = typeof PRODUCT_INFRA_CONFIG;
