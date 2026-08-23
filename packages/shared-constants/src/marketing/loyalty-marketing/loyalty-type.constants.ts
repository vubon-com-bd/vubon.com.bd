/**
 * Loyalty Type Constants
 * Type definitions and classifications for loyalty programs
 */

export const MARKETINGLOYALTY_TYPE = {
  // Loyalty Categories
  CATEGORIES: {
    POINTS: 'points',
    TIER: 'tier',
    CASHBACK: 'cashback',
    MEMBERSHIP: 'membership',
    SUBSCRIPTION: 'subscription',
    PARTNERSHIP: 'partnership',
    GAMIFIED: 'gamified',
    COMMUNITY: 'community',
    HYBRID: 'hybrid',
  } as const,

  // Loyalty Sub-Types
  SUB_TYPES: {
    // Points Based
    EARN_AND_BURN: 'earn_and_burn',
    EARN_ONLY: 'earn_only',
    BURN_ONLY: 'burn_only',

    // Tier Based
    PROGRESSIVE: 'progressive',
    REGRESSIVE: 'regressive',
    HYBRID_TIER: 'hybrid_tier',

    // Cashback
    FLAT_RATE: 'flat_rate',
    SLAB_RATE: 'slab_rate',
    DYNAMIC_RATE: 'dynamic_rate',

    // Membership
    FREE: 'free',
    PAID: 'paid',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',

    // Subscription
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ANNUAL: 'annual',
    LIFETIME: 'lifetime',

    // Partnership
    CO_BRANDED: 'co_branded',
    AFFILIATE: 'affiliate',
    NETWORK: 'network',

    // Gamified
    BADGE: 'badge',
    LEVEL: 'level',
    CHALLENGE: 'challenge',
    COMPETITION: 'competition',

    // Community
    SOCIAL: 'social',
    REFERRAL: 'referral',
    REVIEW: 'review',
    CONTRIBUTION: 'contribution',
  } as const,

  // Loyalty Models
  MODELS: {
    TRADITIONAL: 'traditional',
    MODERN: 'modern',
    HYBRID: 'hybrid',
    DYNAMIC: 'dynamic',
    PERSONALIZED: 'personalized',
    BEHAVIORAL: 'behavioral',
  } as const,

  // Loyalty Engagement Levels
  ENGAGEMENT_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
    PREMIUM: 'premium',
  } as const,

  // Loyalty Participation Types
  PARTICIPATION_TYPES: {
    OPT_IN: 'opt_in',
    OPT_OUT: 'opt_out',
    MANDATORY: 'mandatory',
    VOLUNTARY: 'voluntary',
    INVITE_ONLY: 'invite_only',
  } as const,
} as const;

// Loyalty Categories
export type MarketingLoyaltyCategory =
  (typeof MARKETINGLOYALTY_TYPE.CATEGORIES)[keyof typeof MARKETINGLOYALTY_TYPE.CATEGORIES];

// Loyalty Sub-Types
export type MarketingLoyaltySubType =
  (typeof MARKETINGLOYALTY_TYPE.SUB_TYPES)[keyof typeof MARKETINGLOYALTY_TYPE.SUB_TYPES];

// Loyalty Models
export type MarketingLoyaltyModel =
  (typeof MARKETINGLOYALTY_TYPE.MODELS)[keyof typeof MARKETINGLOYALTY_TYPE.MODELS];

// Loyalty Engagement Levels
export type MarketingLoyaltyEngagementLevel =
  (typeof MARKETINGLOYALTY_TYPE.ENGAGEMENT_LEVELS)[keyof typeof MARKETINGLOYALTY_TYPE.ENGAGEMENT_LEVELS];

// Loyalty Participation Types
export type MarketingLoyaltyParticipationType =
  (typeof MARKETINGLOYALTY_TYPE.PARTICIPATION_TYPES)[keyof typeof MARKETINGLOYALTY_TYPE.PARTICIPATION_TYPES];

