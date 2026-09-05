/**
 * Vendor Tier Calculator
 * ভেন্ডর টায়ার ক্যালকুলেটর
 */

import { VENDOR_TIERS } from '@vubon/shared-constants';
import type { Vendor } from '@vubon/shared-types';

export interface VendorTierRequirements {
  tier: string;
  minRevenue: number;
  minOrders: number;
  minRating: number;
  isVerified: boolean;
  isApproved: boolean;
  maxProducts?: number;
  maxOrders?: number;
  commissionRate?: number;
}

export const calculateVendorTier = (
  vendor: Vendor
): {
  currentTier: string;
  nextTier: string | null;
  progress: number;
  requirements: VendorTierRequirements[];
} => {
  const revenue = vendor.revenue || 0;
  const orders = vendor.orderCount || 0;
  const rating = vendor.rating || 0;

  // VENDOR_TIERS থেকে টায়ার কী ব্যবহার
  const tierKeys = Object.keys(VENDOR_TIERS) as string[];
  const validTiers = Object.values(VENDOR_TIERS) as string[];

  // VENDOR_TIERS থেকে মান ব্যবহার করে রিকোয়ারমেন্ট তৈরি
  const tiers: VendorTierRequirements[] = [
    {
      tier: tierKeys[0] || 'basic',
      minRevenue: 0,
      minOrders: 0,
      minRating: 0,
      isVerified: false,
      isApproved: false,
      maxProducts: 50,
      maxOrders: 500,
      commissionRate: 10,
    },
    {
      tier: tierKeys[1] || 'silver',
      minRevenue: 10000,
      minOrders: 50,
      minRating: 3.5,
      isVerified: false,
      isApproved: true,
      maxProducts: 200,
      maxOrders: 2000,
      commissionRate: 8,
    },
    {
      tier: tierKeys[2] || 'gold',
      minRevenue: 50000,
      minOrders: 200,
      minRating: 4.0,
      isVerified: true,
      isApproved: true,
      maxProducts: 500,
      maxOrders: 10000,
      commissionRate: 6,
    },
    {
      tier: tierKeys[3] || 'platinum',
      minRevenue: 100000,
      minOrders: 500,
      minRating: 4.2,
      isVerified: true,
      isApproved: true,
      maxProducts: 2000,
      maxOrders: 50000,
      commissionRate: 4,
    },
    {
      tier: tierKeys[4] || 'diamond',
      minRevenue: 250000,
      minOrders: 1000,
      minRating: 4.5,
      isVerified: true,
      isApproved: true,
      maxProducts: 5000,
      maxOrders: 100000,
      commissionRate: 2,
    },
    {
      tier: tierKeys[5] || 'enterprise',
      minRevenue: 500000,
      minOrders: 2000,
      minRating: 4.7,
      isVerified: true,
      isApproved: true,
      maxProducts: 10000,
      maxOrders: 1000000,
      commissionRate: 1,
    },
  ];

  // tierKeys ব্যবহার করে ভ্যালিডেশন
  const availableTiers = tierKeys.filter((key) => validTiers.includes(key));

  let currentTier = tiers[0].tier;
  let nextTier = null;
  let progress = 0;

  for (let i = 0; i < tiers.length; i++) {
    const tier = tiers[i];
    // tierKeys ব্যবহার করে টায়ার ভ্যালিডেশন
    const isValidTier = availableTiers.includes(tier.tier);

    if (
      isValidTier &&
      revenue >= tier.minRevenue &&
      orders >= tier.minOrders &&
      rating >= tier.minRating &&
      (!tier.isVerified || vendor.isVerified) &&
      (!tier.isApproved || vendor.isApproved)
    ) {
      currentTier = tier.tier;
      nextTier = i + 1 < tiers.length ? tiers[i + 1].tier : null;
      if (nextTier) {
        const next = tiers[i + 1];
        const revenueProgress = (revenue / next.minRevenue) * 100;
        const ordersProgress = (orders / next.minOrders) * 100;
        const ratingProgress = (rating / next.minRating) * 100;
        progress = Math.min(100, (revenueProgress + ordersProgress + ratingProgress) / 3);
      } else {
        progress = 100;
      }
      break;
    }
  }

  // tierKeys ব্যবহার করে রিটার্ন
  const finalCurrentTier = availableTiers.includes(currentTier)
    ? currentTier
    : availableTiers[0] || 'basic';

  return {
    currentTier: finalCurrentTier,
    nextTier: nextTier && availableTiers.includes(nextTier) ? nextTier : null,
    progress: Math.round(progress * 100) / 100,
    requirements: tiers.filter((t) => availableTiers.includes(t.tier)),
  };
};

export const getVendorTierBenefits = (tier: string): string[] => {
  // VENDOR_TIERS ব্যবহার করে বেনিফিট চেক
  const tierKeys = Object.keys(VENDOR_TIERS) as string[];
  const validTiers = Object.values(VENDOR_TIERS) as string[];

  if (!validTiers.includes(tier)) {
    return getVendorTierBenefits(tierKeys[0] || 'basic');
  }

  const benefits: Record<string, string[]> = {
    basic: ['Basic listing', 'Order management'],
    silver: ['Basic listing', 'Order management', 'Basic analytics'],
    gold: ['Basic listing', 'Order management', 'Advanced analytics', 'Promotion tools'],
    platinum: [
      'Basic listing',
      'Order management',
      'Advanced analytics',
      'Promotion tools',
      'Dedicated support',
    ],
    diamond: [
      'Basic listing',
      'Order management',
      'Advanced analytics',
      'Promotion tools',
      'Dedicated support',
      'Custom branding',
    ],
    enterprise: [
      'Basic listing',
      'Order management',
      'Advanced analytics',
      'Promotion tools',
      'Dedicated support',
      'Custom branding',
      'API access',
    ],
  };

  return benefits[tier] || benefits.basic;
};

// VENDOR_TIERS থেকে হেল্পার ফাংশন
export const getVendorTierLabel = (tier: string): string => {
  const labels: Record<string, string> = {
    basic: 'Basic',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
    diamond: 'Diamond',
    enterprise: 'Enterprise',
  };
  return labels[tier] || tier;
};

export const getVendorTierCommission = (tier: string): number => {
  const commissions: Record<string, number> = {
    basic: 10,
    silver: 8,
    gold: 6,
    platinum: 4,
    diamond: 2,
    enterprise: 1,
  };
  return commissions[tier] || 10;
};

export const getVendorTierMaxProducts = (tier: string): number => {
  const limits: Record<string, number> = {
    basic: 50,
    silver: 200,
    gold: 500,
    platinum: 2000,
    diamond: 5000,
    enterprise: 10000,
  };
  return limits[tier] || 50;
};
