/**
 * Vendor Config
 * ভেন্ডর কনফিগারেশন
 */

import { VENDOR } from '@vubon/shared-constants';

export interface VendorConfig {
  enabled: boolean;
  maxProducts: number;
  maxOrders: number;
  minOrderAmount: number;
  maxOrderAmount: number;
  commissionRate: number;
  payoutThreshold: number;
  payoutCycle: number;
  status: Record<string, string>;
  types: Record<string, string>;
  tiers: Record<string, string>;
  userRoles: Record<string, string>;
  productTypes: Record<string, string>;
  defaults: {
    minOrderAmount: number;
    maxOrderAmount: number;
    commissionRate: number;
    payoutThreshold: number;
    payoutCycle: number;
    maxProducts: number;
    maxOrders: number;
  };
}

export const vendorConfig: VendorConfig = {
  enabled: true,
  maxProducts: 1000,
  maxOrders: 10000,
  minOrderAmount: 0,
  maxOrderAmount: 99999999,
  commissionRate: 10,
  payoutThreshold: 500,
  payoutCycle: 7,

  status: {
    active: VENDOR.STATUS.ACTIVE,
    inactive: VENDOR.STATUS.INACTIVE,
    pending: VENDOR.STATUS.PENDING,
    suspended: VENDOR.STATUS.SUSPENDED,
    deleted: VENDOR.STATUS.DELETED,
    approved: VENDOR.STATUS.APPROVED,
    rejected: VENDOR.STATUS.REJECTED,
    verified: VENDOR.STATUS.VERIFIED,
    unverified: VENDOR.STATUS.UNVERIFIED,
    on_hold: VENDOR.STATUS.ON_HOLD,
  },

  types: {
    individual: VENDOR.TYPES.INDIVIDUAL,
    business: VENDOR.TYPES.BUSINESS,
    manufacturer: VENDOR.TYPES.MANUFACTURER,
    distributor: VENDOR.TYPES.DISTRIBUTOR,
    wholesaler: VENDOR.TYPES.WHOLESALER,
    retailer: VENDOR.TYPES.RETAILER,
    importer: VENDOR.TYPES.IMPORTER,
    exporter: VENDOR.TYPES.EXPORTER,
    dropshipper: VENDOR.TYPES.DROPSHIPPER,
  },

  tiers: {
    basic: VENDOR.TIERS.BASIC,
    silver: VENDOR.TIERS.SILVER,
    gold: VENDOR.TIERS.GOLD,
    platinum: VENDOR.TIERS.PLATINUM,
    diamond: VENDOR.TIERS.DIAMOND,
    enterprise: VENDOR.TIERS.ENTERPRISE,
  },

  userRoles: {
    vendor: VENDOR.USER_ROLES.VENDOR,
    merchant: VENDOR.USER_ROLES.MERCHANT,
    supplier: VENDOR.USER_ROLES.SUPPLIER,
  },

  productTypes: {
    physical: VENDOR.PRODUCT_TYPES.PHYSICAL,
    digital: VENDOR.PRODUCT_TYPES.DIGITAL,
    service: VENDOR.PRODUCT_TYPES.SERVICE,
    subscription: VENDOR.PRODUCT_TYPES.SUBSCRIPTION,
  },

  defaults: {
    minOrderAmount: VENDOR.DEFAULTS.MIN_ORDER_AMOUNT,
    maxOrderAmount: VENDOR.DEFAULTS.MAX_ORDER_AMOUNT,
    commissionRate: VENDOR.DEFAULTS.COMMISSION_RATE,
    payoutThreshold: VENDOR.DEFAULTS.PAYOUT_THRESHOLD,
    payoutCycle: VENDOR.DEFAULTS.PAYOUT_CYCLE,
    maxProducts: VENDOR.DEFAULTS.MAX_PRODUCTS,
    maxOrders: VENDOR.DEFAULTS.MAX_ORDERS,
  },
} as const;

export type VendorConfigType = typeof vendorConfig;
