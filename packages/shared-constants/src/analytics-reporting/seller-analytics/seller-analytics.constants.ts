/**
 * @fileoverview Seller analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Seller tier system
 */
export enum SellerTier {
  /** New seller tier */
  NEW = 'NEW',
  /** Bronze tier */
  BRONZE = 'BRONZE',
  /** Silver tier */
  SILVER = 'SILVER',
  /** Gold tier */
  GOLD = 'GOLD',
  /** Platinum tier */
  PLATINUM = 'PLATINUM',
  /** Diamond tier */
  DIAMOND = 'DIAMOND',
  /** Elite tier */
  ELITE = 'ELITE',
}

/**
 * Seller tier requirements
 */
export interface SellerTierRequirements {
  /** Minimum sales volume */
  minSalesVolume: number;
  /** Minimum order count */
  minOrderCount: number;
  /** Minimum rating */
  minRating: number;
  /** Minimum completion rate */
  minCompletionRate: number;
  /** Minimum on-time delivery rate */
  minOnTimeDeliveryRate: number;
  /** Minimum tenure in days */
  minTenureDays: number;
}

export const SELLER_TIER_REQUIREMENTS: Record<SellerTier, SellerTierRequirements> = {
  [SellerTier.NEW]: {
    minSalesVolume: 0,
    minOrderCount: 0,
    minRating: 0,
    minCompletionRate: 0,
    minOnTimeDeliveryRate: 0,
    minTenureDays: 0,
  },
  [SellerTier.BRONZE]: {
    minSalesVolume: 1000,
    minOrderCount: 10,
    minRating: 3.5,
    minCompletionRate: 80,
    minOnTimeDeliveryRate: 70,
    minTenureDays: 30,
  },
  [SellerTier.SILVER]: {
    minSalesVolume: 5000,
    minOrderCount: 50,
    minRating: 4.0,
    minCompletionRate: 85,
    minOnTimeDeliveryRate: 80,
    minTenureDays: 60,
  },
  [SellerTier.GOLD]: {
    minSalesVolume: 25000,
    minOrderCount: 200,
    minRating: 4.2,
    minCompletionRate: 90,
    minOnTimeDeliveryRate: 85,
    minTenureDays: 120,
  },
  [SellerTier.PLATINUM]: {
    minSalesVolume: 100000,
    minOrderCount: 500,
    minRating: 4.4,
    minCompletionRate: 93,
    minOnTimeDeliveryRate: 90,
    minTenureDays: 180,
  },
  [SellerTier.DIAMOND]: {
    minSalesVolume: 500000,
    minOrderCount: 1000,
    minRating: 4.6,
    minCompletionRate: 95,
    minOnTimeDeliveryRate: 93,
    minTenureDays: 365,
  },
  [SellerTier.ELITE]: {
    minSalesVolume: 1000000,
    minOrderCount: 2000,
    minRating: 4.8,
    minCompletionRate: 97,
    minOnTimeDeliveryRate: 95,
    minTenureDays: 730,
  },
};

/**
 * Seller tier benefits
 */
export interface SellerTierBenefits {
  /** Commission rate percentage */
  commissionRate: number;
  /** Featured products count */
  featuredProductsCount: number;
  /** Free shipping eligibility */
  freeShippingEligible: boolean;
  /** Priority support */
  prioritySupport: boolean;
  /** Marketing tools access */
  marketingToolsAccess: boolean;
  /** Analytics access level */
  analyticsAccessLevel: 'BASIC' | 'ADVANCED' | 'PREMIUM' | 'ENTERPRISE';
}

export const SELLER_TIER_BENEFITS: Record<SellerTier, SellerTierBenefits> = {
  [SellerTier.NEW]: {
    commissionRate: 10,
    featuredProductsCount: 0,
    freeShippingEligible: false,
    prioritySupport: false,
    marketingToolsAccess: false,
    analyticsAccessLevel: 'BASIC',
  },
  [SellerTier.BRONZE]: {
    commissionRate: 9,
    featuredProductsCount: 1,
    freeShippingEligible: false,
    prioritySupport: false,
    marketingToolsAccess: false,
    analyticsAccessLevel: 'BASIC',
  },
  [SellerTier.SILVER]: {
    commissionRate: 8,
    featuredProductsCount: 3,
    freeShippingEligible: true,
    prioritySupport: false,
    marketingToolsAccess: true,
    analyticsAccessLevel: 'ADVANCED',
  },
  [SellerTier.GOLD]: {
    commissionRate: 7,
    featuredProductsCount: 5,
    freeShippingEligible: true,
    prioritySupport: true,
    marketingToolsAccess: true,
    analyticsAccessLevel: 'ADVANCED',
  },
  [SellerTier.PLATINUM]: {
    commissionRate: 6,
    featuredProductsCount: 10,
    freeShippingEligible: true,
    prioritySupport: true,
    marketingToolsAccess: true,
    analyticsAccessLevel: 'PREMIUM',
  },
  [SellerTier.DIAMOND]: {
    commissionRate: 5,
    featuredProductsCount: 20,
    freeShippingEligible: true,
    prioritySupport: true,
    marketingToolsAccess: true,
    analyticsAccessLevel: 'PREMIUM',
  },
  [SellerTier.ELITE]: {
    commissionRate: 4,
    featuredProductsCount: 50,
    freeShippingEligible: true,
    prioritySupport: true,
    marketingToolsAccess: true,
    analyticsAccessLevel: 'ENTERPRISE',
  },
};

