/**
 * Loyalty Constants
 * Core loyalty program configuration and settings
 */

export const MARKETINGLOYALTY = {
  // Loyalty Programs
  PROGRAMS: {
    STANDARD: 'standard',
    PREMIUM: 'premium',
    VIP: 'vip',
    ELITE: 'elite',
    ENTERPRISE: 'enterprise',
    PARTNERSHIP: 'partnership',
    CO_BRANDED: 'co_branded',
    COMMUNITY: 'community',
    GAMIFIED: 'gamified',
    SUBSCRIPTION: 'subscription',
  } as const,

  // Loyalty Types
  TYPES: {
    POINTS_BASED: 'points_based',
    TIER_BASED: 'tier_based',
    HYBRID: 'hybrid',
    CASHBACK: 'cashback',
    MEMBERSHIP: 'membership',
    SUBSCRIPTION: 'subscription',
    PARTNERSHIP: 'partnership',
    GAMIFIED: 'gamified',
    COMMUNITY: 'community',
  } as const,

  // Loyalty Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    TERMINATED: 'terminated',
    PENDING: 'pending',
    EXPIRED: 'expired',
    DORMANT: 'dormant',
    FROZEN: 'frozen',
    REINSTATED: 'reinstated',
  } as const,

  // Loyalty Sources
  SOURCES: {
    PURCHASE: 'purchase',
    REFERRAL: 'referral',
    REVIEW: 'review',
    SOCIAL_SHARE: 'social_share',
    SURVEY: 'survey',
    FEEDBACK: 'feedback',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    SPECIAL_EVENT: 'special_event',
    PROMOTION: 'promotion',
    CHALLENGE: 'challenge',
    MILESTONE: 'milestone',
    BONUS: 'bonus',
    ADJUSTMENT: 'adjustment',
    EXPIRATION: 'expiration',
    CANCELLATION: 'cancellation',
  } as const,

  // Loyalty Defaults
  DEFAULTS: {
    DEFAULT_PROGRAM: 'standard',
    DEFAULT_POINTS_PER_PURCHASE: 10,
    DEFAULT_POINTS_PER_REFERRAL: 50,
    DEFAULT_POINTS_PER_REVIEW: 20,
    DEFAULT_POINTS_PER_SOCIAL_SHARE: 15,
    DEFAULT_POINTS_PER_SURVEY: 30,
    DEFAULT_POINTS_EXPIRY_DAYS: 365,
    DEFAULT_INACTIVITY_DAYS: 90,
    DEFAULT_MINIMUM_POINTS: 0,
    DEFAULT_MAXIMUM_POINTS: 1000000,
    DEFAULT_TIER_UPGRADE_POINTS: 1000,
    DEFAULT_TIER_DOWNGRADE_DAYS: 90,
  } as const,

  // Loyalty Limits
  LIMITS: {
    MIN_PROGRAM_NAME_LENGTH: 3,
    MAX_PROGRAM_NAME_LENGTH: 100,
    MAX_PROGRAM_DESCRIPTION_LENGTH: 500,
    MAX_LOYALTY_PROGRAMS_PER_USER: 5,
    MAX_TIERS_PER_PROGRAM: 10,
    MAX_POINTS_PER_TRANSACTION: 10000,
    MAX_POINTS_PER_DAY: 50000,
    MAX_POINTS_PER_MONTH: 500000,
    MIN_POINTS_TO_REDEEM: 100,
    MAX_POINTS_TO_REDEEM: 100000,
    MIN_POINTS_EXPIRY_DAYS: 30,
    MAX_POINTS_EXPIRY_DAYS: 730,
    MIN_INACTIVITY_DAYS: 30,
    MAX_INACTIVITY_DAYS: 365,
  } as const,
} as const;

// Loyalty Programs
export type MarketingLoyaltyProgram =
  (typeof MARKETINGLOYALTY.PROGRAMS)[keyof typeof MARKETINGLOYALTY.PROGRAMS];

