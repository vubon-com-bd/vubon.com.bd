/**
 * Product Constants - Base
 * প্রোডাক্ট সম্পর্কিত মূল কনস্ট্যান্টস
 */

import { STATUS, TYPES } from '../../common';
import { USER_ROLES } from '../../user/user-role.constants';

export const PRODUCT = {
  // Product types (TYPES থেকে ম্যাপিং)
  TYPES: {
    PHYSICAL: TYPES.PHYSICAL || 'physical',
    DIGITAL: TYPES.DIGITAL || 'digital',
    SERVICE: TYPES.SERVICE || 'service',
    SUBSCRIPTION: TYPES.SUBSCRIPTION || 'subscription',
    DOWNLOADABLE: TYPES.DOWNLOADABLE || 'downloadable',
    VIRTUAL: TYPES.VIRTUAL || 'virtual',
  },

  // Product status (STATUS থেকে ম্যাপিং)
  STATUS: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    PUBLISHED: 'published',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued',
    REJECTED: 'rejected',
    ARCHIVED: 'archived',
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    DELETED: STATUS.DELETED,
  },

  // Product visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    MEMBERS_ONLY: 'members_only',
    PREVIEW: 'preview',
  },

  // Product conditions
  CONDITION: {
    NEW: 'new',
    USED: 'used',
    REFURBISHED: 'refurbished',
    OPEN_BOX: 'open_box',
    RENTAL: 'rental',
  },

  // Product availability
  AVAILABILITY: {
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    PRE_ORDER: 'pre_order',
    BACK_ORDER: 'back_order',
    DISCONTINUED: 'discontinued',
  },

  // Product approval status
  APPROVAL: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    NEEDS_REVISION: 'needs_revision',
    IN_REVIEW: 'in_review',
  },

  // Comparison related constants
  COMPARISON: {
    MAX_ITEMS: 10,
    DEFAULT_ITEMS: 4,
    MAX_ATTRIBUTES: 20,
    SHARE_EXPIRY: 7, // days
  },

  // Price History related constants
  PRICE_HISTORY: {
    MAX_RECORDS: 100,
    RETENTION_DAYS: 90,
    BULK_LIMIT: 1000,
  },

  // Pricing Rule related constants
  PRICING_RULE: {
    MAX_RULES: 50,
    PRIORITY_MIN: 1,
    PRIORITY_MAX: 100,
    MAX_CONDITIONS: 10,
    MAX_ADJUSTMENTS: 5,
  },

  // Tag related constants
  TAG: {
    MAX_TAGS_PER_PRODUCT: 10,
    MAX_TAGS_PER_BULK: 50,
    MIN_LENGTH: 2,
    MAX_LENGTH: 30,
    ALLOWED_CHARS: /^[a-zA-Z0-9\s\-_]+$/,
  },

  // Default values
  DEFAULTS: {
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 999,
    LOW_STOCK_THRESHOLD: 10,
    MAX_DESCRIPTION_LENGTH: 5000,
    MAX_NAME_LENGTH: 255,
    DEFAULT_WEIGHT: 0,
    DEFAULT_DIMENSION: 0,
  },

  // Seller roles (from USER_ROLES)
  SELLER_ROLES: {
    VENDOR: USER_ROLES.VENDOR,
    MERCHANT: 'merchant',
    SUPPLIER: 'supplier',
    DROPSHIPPER: 'dropshipper',
  },
} as const;

export type ProductType = (typeof PRODUCT.TYPES)[keyof typeof PRODUCT.TYPES];
export type ProductStatus = (typeof PRODUCT.STATUS)[keyof typeof PRODUCT.STATUS];
export type ProductVisibility = (typeof PRODUCT.VISIBILITY)[keyof typeof PRODUCT.VISIBILITY];
export type ProductCondition = (typeof PRODUCT.CONDITION)[keyof typeof PRODUCT.CONDITION];
export type ProductAvailability = (typeof PRODUCT.AVAILABILITY)[keyof typeof PRODUCT.AVAILABILITY];
export type ProductApproval = (typeof PRODUCT.APPROVAL)[keyof typeof PRODUCT.APPROVAL];
export type ProductSellerRole = (typeof PRODUCT.SELLER_ROLES)[keyof typeof PRODUCT.SELLER_ROLES];
export type ComparisonConfig = typeof PRODUCT.COMPARISON;
export type PriceHistoryConfig = typeof PRODUCT.PRICE_HISTORY;
export type PricingRuleConfig = typeof PRODUCT.PRICING_RULE;
export type TagConfig = typeof PRODUCT.TAG;