/**
 * Seller performance benchmarks
 */
export interface SellerPerformanceBenchmark {
  /** Order completion rate benchmark */
  completionRateBenchmark: number;
  /** On-time delivery benchmark */
  onTimeDeliveryBenchmark: number;
  /** Customer satisfaction benchmark */
  customerSatisfactionBenchmark: number;
  /** Return rate benchmark */
  returnRateBenchmark: number;
  /** Response time benchmark in hours */
  responseTimeBenchmark: number;
  /** Resolution time benchmark in hours */
  resolutionTimeBenchmark: number;
}

export const DEFAULT_SELLER_PERFORMANCE_BENCHMARK: SellerPerformanceBenchmark = {
  completionRateBenchmark: 95,
  onTimeDeliveryBenchmark: 90,
  customerSatisfactionBenchmark: 4.0,
  returnRateBenchmark: 5,
  responseTimeBenchmark: 24,
  resolutionTimeBenchmark: 48,
};

/**
 * Seller rating thresholds
 */
export interface SellerRatingThresholds {
  /** Excellent rating threshold */
  excellentThreshold: number;
  /** Good rating threshold */
  goodThreshold: number;
  /** Average rating threshold */
  averageThreshold: number;
  /** Poor rating threshold */
  poorThreshold: number;
  /** Minimum reviews for reliable rating */
  reliableRatingReviewCount: number;
  /** Minimum rating for featured status */
  featuredRatingThreshold: number;
}

export const DEFAULT_SELLER_RATING_THRESHOLDS: SellerRatingThresholds = {
  excellentThreshold: 4.5,
  goodThreshold: 4.0,
  averageThreshold: 3.0,
  poorThreshold: 2.0,
  reliableRatingReviewCount: 10,
  featuredRatingThreshold: 4.5,
};

/**
 * Seller commission settings
 */
export interface SellerCommissionSettings {
  /** Base commission rate percentage */
  baseCommissionRate: number;
  /** Commission rate by tier */
  tierCommissionRates: Record<SellerTier, number>;
  /** Additional commission for featured products */
  featuredProductCommission: number;
  /** Commission for international sales */
  internationalCommission: number;
  /** Commission for bulk orders */
  bulkOrderCommission: number;
  /** Minimum commission amount */
  minimumCommission: number;
  /** Maximum commission cap */
  maximumCommissionCap: number;
}

export const DEFAULT_SELLER_COMMISSION_SETTINGS: SellerCommissionSettings = {
  baseCommissionRate: 10,
  tierCommissionRates: {
    [SellerTier.NEW]: 10,
    [SellerTier.BRONZE]: 9,
    [SellerTier.SILVER]: 8,
    [SellerTier.GOLD]: 7,
    [SellerTier.PLATINUM]: 6,
    [SellerTier.DIAMOND]: 5,
    [SellerTier.ELITE]: 4,
  },
  featuredProductCommission: 2,
  internationalCommission: 3,
  bulkOrderCommission: 2,
  minimumCommission: 0.5,
  maximumCommissionCap: 100,
};

/**
 * Seller payment cycle
 */
export enum SellerPaymentCycle {
  /** Daily payment */
  DAILY = 'DAILY',
  /** Weekly payment */
  WEEKLY = 'WEEKLY',
  /** Bi-weekly payment */
  BI_WEEKLY = 'BI_WEEKLY',
  /** Monthly payment */
  MONTHLY = 'MONTHLY',
  /** Quarterly payment */
  QUARTERLY = 'QUARTERLY',
}

/**
 * Seller payment settings
 */
