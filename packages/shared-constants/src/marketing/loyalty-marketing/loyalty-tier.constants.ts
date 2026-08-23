/**
 * Loyalty Tier Constants
 * Tier configurations for loyalty programs
 */

export const MARKETINGLOYALTY_TIER = {
  // Tier Levels
  LEVELS: {
    BRONZE: 'bronze',
    SILVER: 'silver',
    GOLD: 'gold',
    PLATINUM: 'platinum',
    DIAMOND: 'diamond',
    ELITE: 'elite',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    VIP: 'vip',
    PRESIDENTIAL: 'presidential',
  } as const,

  // Tier Types
  TYPES: {
    STANDARD: 'standard',
    PROGRESSIVE: 'progressive',
    REGRESSIVE: 'regressive',
    HYBRID: 'hybrid',
    DYNAMIC: 'dynamic',
    MANUAL: 'manual',
  } as const,

  // Tier Requirements
  REQUIREMENTS: {
    MINIMUM_POINTS: 'minimum_points',
    MINIMUM_PURCHASES: 'minimum_purchases',
    MINIMUM_ORDERS: 'minimum_orders',
    MINIMUM_SPEND: 'minimum_spend',
    MINIMUM_VISITS: 'minimum_visits',
    MINIMUM_ENGAGEMENT: 'minimum_engagement',
    MINIMUM_REFERRALS: 'minimum_referrals',
    MINIMUM_REVIEWS: 'minimum_reviews',
    CUSTOM: 'custom',
  } as const,

  // Tier Benefits
  BENEFITS: {
    DISCOUNT: 'discount',
    FREE_SHIPPING: 'free_shipping',
    PRIORITY_ACCESS: 'priority_access',
    EXCLUSIVE_OFFERS: 'exclusive_offers',
    EARLY_ACCESS: 'early_access',
    BIRTHDAY_BONUS: 'birthday_bonus',
    REFERRAL_BONUS: 'referral_bonus',
    POINTS_MULTIPLIER: 'points_multiplier',
    FREE_GIFT: 'free_gift',
    VIP_SUPPORT: 'vip_support',
    FREE_UPGRADE: 'free_upgrade',
    EXPERIENCE_ACCESS: 'experience_access',
    PARTNER_OFFERS: 'partner_offers',
    CUSTOM: 'custom',
  } as const,

  // Tier Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING_UPGRADE: 'pending_upgrade',
    PENDING_DOWNGRADE: 'pending_downgrade',
    SUSPENDED: 'suspended',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
  } as const,

  // Tier Color Codes (for UI)
  COLORS: {
    BRONZE: '#CD7F32',
    SILVER: '#C0C0C0',
    GOLD: '#FFD700',
    PLATINUM: '#E5E4E2',
    DIAMOND: '#B9F2FF',
    ELITE: '#1A1A2E',
    PREMIUM: '#16213E',
    ENTERPRISE: '#0F3460',
    VIP: '#6C2BD9',
    PRESIDENTIAL: '#D4AF37',
  } as const,

  // Tier Requirements Defaults
  DEFAULTS: {
    DEFAULT_TIER: 'bronze',
    DEFAULT_TYPE: 'standard',
    DEFAULT_MINIMUM_POINTS: 0,
    DEFAULT_MINIMUM_PURCHASES: 0,
    DEFAULT_MINIMUM_ORDERS: 0,
    DEFAULT_MINIMUM_SPEND: 0,
    DEFAULT_POINTS_MULTIPLIER: 1,
    DEFAULT_DISCOUNT_RATE: 0,
    DEFAULT_REQUIREMENT: 'minimum_points',
  } as const,

  // Tier Limits
  LIMITS: {
    MIN_TIERS: 2,
    MAX_TIERS: 10,
    MIN_TIER_NAME_LENGTH: 3,
    MAX_TIER_NAME_LENGTH: 50,
    MIN_POINTS_FOR_TIER: 0,
    MAX_POINTS_FOR_TIER: 1000000,
    MIN_PURCHASES_FOR_TIER: 0,
    MAX_PURCHASES_FOR_TIER: 1000,
    MIN_SPEND_FOR_TIER: 0,
    MAX_SPEND_FOR_TIER: 1000000,
    MIN_DISCOUNT_RATE: 0,
    MAX_DISCOUNT_RATE: 100,
    MIN_POINTS_MULTIPLIER: 1,
    MAX_POINTS_MULTIPLIER: 10,
    MAX_BENEFITS_PER_TIER: 20,
  } as const,
} as const;

