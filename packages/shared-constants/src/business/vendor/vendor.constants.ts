/**
 * Vendor Constants - Base
 * ভেন্ডর সম্পর্কিত মূল কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { USER_ROLES } from '../../user/user-role.constants';
import { PRODUCT } from '../product/product.constants';

export const VENDOR = {
  // Vendor status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    PENDING: STATUS.PENDING,
    SUSPENDED: STATUS.SUSPENDED,
    DELETED: STATUS.DELETED,
    APPROVED: 'approved',
    REJECTED: 'rejected',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    ON_HOLD: 'on_hold',
  },

  // Vendor types
  TYPES: {
    INDIVIDUAL: 'individual',
    BUSINESS: 'business',
    MANUFACTURER: 'manufacturer',
    DISTRIBUTOR: 'distributor',
    WHOLESALER: 'wholesaler',
    RETAILER: 'retailer',
    IMPORTER: 'importer',
    EXPORTER: 'exporter',
    DROPSHIPPER: 'dropshipper',
  },

  // Vendor tiers
  TIERS: {
    BASIC: 'basic',
    SILVER: 'silver',
    GOLD: 'gold',
    PLATINUM: 'platinum',
    DIAMOND: 'diamond',
    ENTERPRISE: 'enterprise',
  },

  // User roles (from USER_ROLES)
  USER_ROLES: {
    VENDOR: USER_ROLES.VENDOR,
    MERCHANT: 'merchant',
    SUPPLIER: 'supplier',
  },

  // Product types (from PRODUCT)
  PRODUCT_TYPES: {
    PHYSICAL: PRODUCT.TYPES.PHYSICAL,
    DIGITAL: PRODUCT.TYPES.DIGITAL,
    SERVICE: PRODUCT.TYPES.SERVICE,
    SUBSCRIPTION: PRODUCT.TYPES.SUBSCRIPTION,
  },

  // Default values
  DEFAULTS: {
    MIN_ORDER_AMOUNT: 0,
    MAX_ORDER_AMOUNT: 99999999,
    COMMISSION_RATE: 10,
    PAYOUT_THRESHOLD: 500,
    PAYOUT_CYCLE: 7, // days
    MAX_PRODUCTS: 1000,
    MAX_ORDERS: 10000,
  },
} as const;

export type VendorStatus = (typeof VENDOR.STATUS)[keyof typeof VENDOR.STATUS];
export type VendorType = (typeof VENDOR.TYPES)[keyof typeof VENDOR.TYPES];
export type VendorTier = (typeof VENDOR.TIERS)[keyof typeof VENDOR.TIERS];
