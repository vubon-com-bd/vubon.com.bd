/**
 * Product Config
 * @module product-service/infrastructure/config
 */
import {
  getOptionalEnv,
  getOptionalEnvInt,
  getOptionalEnvBool,
} from './_helpers.js';
import { PRODUCT } from '@vubon/shared-constants/business/product';

const PRODUCT_CONFIG = Object.freeze({
  DEFAULT_PAGE_SIZE: getOptionalEnvInt('PRODUCT_PAGE_SIZE', 20),
  MAX_PAGE_SIZE: getOptionalEnvInt('PRODUCT_MAX_PAGE_SIZE', 100),
  CACHE_TTL_SECONDS: getOptionalEnvInt('PRODUCT_CACHE_TTL', 300),
  SEARCH_INDEX_NAME: getOptionalEnv('PRODUCT_SEARCH_INDEX', 'products') as string,
  DEFAULT_CURRENCY: PRODUCT.PRICING.LIMIT.DEFAULT_CURRENCY,
  MAX_IMAGES: 20,
  MAX_TAGS: 50,
  ENABLE_SEARCH_INDEXING: getOptionalEnvBool('PRODUCT_SEARCH_INDEXING', true),
} as const);

export type ProductConfig = typeof PRODUCT_CONFIG;
export const productConfig = PRODUCT_CONFIG;
export function getProductConfig(): ProductConfig { return PRODUCT_CONFIG; }