// Utility Functions
export function marketingloyaltyGetCategoryLabel(category: MarketingLoyaltyCategory): string {
  const labels: Record<MarketingLoyaltyCategory, string> = {
    [MARKETINGLOYALTY_TYPE.CATEGORIES.POINTS]: 'Points Based',
    [MARKETINGLOYALTY_TYPE.CATEGORIES.TIER]: 'Tier Based',
    [MARKETINGLOYALTY_TYPE.CATEGORIES.CASHBACK]: 'Cashback',
    [MARKETINGLOYALTY_TYPE.CATEGORIES.MEMBERSHIP]: 'Membership',
    [MARKETINGLOYALTY_TYPE.CATEGORIES.SUBSCRIPTION]: 'Subscription',
    [MARKETINGLOYALTY_TYPE.CATEGORIES.PARTNERSHIP]: 'Partnership',
    [MARKETINGLOYALTY_TYPE.CATEGORIES.GAMIFIED]: 'Gamified',
    [MARKETINGLOYALTY_TYPE.CATEGORIES.COMMUNITY]: 'Community',
    [MARKETINGLOYALTY_TYPE.CATEGORIES.HYBRID]: 'Hybrid',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingloyaltyGetSubTypeLabel(subType: MarketingLoyaltySubType): string {
  const labels: Record<MarketingLoyaltySubType, string> = {
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.EARN_AND_BURN]: 'Earn and Burn',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.EARN_ONLY]: 'Earn Only',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.BURN_ONLY]: 'Burn Only',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.PROGRESSIVE]: 'Progressive',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.REGRESSIVE]: 'Regressive',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.HYBRID_TIER]: 'Hybrid Tier',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.FLAT_RATE]: 'Flat Rate',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.SLAB_RATE]: 'Slab Rate',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.DYNAMIC_RATE]: 'Dynamic Rate',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.FREE]: 'Free',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.PAID]: 'Paid',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.PREMIUM]: 'Premium',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.ENTERPRISE]: 'Enterprise',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.MONTHLY]: 'Monthly',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.QUARTERLY]: 'Quarterly',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.ANNUAL]: 'Annual',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.LIFETIME]: 'Lifetime',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.CO_BRANDED]: 'Co-Branded',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.AFFILIATE]: 'Affiliate',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.NETWORK]: 'Network',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.BADGE]: 'Badge',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.LEVEL]: 'Level',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.CHALLENGE]: 'Challenge',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.COMPETITION]: 'Competition',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.SOCIAL]: 'Social',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.REFERRAL]: 'Referral',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.REVIEW]: 'Review',
    [MARKETINGLOYALTY_TYPE.SUB_TYPES.CONTRIBUTION]: 'Contribution',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function marketingloyaltyGetModelLabel(model: MarketingLoyaltyModel): string {
  const labels: Record<MarketingLoyaltyModel, string> = {
    [MARKETINGLOYALTY_TYPE.MODELS.TRADITIONAL]: 'Traditional',
    [MARKETINGLOYALTY_TYPE.MODELS.MODERN]: 'Modern',
    [MARKETINGLOYALTY_TYPE.MODELS.HYBRID]: 'Hybrid',
    [MARKETINGLOYALTY_TYPE.MODELS.DYNAMIC]: 'Dynamic',
    [MARKETINGLOYALTY_TYPE.MODELS.PERSONALIZED]: 'Personalized',
    [MARKETINGLOYALTY_TYPE.MODELS.BEHAVIORAL]: 'Behavioral',
  };
  return labels[model] || 'Unknown Model';
}

export function marketingloyaltyGetEngagementLevelLabel(
  level: MarketingLoyaltyEngagementLevel
): string {
  const labels: Record<MarketingLoyaltyEngagementLevel, string> = {
    [MARKETINGLOYALTY_TYPE.ENGAGEMENT_LEVELS.LOW]: 'Low',
    [MARKETINGLOYALTY_TYPE.ENGAGEMENT_LEVELS.MEDIUM]: 'Medium',
    [MARKETINGLOYALTY_TYPE.ENGAGEMENT_LEVELS.HIGH]: 'High',
    [MARKETINGLOYALTY_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH]: 'Very High',
    [MARKETINGLOYALTY_TYPE.ENGAGEMENT_LEVELS.PREMIUM]: 'Premium',
  };
  return labels[level] || 'Unknown Level';
}

export function marketingloyaltyGetParticipationTypeLabel(
  type: MarketingLoyaltyParticipationType
): string {
  const labels: Record<MarketingLoyaltyParticipationType, string> = {
    [MARKETINGLOYALTY_TYPE.PARTICIPATION_TYPES.OPT_IN]: 'Opt-In',
    [MARKETINGLOYALTY_TYPE.PARTICIPATION_TYPES.OPT_OUT]: 'Opt-Out',
    [MARKETINGLOYALTY_TYPE.PARTICIPATION_TYPES.MANDATORY]: 'Mandatory',
    [MARKETINGLOYALTY_TYPE.PARTICIPATION_TYPES.VOLUNTARY]: 'Voluntary',
    [MARKETINGLOYALTY_TYPE.PARTICIPATION_TYPES.INVITE_ONLY]: 'Invite Only',
  };
  return labels[type] || 'Unknown Participation Type';
}

export function marketingloyaltyIsPointsBased(category: MarketingLoyaltyCategory): boolean {
  return category === MARKETINGLOYALTY_TYPE.CATEGORIES.POINTS;
}

export function marketingloyaltyIsTierBased(category: MarketingLoyaltyCategory): boolean {
  return category === MARKETINGLOYALTY_TYPE.CATEGORIES.TIER;
}

export function marketingloyaltyIsCashbackBased(category: MarketingLoyaltyCategory): boolean {
  return category === MARKETINGLOYALTY_TYPE.CATEGORIES.CASHBACK;
}

export function marketingloyaltyIsMembershipBased(category: MarketingLoyaltyCategory): boolean {
  const membershipCategories: MarketingLoyaltyCategory[] = [
    MARKETINGLOYALTY_TYPE.CATEGORIES.MEMBERSHIP,
    MARKETINGLOYALTY_TYPE.CATEGORIES.SUBSCRIPTION,
  ];
  return membershipCategories.includes(category);
}
