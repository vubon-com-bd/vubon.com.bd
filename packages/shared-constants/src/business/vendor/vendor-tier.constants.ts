/**
 * Vendor Tier Constants
 * ভেন্ডর টায়ার সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';
import { VENDOR } from './vendor.constants';

// Vendor tier types
export const VENDOR_TIERS = {
  BASIC: VENDOR.TIERS.BASIC,
  SILVER: VENDOR.TIERS.SILVER,
  GOLD: VENDOR.TIERS.GOLD,
  PLATINUM: VENDOR.TIERS.PLATINUM,
  DIAMOND: VENDOR.TIERS.DIAMOND,
  ENTERPRISE: VENDOR.TIERS.ENTERPRISE,
} as const;

export type VendorTierValue = (typeof VENDOR_TIERS)[keyof typeof VENDOR_TIERS];

// TYPES ব্যবহার করে টায়ার লেভেল
export const VENDOR_TIER_LEVELS = {
  [VENDOR_TIERS.BASIC]: TYPES.DEFAULT || 'basic',
  [VENDOR_TIERS.SILVER]: TYPES.USER || 'silver',
  [VENDOR_TIERS.GOLD]: TYPES.ADMIN || 'gold',
  [VENDOR_TIERS.PLATINUM]: TYPES.MODERATOR || 'platinum',
  [VENDOR_TIERS.DIAMOND]: TYPES.VENDOR || 'diamond',
  [VENDOR_TIERS.ENTERPRISE]: TYPES.MANAGER || 'enterprise',
} as const;

// Tier benefits
export const VENDOR_TIER_BENEFITS: Record<
  VendorTierValue,
  {
    commissionRate: number;
    maxProducts: number;
    maxOrders: number;
    features: string[];
  }
> = {
  [VENDOR_TIERS.BASIC]: {
    commissionRate: 10,
    maxProducts: 50,
    maxOrders: 500,
    features: ['basic_listing', 'order_management'],
  },
  [VENDOR_TIERS.SILVER]: {
    commissionRate: 8,
    maxProducts: 200,
    maxOrders: 2000,
    features: ['basic_listing', 'order_management', 'analytics_basic'],
  },
  [VENDOR_TIERS.GOLD]: {
    commissionRate: 6,
    maxProducts: 500,
    maxOrders: 10000,
    features: ['basic_listing', 'order_management', 'analytics_advanced', 'promotion'],
  },
  [VENDOR_TIERS.PLATINUM]: {
    commissionRate: 4,
    maxProducts: 2000,
    maxOrders: 50000,
    features: [
      'basic_listing',
      'order_management',
      'analytics_advanced',
      'promotion',
      'dedicated_support',
    ],
  },
  [VENDOR_TIERS.DIAMOND]: {
    commissionRate: 2,
    maxProducts: 5000,
    maxOrders: 100000,
    features: [
      'basic_listing',
      'order_management',
      'analytics_advanced',
      'promotion',
      'dedicated_support',
      'custom_branding',
    ],
  },
  [VENDOR_TIERS.ENTERPRISE]: {
    commissionRate: 1,
    maxProducts: 10000,
    maxOrders: 1000000,
    features: [
      'basic_listing',
      'order_management',
      'analytics_advanced',
      'promotion',
      'dedicated_support',
      'custom_branding',
      'api_access',
    ],
  },
} as const;

// TYPES ব্যবহার করে টায়ার ক্যাটাগরি
export const VENDOR_TIER_CATEGORIES = {
  STANDARD: TYPES.STANDARD || 'standard',
  PREMIUM: TYPES.SUBSCRIPTION || 'premium',
  ENTERPRISE: TYPES.VOLUME || 'enterprise',
} as const;

export type VendorTierCategory =
  (typeof VENDOR_TIER_CATEGORIES)[keyof typeof VENDOR_TIER_CATEGORIES];

// TYPES ব্যবহার করে টায়ার গ্রুপ
export const VENDOR_TIER_GROUPS: Record<VendorTierCategory, VendorTierValue[]> = {
  [VENDOR_TIER_CATEGORIES.STANDARD]: [VENDOR_TIERS.BASIC, VENDOR_TIERS.SILVER, VENDOR_TIERS.GOLD],
  [VENDOR_TIER_CATEGORIES.PREMIUM]: [VENDOR_TIERS.PLATINUM, VENDOR_TIERS.DIAMOND],
  [VENDOR_TIER_CATEGORIES.ENTERPRISE]: [VENDOR_TIERS.ENTERPRISE],
} as const;
