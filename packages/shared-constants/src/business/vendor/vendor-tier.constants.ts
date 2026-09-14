export const VENDOR_TIER = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  DIAMOND: 'diamond',
} as const;

export const VENDOR_TIER_THRESHOLD = {
  bronze: { minSales: 0, maxSales: 100000 },
  silver: { minSales: 100001, maxSales: 1000000 },
  gold: { minSales: 1000001, maxSales: 10000000 },
  platinum: { minSales: 10000001, maxSales: 100000000 },
  diamond: { minSales: 100000001, maxSales: null },
} as const;

export const VENDOR_TIER_BENEFIT = {
  bronze: { commissionPercent: 15, payoutDays: 14 },
  silver: { commissionPercent: 12, payoutDays: 10 },
  gold: { commissionPercent: 10, payoutDays: 7 },
  platinum: { commissionPercent: 8, payoutDays: 5 },
  diamond: { commissionPercent: 5, payoutDays: 3 },
} as const;

export type VendorTierType = (typeof VENDOR_TIER)[keyof typeof VENDOR_TIER];