// Loyalty Types
export type MarketingLoyaltyType =
  (typeof MARKETINGLOYALTY.TYPES)[keyof typeof MARKETINGLOYALTY.TYPES];

// Loyalty Statuses
export type MarketingLoyaltyStatus =
  (typeof MARKETINGLOYALTY.STATUSES)[keyof typeof MARKETINGLOYALTY.STATUSES];

// Loyalty Sources
export type MarketingLoyaltySource =
  (typeof MARKETINGLOYALTY.SOURCES)[keyof typeof MARKETINGLOYALTY.SOURCES];

// Loyalty Defaults
export type MarketingLoyaltyDefault =
  (typeof MARKETINGLOYALTY.DEFAULTS)[keyof typeof MARKETINGLOYALTY.DEFAULTS];

// Loyalty Limits
export type MarketingLoyaltyLimit =
  (typeof MARKETINGLOYALTY.LIMITS)[keyof typeof MARKETINGLOYALTY.LIMITS];

// Utility Functions
export function marketingloyaltyGetProgramLabel(program: MarketingLoyaltyProgram): string {
  const labels: Record<MarketingLoyaltyProgram, string> = {
    [MARKETINGLOYALTY.PROGRAMS.STANDARD]: 'Standard Program',
    [MARKETINGLOYALTY.PROGRAMS.PREMIUM]: 'Premium Program',
    [MARKETINGLOYALTY.PROGRAMS.VIP]: 'VIP Program',
    [MARKETINGLOYALTY.PROGRAMS.ELITE]: 'Elite Program',
    [MARKETINGLOYALTY.PROGRAMS.ENTERPRISE]: 'Enterprise Program',
    [MARKETINGLOYALTY.PROGRAMS.PARTNERSHIP]: 'Partnership Program',
    [MARKETINGLOYALTY.PROGRAMS.CO_BRANDED]: 'Co-Branded Program',
    [MARKETINGLOYALTY.PROGRAMS.COMMUNITY]: 'Community Program',
    [MARKETINGLOYALTY.PROGRAMS.GAMIFIED]: 'Gamified Program',
    [MARKETINGLOYALTY.PROGRAMS.SUBSCRIPTION]: 'Subscription Program',
  };
  return labels[program] || 'Unknown Program';
}

export function marketingloyaltyGetTypeLabel(type: MarketingLoyaltyType): string {
  const labels: Record<MarketingLoyaltyType, string> = {
    [MARKETINGLOYALTY.TYPES.POINTS_BASED]: 'Points Based',
    [MARKETINGLOYALTY.TYPES.TIER_BASED]: 'Tier Based',
    [MARKETINGLOYALTY.TYPES.HYBRID]: 'Hybrid',
    [MARKETINGLOYALTY.TYPES.CASHBACK]: 'Cashback',
    [MARKETINGLOYALTY.TYPES.MEMBERSHIP]: 'Membership',
    [MARKETINGLOYALTY.TYPES.SUBSCRIPTION]: 'Subscription',
    [MARKETINGLOYALTY.TYPES.PARTNERSHIP]: 'Partnership',
    [MARKETINGLOYALTY.TYPES.GAMIFIED]: 'Gamified',
    [MARKETINGLOYALTY.TYPES.COMMUNITY]: 'Community',
  };
  return labels[type] || 'Unknown Type';
}

export function marketingloyaltyGetStatusLabel(status: MarketingLoyaltyStatus): string {
  const labels: Record<MarketingLoyaltyStatus, string> = {
    [MARKETINGLOYALTY.STATUSES.ACTIVE]: 'Active',
    [MARKETINGLOYALTY.STATUSES.INACTIVE]: 'Inactive',
    [MARKETINGLOYALTY.STATUSES.SUSPENDED]: 'Suspended',
    [MARKETINGLOYALTY.STATUSES.TERMINATED]: 'Terminated',
    [MARKETINGLOYALTY.STATUSES.PENDING]: 'Pending',
    [MARKETINGLOYALTY.STATUSES.EXPIRED]: 'Expired',
    [MARKETINGLOYALTY.STATUSES.DORMANT]: 'Dormant',
    [MARKETINGLOYALTY.STATUSES.FROZEN]: 'Frozen',
    [MARKETINGLOYALTY.STATUSES.REINSTATED]: 'Reinstated',
  };
  return labels[status] || 'Unknown Status';
}