export interface SellerPaymentSettings {
  /** Default payment cycle */
  defaultPaymentCycle: SellerPaymentCycle;
  /** Minimum payout amount */
  minimumPayoutAmount: number;
  /** Payout processing time in days */
  payoutProcessingDays: number;
  /** Payment hold period in days */
  paymentHoldDays: number;
  /** Enable auto-payout */
  enableAutoPayout: boolean;
  /** Payout methods supported */
  payoutMethods: ('BANK' | 'PAYPAL' | 'STRIPE' | 'WIRE')[];
  /** Currency for payouts */
  payoutCurrency: string;
}

export const DEFAULT_SELLER_PAYMENT_SETTINGS: SellerPaymentSettings = {
  defaultPaymentCycle: SellerPaymentCycle.WEEKLY,
  minimumPayoutAmount: 10,
  payoutProcessingDays: 3,
  paymentHoldDays: 7,
  enableAutoPayout: true,
  payoutMethods: ['BANK', 'PAYPAL'],
  payoutCurrency: 'USD',
};

/**
 * Seller onboarding settings
 */
export interface SellerOnboardingSettings {
  /** Required documents */
  requiredDocuments: (
    'BUSINESS_LICENSE' | 'TAX_ID' | 'BANK_ACCOUNT' | 'ID_PROOF' | 'ADDRESS_PROOF'
  )[];
  /** Verification time in hours */
  verificationTimeHours: number;
  /** Approval time in hours */
  approvalTimeHours: number;
  /** Enable automatic approval */
  enableAutoApproval: boolean;
  /** Auto-approval threshold */
  autoApprovalThreshold: number;
  /** Onboarding completion reward */
  completionReward: number;
}

export const DEFAULT_SELLER_ONBOARDING_SETTINGS: SellerOnboardingSettings = {
  requiredDocuments: ['BUSINESS_LICENSE', 'TAX_ID', 'BANK_ACCOUNT'],
  verificationTimeHours: 24,
  approvalTimeHours: 48,
  enableAutoApproval: false,
  autoApprovalThreshold: 80,
  completionReward: 0,
};

/**
 * Seller support settings
 */
export interface SellerSupportSettings {
  /** Support response time in hours */
  responseTimeHours: number;
  /** Resolution time in hours */
  resolutionTimeHours: number;
  /** Support priority levels */
  supportPriorityLevels: ('LOW' | 'MEDIUM' | 'HIGH' | 'URGENT')[];
  /** Enable 24/7 support */
  enable24x7Support: boolean;
  /** Support ticket escalation threshold */
  escalationThreshold: number;
  /** Maximum tickets per day */
  maxTicketsPerDay: number;
}

export const DEFAULT_SELLER_SUPPORT_SETTINGS: SellerSupportSettings = {
  responseTimeHours: 24,
  resolutionTimeHours: 48,
  supportPriorityLevels: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
  enable24x7Support: true,
  escalationThreshold: 24,
  maxTicketsPerDay: 50,
};

/**
 * Seller quality score settings
 */
export interface SellerQualityScoreSettings {
  /** Quality score calculation factors */
  factors: {
    /** Rating factor weight */
    ratingWeight: number;
    /** Completion rate weight */
    completionRateWeight: number;
    /** On-time delivery weight */
    deliveryRateWeight: number;
    /** Response time weight */
    responseTimeWeight: number;
    /** Resolution time weight */
    resolutionTimeWeight: number;
    /** Return rate weight */
    returnRateWeight: number;
  };
  /** Minimum quality score for good standing */
  goodStandingMinimum: number;
  /** Quality score thresholds */
  thresholds: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
}

export const DEFAULT_SELLER_QUALITY_SCORE_SETTINGS: SellerQualityScoreSettings = {
  factors: {
    ratingWeight: 25,
    completionRateWeight: 20,
    deliveryRateWeight: 20,
    responseTimeWeight: 15,
    resolutionTimeWeight: 10,
    returnRateWeight: 10,
  },
  goodStandingMinimum: 60,
  thresholds: {
    excellent: 90,
    good: 75,
    average: 60,
    poor: 45,
  },
};

/**
 * Seller delivery time thresholds
 */
export interface SellerDeliveryTimeThresholds {
  /** Standard delivery time in days */
  standardDeliveryDays: number;
  /** Express delivery time in days */
  expressDeliveryDays: number;
  /** International delivery time in days */
  internationalDeliveryDays: number;
  /** Late delivery threshold in days */
  lateDeliveryThreshold: number;
  /** Very late delivery threshold in days */
  veryLateDeliveryThreshold: number;
}

