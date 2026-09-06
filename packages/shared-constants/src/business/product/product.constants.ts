/**
 * Product Main Constants
 * @module shared-constants/business/product/product.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';

// Re-export status and types from common
export { STATUS, TYPES };

export const PRODUCT = {
  // Product status from common
  STATUS: STATUS,

  // Product types from common
  TYPES: TYPES,

  // Product specific
  DEFAULT_PRODUCT_STATUS: 'draft',
  DEFAULT_PRODUCT_TYPE: 'physical',
  MAX_PRODUCT_NAME_LENGTH: 255,
  MIN_PRODUCT_NAME_LENGTH: 3,
  MAX_PRODUCT_DESCRIPTION_LENGTH: 5000,
  MAX_PRODUCT_SKU_LENGTH: 50,
  MIN_PRODUCT_SKU_LENGTH: 3,
  MAX_PRODUCTS_PER_PAGE: 100,
  DEFAULT_PRODUCTS_PER_PAGE: 20,
  PRODUCT_CACHE_TTL: 3600,
  MAX_PRODUCT_IMAGES: 10,
  MAX_PRODUCT_VIDEOS: 5,
  MAX_PRODUCT_DOCUMENTS: 10,
  MAX_PRODUCT_TAGS: 20,
  MAX_PRODUCT_ATTRIBUTES: 50,
  MAX_PRODUCT_VARIANTS: 100,
  MAX_PRODUCT_CATEGORIES: 5,
  MAX_PRODUCT_COLLECTIONS: 10,
} as const;

// Don't export ProductStatus and ProductType from here to avoid conflicts
// They will be exported from their respective files