// Tier Levels
export type MarketingLoyaltyTierLevel =
  (typeof MARKETINGLOYALTY_TIER.LEVELS)[keyof typeof MARKETINGLOYALTY_TIER.LEVELS];

// Tier Types
export type MarketingLoyaltyTierType =
  (typeof MARKETINGLOYALTY_TIER.TYPES)[keyof typeof MARKETINGLOYALTY_TIER.TYPES];

// Tier Requirements
export type MarketingLoyaltyTierRequirement =
  (typeof MARKETINGLOYALTY_TIER.REQUIREMENTS)[keyof typeof MARKETINGLOYALTY_TIER.REQUIREMENTS];

// Tier Benefits
export type MarketingLoyaltyTierBenefit =
  (typeof MARKETINGLOYALTY_TIER.BENEFITS)[keyof typeof MARKETINGLOYALTY_TIER.BENEFITS];

// Tier Statuses
export type MarketingLoyaltyTierStatus =
  (typeof MARKETINGLOYALTY_TIER.STATUSES)[keyof typeof MARKETINGLOYALTY_TIER.STATUSES];

// Tier Color Codes
export type MarketingLoyaltyTierColor =
  (typeof MARKETINGLOYALTY_TIER.COLORS)[keyof typeof MARKETINGLOYALTY_TIER.COLORS];

// Tier Defaults
export type MarketingLoyaltyTierDefault =
  (typeof MARKETINGLOYALTY_TIER.DEFAULTS)[keyof typeof MARKETINGLOYALTY_TIER.DEFAULTS];

// Tier Limits
export type MarketingLoyaltyTierLimit =
  (typeof MARKETINGLOYALTY_TIER.LIMITS)[keyof typeof MARKETINGLOYALTY_TIER.LIMITS];

// Utility Functions
export function marketingloyaltyGetTierLevelLabel(level: MarketingLoyaltyTierLevel): string {
  const labels: Record<MarketingLoyaltyTierLevel, string> = {
    [MARKETINGLOYALTY_TIER.LEVELS.BRONZE]: 'Bronze',
    [MARKETINGLOYALTY_TIER.LEVELS.SILVER]: 'Silver',
    [MARKETINGLOYALTY_TIER.LEVELS.GOLD]: 'Gold',
    [MARKETINGLOYALTY_TIER.LEVELS.PLATINUM]: 'Platinum',
    [MARKETINGLOYALTY_TIER.LEVELS.DIAMOND]: 'Diamond',
    [MARKETINGLOYALTY_TIER.LEVELS.ELITE]: 'Elite',
    [MARKETINGLOYALTY_TIER.LEVELS.PREMIUM]: 'Premium',
    [MARKETINGLOYALTY_TIER.LEVELS.ENTERPRISE]: 'Enterprise',
    [MARKETINGLOYALTY_TIER.LEVELS.VIP]: 'VIP',
    [MARKETINGLOYALTY_TIER.LEVELS.PRESIDENTIAL]: 'Presidential',
  };
  return labels[level] || 'Unknown Tier Level';
}

export function marketingloyaltyGetTierTypeLabel(type: MarketingLoyaltyTierType): string {
  const labels: Record<MarketingLoyaltyTierType, string> = {
    [MARKETINGLOYALTY_TIER.TYPES.STANDARD]: 'Standard',
    [MARKETINGLOYALTY_TIER.TYPES.PROGRESSIVE]: 'Progressive',
    [MARKETINGLOYALTY_TIER.TYPES.REGRESSIVE]: 'Regressive',
    [MARKETINGLOYALTY_TIER.TYPES.HYBRID]: 'Hybrid',
    [MARKETINGLOYALTY_TIER.TYPES.DYNAMIC]: 'Dynamic',
    [MARKETINGLOYALTY_TIER.TYPES.MANUAL]: 'Manual',
  };
  return labels[type] || 'Unknown Tier Type';
}

