/**
 * Flash Sale Participant Constants
 * Configuration for flash sale participants and their interactions
 */

export const FLASH_SALE_PARTICIPANT = {
  // Participant Types
  TYPES: {
    BUYER: 'buyer',
    SELLER: 'seller',
    VIEWER: 'viewer',
    VIP: 'vip',
    MEMBER: 'member',
    GUEST: 'guest',
    WHOLESALE: 'wholesale',
    RETAIL: 'retail',
  },

  // Participant Categories
  CATEGORIES: {
    INDIVIDUAL: 'individual',
    BUSINESS: 'business',
    ORGANIZATION: 'organization',
    GROUP: 'group',
    TEAM: 'team',
  },

  // Participant Roles
  ROLES: {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    SUPPORT: 'support',
    APPROVER: 'approver',
    DECISION_MAKER: 'decision_maker',
    INFLUENCER: 'influencer',
  },

  // Participant Engagement
  ENGAGEMENT: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
    MAXIMUM: 'maximum',
  },

  // Participant Activity
  ACTIVITY: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    IDLE: 'idle',
    ENGAGED: 'engaged',
    DISENGAGED: 'disengaged',
    ABANDONED: 'abandoned',
  },

  // Participant Participation
  PARTICIPATION: {
    FIRST_TIME: 'first_time',
    RECURRING: 'recurring',
    FREQUENT: 'frequent',
    OCCASIONAL: 'occasional',
    RARE: 'rare',
  },

  // Participant Defaults
  DEFAULTS: {
    MAX_PARTICIPANTS: 1000,
    MAX_ITEMS_PER_PARTICIPANT: 5,
    MAX_ORDERS_PER_PARTICIPANT: 10,
    PARTICIPATION_TIMEOUT_MINUTES: 30,
    VIEW_DURATION_MINUTES: 5,
    ENGAGEMENT_THRESHOLD: 5,
  },

  // Participant Limits
  LIMITS: {
    MAX_PARTICIPANTS_PER_SALE: 10000,
    MAX_PARTICIPANTS_PER_USER: 100,
    MAX_ITEMS_PER_PARTICIPANT: 20,
    MAX_ORDERS_PER_PARTICIPANT: 50,
    MAX_VIEWS_PER_PARTICIPANT: 100,
    MAX_ENGAGEMENT_HOURS: 24,
  },

  // Participant Validation
  VALIDATION: {
    MIN_AGE: 18,
    MIN_ORDER_AMOUNT: 0,
    MAX_ORDER_AMOUNT: 1000000,
    MAX_PARTICIPATION_PER_DAY: 10,
  },
} as const;

// Participant Types
export type FlashSaleParticipantType =
  (typeof FLASH_SALE_PARTICIPANT.TYPES)[keyof typeof FLASH_SALE_PARTICIPANT.TYPES];

// Participant Categories
export type FlashSaleParticipantCategory =
  (typeof FLASH_SALE_PARTICIPANT.CATEGORIES)[keyof typeof FLASH_SALE_PARTICIPANT.CATEGORIES];

// Participant Roles
export type FlashSaleParticipantRole =
  (typeof FLASH_SALE_PARTICIPANT.ROLES)[keyof typeof FLASH_SALE_PARTICIPANT.ROLES];

// Participant Engagement
export type FlashSaleParticipantEngagement =
  (typeof FLASH_SALE_PARTICIPANT.ENGAGEMENT)[keyof typeof FLASH_SALE_PARTICIPANT.ENGAGEMENT];

// Participant Activity
export type FlashSaleParticipantActivity =
  (typeof FLASH_SALE_PARTICIPANT.ACTIVITY)[keyof typeof FLASH_SALE_PARTICIPANT.ACTIVITY];

// Participant Participation
export type FlashSaleParticipantParticipation =
  (typeof FLASH_SALE_PARTICIPANT.PARTICIPATION)[keyof typeof FLASH_SALE_PARTICIPANT.PARTICIPATION];