export function marketingloyaltyGetSourceLabel(source: MarketingLoyaltySource): string {
  const labels: Record<MarketingLoyaltySource, string> = {
    [MARKETINGLOYALTY.SOURCES.PURCHASE]: 'Purchase',
    [MARKETINGLOYALTY.SOURCES.REFERRAL]: 'Referral',
    [MARKETINGLOYALTY.SOURCES.REVIEW]: 'Review',
    [MARKETINGLOYALTY.SOURCES.SOCIAL_SHARE]: 'Social Share',
    [MARKETINGLOYALTY.SOURCES.SURVEY]: 'Survey',
    [MARKETINGLOYALTY.SOURCES.FEEDBACK]: 'Feedback',
    [MARKETINGLOYALTY.SOURCES.BIRTHDAY]: 'Birthday',
    [MARKETINGLOYALTY.SOURCES.ANNIVERSARY]: 'Anniversary',
    [MARKETINGLOYALTY.SOURCES.SPECIAL_EVENT]: 'Special Event',
    [MARKETINGLOYALTY.SOURCES.PROMOTION]: 'Promotion',
    [MARKETINGLOYALTY.SOURCES.CHALLENGE]: 'Challenge',
    [MARKETINGLOYALTY.SOURCES.MILESTONE]: 'Milestone',
    [MARKETINGLOYALTY.SOURCES.BONUS]: 'Bonus',
    [MARKETINGLOYALTY.SOURCES.ADJUSTMENT]: 'Adjustment',
    [MARKETINGLOYALTY.SOURCES.EXPIRATION]: 'Expiration',
    [MARKETINGLOYALTY.SOURCES.CANCELLATION]: 'Cancellation',
  };
  return labels[source] || 'Unknown Source';
}

export function marketingloyaltyGetDefaultPointsPerPurchase(): number {
  return MARKETINGLOYALTY.DEFAULTS.DEFAULT_POINTS_PER_PURCHASE;
}

export function marketingloyaltyGetDefaultPointsExpiryDays(): number {
  return MARKETINGLOYALTY.DEFAULTS.DEFAULT_POINTS_EXPIRY_DAYS;
}

export function marketingloyaltyGetDefaultInactivityDays(): number {
  return MARKETINGLOYALTY.DEFAULTS.DEFAULT_INACTIVITY_DAYS;
}

export function marketingloyaltyIsActiveStatus(status: MarketingLoyaltyStatus): boolean {
  const activeStatuses: MarketingLoyaltyStatus[] = [
    MARKETINGLOYALTY.STATUSES.ACTIVE,
    MARKETINGLOYALTY.STATUSES.REINSTATED,
  ];
  return activeStatuses.includes(status);
}

export function marketingloyaltyIsInactiveStatus(status: MarketingLoyaltyStatus): boolean {
  const inactiveStatuses: MarketingLoyaltyStatus[] = [
    MARKETINGLOYALTY.STATUSES.INACTIVE,
    MARKETINGLOYALTY.STATUSES.DORMANT,
    MARKETINGLOYALTY.STATUSES.FROZEN,
  ];
  return inactiveStatuses.includes(status);
}

export function marketingloyaltyIsTerminatedStatus(status: MarketingLoyaltyStatus): boolean {
  const terminatedStatuses: MarketingLoyaltyStatus[] = [
    MARKETINGLOYALTY.STATUSES.TERMINATED,
    MARKETINGLOYALTY.STATUSES.EXPIRED,
  ];
  return terminatedStatuses.includes(status);
}