export function marketingloyaltyGetTierRequirementLabel(
  requirement: MarketingLoyaltyTierRequirement
): string {
  const labels: Record<MarketingLoyaltyTierRequirement, string> = {
    [MARKETINGLOYALTY_TIER.REQUIREMENTS.MINIMUM_POINTS]: 'Minimum Points',
    [MARKETINGLOYALTY_TIER.REQUIREMENTS.MINIMUM_PURCHASES]: 'Minimum Purchases',
    [MARKETINGLOYALTY_TIER.REQUIREMENTS.MINIMUM_ORDERS]: 'Minimum Orders',
    [MARKETINGLOYALTY_TIER.REQUIREMENTS.MINIMUM_SPEND]: 'Minimum Spend',
    [MARKETINGLOYALTY_TIER.REQUIREMENTS.MINIMUM_VISITS]: 'Minimum Visits',
    [MARKETINGLOYALTY_TIER.REQUIREMENTS.MINIMUM_ENGAGEMENT]: 'Minimum Engagement',
    [MARKETINGLOYALTY_TIER.REQUIREMENTS.MINIMUM_REFERRALS]: 'Minimum Referrals',
    [MARKETINGLOYALTY_TIER.REQUIREMENTS.MINIMUM_REVIEWS]: 'Minimum Reviews',
    [MARKETINGLOYALTY_TIER.REQUIREMENTS.CUSTOM]: 'Custom Requirement',
  };
  return labels[requirement] || 'Unknown Requirement';
}

export function marketingloyaltyGetTierBenefitLabel(benefit: MarketingLoyaltyTierBenefit): string {
  const labels: Record<MarketingLoyaltyTierBenefit, string> = {
    [MARKETINGLOYALTY_TIER.BENEFITS.DISCOUNT]: 'Discount',
    [MARKETINGLOYALTY_TIER.BENEFITS.FREE_SHIPPING]: 'Free Shipping',
    [MARKETINGLOYALTY_TIER.BENEFITS.PRIORITY_ACCESS]: 'Priority Access',
    [MARKETINGLOYALTY_TIER.BENEFITS.EXCLUSIVE_OFFERS]: 'Exclusive Offers',
    [MARKETINGLOYALTY_TIER.BENEFITS.EARLY_ACCESS]: 'Early Access',
    [MARKETINGLOYALTY_TIER.BENEFITS.BIRTHDAY_BONUS]: 'Birthday Bonus',
    [MARKETINGLOYALTY_TIER.BENEFITS.REFERRAL_BONUS]: 'Referral Bonus',
    [MARKETINGLOYALTY_TIER.BENEFITS.POINTS_MULTIPLIER]: 'Points Multiplier',
    [MARKETINGLOYALTY_TIER.BENEFITS.FREE_GIFT]: 'Free Gift',
    [MARKETINGLOYALTY_TIER.BENEFITS.VIP_SUPPORT]: 'VIP Support',
    [MARKETINGLOYALTY_TIER.BENEFITS.FREE_UPGRADE]: 'Free Upgrade',
    [MARKETINGLOYALTY_TIER.BENEFITS.EXPERIENCE_ACCESS]: 'Experience Access',
    [MARKETINGLOYALTY_TIER.BENEFITS.PARTNER_OFFERS]: 'Partner Offers',
    [MARKETINGLOYALTY_TIER.BENEFITS.CUSTOM]: 'Custom Benefit',
  };
  return labels[benefit] || 'Unknown Benefit';
}