// Utility Functions
export function flashsalesParticipantGetTypeLabel(type: FlashSaleParticipantType): string {
  const labels: Record<FlashSaleParticipantType, string> = {
    [FLASH_SALE_PARTICIPANT.TYPES.BUYER]: 'Buyer',
    [FLASH_SALE_PARTICIPANT.TYPES.SELLER]: 'Seller',
    [FLASH_SALE_PARTICIPANT.TYPES.VIEWER]: 'Viewer',
    [FLASH_SALE_PARTICIPANT.TYPES.VIP]: 'VIP Participant',
    [FLASH_SALE_PARTICIPANT.TYPES.MEMBER]: 'Member',
    [FLASH_SALE_PARTICIPANT.TYPES.GUEST]: 'Guest',
    [FLASH_SALE_PARTICIPANT.TYPES.WHOLESALE]: 'Wholesale Buyer',
    [FLASH_SALE_PARTICIPANT.TYPES.RETAIL]: 'Retail Buyer',
  };
  return labels[type] || 'Unknown Participant Type';
}

export function flashsalesParticipantGetCategoryLabel(
  category: FlashSaleParticipantCategory
): string {
  const labels: Record<FlashSaleParticipantCategory, string> = {
    [FLASH_SALE_PARTICIPANT.CATEGORIES.INDIVIDUAL]: 'Individual',
    [FLASH_SALE_PARTICIPANT.CATEGORIES.BUSINESS]: 'Business',
    [FLASH_SALE_PARTICIPANT.CATEGORIES.ORGANIZATION]: 'Organization',
    [FLASH_SALE_PARTICIPANT.CATEGORIES.GROUP]: 'Group',
    [FLASH_SALE_PARTICIPANT.CATEGORIES.TEAM]: 'Team',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesParticipantGetRoleLabel(role: FlashSaleParticipantRole): string {
  const labels: Record<FlashSaleParticipantRole, string> = {
    [FLASH_SALE_PARTICIPANT.ROLES.PRIMARY]: 'Primary Participant',
    [FLASH_SALE_PARTICIPANT.ROLES.SECONDARY]: 'Secondary Participant',
    [FLASH_SALE_PARTICIPANT.ROLES.SUPPORT]: 'Support Participant',
    [FLASH_SALE_PARTICIPANT.ROLES.APPROVER]: 'Approver',
    [FLASH_SALE_PARTICIPANT.ROLES.DECISION_MAKER]: 'Decision Maker',
    [FLASH_SALE_PARTICIPANT.ROLES.INFLUENCER]: 'Influencer',
  };
  return labels[role] || 'Unknown Role';
}

export function flashsalesParticipantGetEngagementLabel(
  engagement: FlashSaleParticipantEngagement
): string {
  const labels: Record<FlashSaleParticipantEngagement, string> = {
    [FLASH_SALE_PARTICIPANT.ENGAGEMENT.LOW]: 'Low Engagement',
    [FLASH_SALE_PARTICIPANT.ENGAGEMENT.MEDIUM]: 'Medium Engagement',
    [FLASH_SALE_PARTICIPANT.ENGAGEMENT.HIGH]: 'High Engagement',
    [FLASH_SALE_PARTICIPANT.ENGAGEMENT.VERY_HIGH]: 'Very High Engagement',
    [FLASH_SALE_PARTICIPANT.ENGAGEMENT.MAXIMUM]: 'Maximum Engagement',
  };
  return labels[engagement] || 'Unknown Engagement Level';
}

export function flashsalesParticipantGetActivityLabel(
  activity: FlashSaleParticipantActivity
): string {
  const labels: Record<FlashSaleParticipantActivity, string> = {
    [FLASH_SALE_PARTICIPANT.ACTIVITY.ACTIVE]: 'Active',
    [FLASH_SALE_PARTICIPANT.ACTIVITY.INACTIVE]: 'Inactive',
    [FLASH_SALE_PARTICIPANT.ACTIVITY.IDLE]: 'Idle',
    [FLASH_SALE_PARTICIPANT.ACTIVITY.ENGAGED]: 'Engaged',
    [FLASH_SALE_PARTICIPANT.ACTIVITY.DISENGAGED]: 'Disengaged',
    [FLASH_SALE_PARTICIPANT.ACTIVITY.ABANDONED]: 'Abandoned',
  };
  return labels[activity] || 'Unknown Activity';
}

export function flashsalesParticipantGetParticipationLabel(
  participation: FlashSaleParticipantParticipation
): string {
  const labels: Record<FlashSaleParticipantParticipation, string> = {
    [FLASH_SALE_PARTICIPANT.PARTICIPATION.FIRST_TIME]: 'First Time Participant',
    [FLASH_SALE_PARTICIPANT.PARTICIPATION.RECURRING]: 'Recurring Participant',
    [FLASH_SALE_PARTICIPANT.PARTICIPATION.FREQUENT]: 'Frequent Participant',
    [FLASH_SALE_PARTICIPANT.PARTICIPATION.OCCASIONAL]: 'Occasional Participant',
    [FLASH_SALE_PARTICIPANT.PARTICIPATION.RARE]: 'Rare Participant',
  };
  return labels[participation] || 'Unknown Participation Level';
}

export function flashsalesParticipantIsValidType(type: string): type is FlashSaleParticipantType {
  return Object.values(FLASH_SALE_PARTICIPANT.TYPES).includes(type as FlashSaleParticipantType);
}

export function flashsalesParticipantIsValidCategory(
  category: string
): category is FlashSaleParticipantCategory {
  return Object.values(FLASH_SALE_PARTICIPANT.CATEGORIES).includes(
    category as FlashSaleParticipantCategory
  );
}

export function flashsalesParticipantIsValidRole(role: string): role is FlashSaleParticipantRole {
  return Object.values(FLASH_SALE_PARTICIPANT.ROLES).includes(role as FlashSaleParticipantRole);
}

export function flashsalesParticipantIsActive(activity: FlashSaleParticipantActivity): boolean {
  const activeActivities: FlashSaleParticipantActivity[] = [
    FLASH_SALE_PARTICIPANT.ACTIVITY.ACTIVE,
    FLASH_SALE_PARTICIPANT.ACTIVITY.ENGAGED,
  ];
  return activeActivities.includes(activity);
}

export function flashsalesParticipantIsEngaged(activity: FlashSaleParticipantActivity): boolean {
  const engagedActivities: FlashSaleParticipantActivity[] = [
    FLASH_SALE_PARTICIPANT.ACTIVITY.ENGAGED,
    FLASH_SALE_PARTICIPANT.ACTIVITY.ACTIVE,
  ];
  return engagedActivities.includes(activity);
}

export function flashsalesParticipantGetDefaultMaxParticipants(): number {
  return FLASH_SALE_PARTICIPANT.DEFAULTS.MAX_PARTICIPANTS;
}

export function flashsalesParticipantGetDefaultMaxItems(): number {
  return FLASH_SALE_PARTICIPANT.DEFAULTS.MAX_ITEMS_PER_PARTICIPANT;
}

export function flashsalesParticipantGetMaxParticipantsPerSale(): number {
  return FLASH_SALE_PARTICIPANT.LIMITS.MAX_PARTICIPANTS_PER_SALE;
}

export function flashsalesParticipantGetEngagementScore(
  engagement: FlashSaleParticipantEngagement
): number {
  const scores: Record<FlashSaleParticipantEngagement, number> = {
    [FLASH_SALE_PARTICIPANT.ENGAGEMENT.LOW]: 1,
    [FLASH_SALE_PARTICIPANT.ENGAGEMENT.MEDIUM]: 3,
    [FLASH_SALE_PARTICIPANT.ENGAGEMENT.HIGH]: 5,
    [FLASH_SALE_PARTICIPANT.ENGAGEMENT.VERY_HIGH]: 8,
    [FLASH_SALE_PARTICIPANT.ENGAGEMENT.MAXIMUM]: 10,
  };
  return scores[engagement] || 0;
}

export function flashsalesParticipantGetParticipationRank(
  participation: FlashSaleParticipantParticipation
): number {
  const ranks: Record<FlashSaleParticipantParticipation, number> = {
    [FLASH_SALE_PARTICIPANT.PARTICIPATION.FIRST_TIME]: 1,
    [FLASH_SALE_PARTICIPANT.PARTICIPATION.RARE]: 2,
    [FLASH_SALE_PARTICIPANT.PARTICIPATION.OCCASIONAL]: 3,
    [FLASH_SALE_PARTICIPANT.PARTICIPATION.RECURRING]: 4,
    [FLASH_SALE_PARTICIPANT.PARTICIPATION.FREQUENT]: 5,
  };
  return ranks[participation] || 0;
}
