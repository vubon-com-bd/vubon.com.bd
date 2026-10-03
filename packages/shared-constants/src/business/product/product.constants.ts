import { PRODUCT_STATUS } from './product-status.constants.js';
import { PRODUCT_TYPE } from './product-type.constants.js';
import { CATEGORY_STATUS, CATEGORY } from './category.constants.js';
import { BRAND_STATUS, BRAND } from './brand.constants.js';
import { VARIANT_STATUS, VARIANT_TYPE, VARIANT } from './variant.constants.js';
import { ATTRIBUTE_TYPE, ATTRIBUTE } from './attribute.constants.js';
import { INVENTORY_STATUS, INVENTORY } from './inventory.constants.js';
import { PRICING_TYPE, PRICING, COST_TYPE } from './pricing.constants.js';
import { REVIEW_STATUS, REVIEW_RATING, REVIEW } from './review.constants.js';
import { COLLECTION_TYPE, COLLECTION_STATUS, COLLECTION } from './collection.constants.js';

export const PRODUCT = {
  STATUS: PRODUCT_STATUS,
  TYPE: PRODUCT_TYPE,
  CATEGORY: { STATUS: CATEGORY_STATUS, LIMIT: CATEGORY },
  BRAND: { STATUS: BRAND_STATUS, LIMIT: BRAND },
  VARIANT: { STATUS: VARIANT_STATUS, TYPE: VARIANT_TYPE, LIMIT: VARIANT },
  ATTRIBUTE: { TYPE: ATTRIBUTE_TYPE, LIMIT: ATTRIBUTE },
  INVENTORY: { STATUS: INVENTORY_STATUS, LIMIT: INVENTORY },
  PRICING: { TYPE: PRICING_TYPE, LIMIT: PRICING, COST_TYPE },
  REVIEW: { STATUS: REVIEW_STATUS, RATING: REVIEW_RATING, LIMIT: REVIEW },
  COLLECTION: {
    TYPE: COLLECTION_TYPE,
    STATUS: COLLECTION_STATUS,
    LIMIT: COLLECTION,
  },
} as const;

export type ProductType = typeof PRODUCT;