export function marketingloyaltyGetTierStatusLabel(status: MarketingLoyaltyTierStatus): string {
  const labels: Record<MarketingLoyaltyTierStatus, string> = {
    [MARKETINGLOYALTY_TIER.STATUSES.ACTIVE]: 'Active',
    [MARKETINGLOYALTY_TIER.STATUSES.INACTIVE]: 'Inactive',
    [MARKETINGLOYALTY_TIER.STATUSES.PENDING_UPGRADE]: 'Pending Upgrade',
    [MARKETINGLOYALTY_TIER.STATUSES.PENDING_DOWNGRADE]: 'Pending Downgrade',
    [MARKETINGLOYALTY_TIER.STATUSES.SUSPENDED]: 'Suspended',
    [MARKETINGLOYALTY_TIER.STATUSES.EXPIRED]: 'Expired',
    [MARKETINGLOYALTY_TIER.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Tier Status';
}

export function marketingloyaltyGetTierColor(
  level: MarketingLoyaltyTierLevel
): MarketingLoyaltyTierColor {
  const colors: Record<MarketingLoyaltyTierLevel, MarketingLoyaltyTierColor> = {
    [MARKETINGLOYALTY_TIER.LEVELS.BRONZE]: MARKETINGLOYALTY_TIER.COLORS.BRONZE,
    [MARKETINGLOYALTY_TIER.LEVELS.SILVER]: MARKETINGLOYALTY_TIER.COLORS.SILVER,
    [MARKETINGLOYALTY_TIER.LEVELS.GOLD]: MARKETINGLOYALTY_TIER.COLORS.GOLD,
    [MARKETINGLOYALTY_TIER.LEVELS.PLATINUM]: MARKETINGLOYALTY_TIER.COLORS.PLATINUM,
    [MARKETINGLOYALTY_TIER.LEVELS.DIAMOND]: MARKETINGLOYALTY_TIER.COLORS.DIAMOND,
    [MARKETINGLOYALTY_TIER.LEVELS.ELITE]: MARKETINGLOYALTY_TIER.COLORS.ELITE,
    [MARKETINGLOYALTY_TIER.LEVELS.PREMIUM]: MARKETINGLOYALTY_TIER.COLORS.PREMIUM,
    [MARKETINGLOYALTY_TIER.LEVELS.ENTERPRISE]: MARKETINGLOYALTY_TIER.COLORS.ENTERPRISE,
    [MARKETINGLOYALTY_TIER.LEVELS.VIP]: MARKETINGLOYALTY_TIER.COLORS.VIP,
    [MARKETINGLOYALTY_TIER.LEVELS.PRESIDENTIAL]: MARKETINGLOYALTY_TIER.COLORS.PRESIDENTIAL,
  };
  return colors[level] || MARKETINGLOYALTY_TIER.COLORS.BRONZE;
}

export function marketingloyaltyGetTierByPoints(points: number): MarketingLoyaltyTierLevel {
  if (points >= 10000) return MARKETINGLOYALTY_TIER.LEVELS.PRESIDENTIAL;
  if (points >= 5000) return MARKETINGLOYALTY_TIER.LEVELS.VIP;
  if (points >= 2500) return MARKETINGLOYALTY_TIER.LEVELS.ELITE;
  if (points >= 1500) return MARKETINGLOYALTY_TIER.LEVELS.PLATINUM;
  if (points >= 1000) return MARKETINGLOYALTY_TIER.LEVELS.GOLD;
  if (points >= 500) return MARKETINGLOYALTY_TIER.LEVELS.SILVER;
  if (points >= 100) return MARKETINGLOYALTY_TIER.LEVELS.BRONZE;
  return MARKETINGLOYALTY_TIER.LEVELS.BRONZE;
}

export function marketingloyaltyIsTopTier(level: MarketingLoyaltyTierLevel): boolean {
  const topTiers: MarketingLoyaltyTierLevel[] = [
    MARKETINGLOYALTY_TIER.LEVELS.DIAMOND,
    MARKETINGLOYALTY_TIER.LEVELS.ELITE,
    MARKETINGLOYALTY_TIER.LEVELS.PREMIUM,
    MARKETINGLOYALTY_TIER.LEVELS.ENTERPRISE,
    MARKETINGLOYALTY_TIER.LEVELS.VIP,
    MARKETINGLOYALTY_TIER.LEVELS.PRESIDENTIAL,
  ];
  return topTiers.includes(level);
}

export function marketingloyaltyIsMidTier(level: MarketingLoyaltyTierLevel): boolean {
  const midTiers: MarketingLoyaltyTierLevel[] = [
    MARKETINGLOYALTY_TIER.LEVELS.GOLD,
    MARKETINGLOYALTY_TIER.LEVELS.PLATINUM,
  ];
  return midTiers.includes(level);
}