export const DEFAULT_SELLER_DELIVERY_TIME_THRESHOLDS: SellerDeliveryTimeThresholds = {
  standardDeliveryDays: 5,
  expressDeliveryDays: 2,
  internationalDeliveryDays: 14,
  lateDeliveryThreshold: 7,
  veryLateDeliveryThreshold: 14,
};

/**
 * Seller inventory sync settings
 */
export interface SellerInventorySyncSettings {
  /** Sync interval in minutes */
  syncIntervalMinutes: number;
  /** Enable real-time sync */
  enableRealTimeSync: boolean;
  /** Enable automatic stock update */
  enableAutoStockUpdate: boolean;
  /** Stock update threshold */
  stockUpdateThreshold: number;
  /** Low stock alert threshold */
  lowStockAlertThreshold: number;
  /** Sync retry attempts */
  retryAttempts: number;
  /** Sync timeout in seconds */
  syncTimeoutSeconds: number;
}

export const DEFAULT_SELLER_INVENTORY_SYNC_SETTINGS: SellerInventorySyncSettings = {
  syncIntervalMinutes: 60,
  enableRealTimeSync: true,
  enableAutoStockUpdate: true,
  stockUpdateThreshold: 5,
  lowStockAlertThreshold: 10,
  retryAttempts: 3,
  syncTimeoutSeconds: 30,
};

/**
 * Seller analytics configuration
 */
export const SELLER_ANALYTICS_CONFIG = {
  /** Maximum sellers to process */
  MAX_SELLERS: 10000,
  /** Seller analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Seller query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum sellers in report */
  MAX_SELLERS_IN_REPORT: 1000,
  /** Seller data export limit */
  EXPORT_LIMIT: 50000,
  /** Seller analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Seller status
 */
export enum SellerStatus {
  /** Pending approval */
  PENDING = 'PENDING',
  /** Active seller */
  ACTIVE = 'ACTIVE',
  /** Suspended seller */
  SUSPENDED = 'SUSPENDED',
  /** Banned seller */
  BANNED = 'BANNED',
  /** Inactive seller */
  INACTIVE = 'INACTIVE',
  /** Under review */
  REVIEW = 'REVIEW',
}

/**
 * Seller functions
 */
export function getSellerTierLabel(tier: SellerTier): string {
  return tier;
}

export function getSellerStatusLabel(status: SellerStatus): string {
  return status;
}

export function getSellerTierFromRequirements(
  salesVolume: number,
  orderCount: number,
  rating: number,
  completionRate: number,
  onTimeDeliveryRate: number,
  tenureDays: number
): SellerTier {
  const tiers = [
    SellerTier.ELITE,
    SellerTier.DIAMOND,
    SellerTier.PLATINUM,
    SellerTier.GOLD,
    SellerTier.SILVER,
    SellerTier.BRONZE,
    SellerTier.NEW,
  ];

  for (const tier of tiers) {
    const req = SELLER_TIER_REQUIREMENTS[tier];
    if (
      salesVolume >= req.minSalesVolume &&
      orderCount >= req.minOrderCount &&
      rating >= req.minRating &&
      completionRate >= req.minCompletionRate &&
      onTimeDeliveryRate >= req.minOnTimeDeliveryRate &&
      tenureDays >= req.minTenureDays
    ) {
      return tier;
    }
  }
  return SellerTier.NEW;
}

export function calculateSellerQualityScore(
  rating: number,
  completionRate: number,
  deliveryRate: number,
  responseTime: number,
  resolutionTime: number,
  returnRate: number,
  settings: SellerQualityScoreSettings = DEFAULT_SELLER_QUALITY_SCORE_SETTINGS
): number {
  const { factors } = settings;

  // Normalize values to 0-100 scale
  const ratingScore = (rating / 5) * 100;
  const completionScore = completionRate;
  const deliveryScore = deliveryRate;
  const responseScore = Math.max(0, 100 - (responseTime / 24) * 20);
  const resolutionScore = Math.max(0, 100 - (resolutionTime / 48) * 20);
  const returnScore = Math.max(0, 100 - returnRate * 5);

  const weightedScore =
    (ratingScore * factors.ratingWeight +
      completionScore * factors.completionRateWeight +
      deliveryScore * factors.deliveryRateWeight +
      responseScore * factors.responseTimeWeight +
      resolutionScore * factors.resolutionTimeWeight +
      returnScore * factors.returnRateWeight) /
    100;

  return Math.min(100, Math.max(0, weightedScore));
}
