/**
 * Referral Constants
 * Core referral marketing configuration and settings
 */

export const MARKETINGREFERRAL = {
  // Referral Types
  TYPES: {
    CUSTOMER: 'customer',
    AFFILIATE: 'affiliate',
    PARTNER: 'partner',
    EMPLOYEE: 'employee',
    FRIEND: 'friend',
    FAMILY: 'family',
    INFLUENCER: 'influencer',
    BUSINESS: 'business',
    ORGANIZATION: 'organization',
    COMMUNITY: 'community',
  } as const,

  // Referral Sources
  SOURCES: {
    EMAIL: 'email',
    SMS: 'sms',
    SOCIAL_MEDIA: 'social_media',
    WHATSAPP: 'whatsapp',
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    TWITTER: 'twitter',
    LINKEDIN: 'linkedin',
    YOUTUBE: 'youtube',
    TIKTOK: 'tiktok',
    WEBSITE: 'website',
    APP: 'app',
    QR_CODE: 'qr_code',
    REFERRAL_LINK: 'referral_link',
    REFERRAL_CODE: 'referral_code',
    IN_PERSON: 'in_person',
    PHONE: 'phone',
    OTHER: 'other',
  } as const,

  // Referral Programs
  PROGRAMS: {
    STANDARD: 'standard',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    LOYALTY: 'loyalty',
    SEASONAL: 'seasonal',
    LIMITED: 'limited',
    EXCLUSIVE: 'exclusive',
    INVITE_ONLY: 'invite_only',
    PUBLIC: 'public',
    PRIVATE: 'private',
  } as const,

  // Referral Methods
  METHODS: {
    CODE: 'code',
    LINK: 'link',
    EMAIL_INVITE: 'email_invite',
    SMS_INVITE: 'sms_invite',
    SOCIAL_SHARE: 'social_share',
    QR_CODE: 'qr_code',
    DIRECT: 'direct',
    AUTOMATIC: 'automatic',
  } as const,

  // Referral Statuses
  STATUSES: {
    PENDING: 'pending',
    SENT: 'sent',
    OPENED: 'opened',
    CLICKED: 'clicked',
    REGISTERED: 'registered',
    QUALIFIED: 'qualified',
    CONVERTED: 'converted',
    COMPLETED: 'completed',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    REJECTED: 'rejected',
    FRAUD: 'fraud',
  } as const,

  // Referral Tiers
  TIERS: {
    TIER_1: 'tier_1',
    TIER_2: 'tier_2',
    TIER_3: 'tier_3',
    TIER_4: 'tier_4',
    TIER_5: 'tier_5',
    TIER_6: 'tier_6',
    TIER_7: 'tier_7',
    TIER_8: 'tier_8',
    TIER_9: 'tier_9',
    TIER_10: 'tier_10',
  } as const,

  // Referral Defaults
  DEFAULTS: {
    DEFAULT_PROGRAM: 'standard',
    DEFAULT_METHOD: 'link',
    DEFAULT_REWARD_AMOUNT: 100,
    DEFAULT_REFERRER_REWARD: 50,
    DEFAULT_REFERRED_REWARD: 50,
    DEFAULT_MINIMUM_ORDER: 0,
    DEFAULT_MAX_REFERRALS: 10,
    DEFAULT_EXPIRY_DAYS: 30,
    DEFAULT_QUALIFICATION_DAYS: 7,
    DEFAULT_CONVERSION_WINDOW: 30,
    DEFAULT_COOKIE_DURATION: 30,
  } as const,

  // Referral Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MIN_REFERRAL_CODE_LENGTH: 4,
    MAX_REFERRAL_CODE_LENGTH: 20,
    MAX_REFERRALS_PER_USER: 100,
    MAX_REFERRALS_PER_DAY: 10,
    MAX_REWARDS_PER_USER: 1000,
    MAX_REFERRAL_AMOUNT: 100000,
    MIN_REFERRAL_AMOUNT: 1,
    MAX_REFERRAL_TIER_LEVEL: 10,
  } as const,
} as const;

// Referral Types
export type MarketingReferralType =
  (typeof MARKETINGREFERRAL.TYPES)[keyof typeof MARKETINGREFERRAL.TYPES];

// Referral Sources
export type MarketingReferralSource =
  (typeof MARKETINGREFERRAL.SOURCES)[keyof typeof MARKETINGREFERRAL.SOURCES];

// Referral Programs
export type MarketingReferralProgram =
  (typeof MARKETINGREFERRAL.PROGRAMS)[keyof typeof MARKETINGREFERRAL.PROGRAMS];

// Referral Methods
export type MarketingReferralMethod =
  (typeof MARKETINGREFERRAL.METHODS)[keyof typeof MARKETINGREFERRAL.METHODS];

// Referral Statuses
export type MarketingReferralStatus =
  (typeof MARKETINGREFERRAL.STATUSES)[keyof typeof MARKETINGREFERRAL.STATUSES];

// Referral Tiers
export type MarketingReferralTier =
  (typeof MARKETINGREFERRAL.TIERS)[keyof typeof MARKETINGREFERRAL.TIERS];

// Referral Defaults
export type MarketingReferralDefault =
  (typeof MARKETINGREFERRAL.DEFAULTS)[keyof typeof MARKETINGREFERRAL.DEFAULTS];

// Referral Limits
export type MarketingReferralLimit =
  (typeof MARKETINGREFERRAL.LIMITS)[keyof typeof MARKETINGREFERRAL.LIMITS];

// Utility Functions
export function marketingreferralGetTypeLabel(type: MarketingReferralType): string {
  const labels: Record<MarketingReferralType, string> = {
    [MARKETINGREFERRAL.TYPES.CUSTOMER]: 'Customer',
    [MARKETINGREFERRAL.TYPES.AFFILIATE]: 'Affiliate',
    [MARKETINGREFERRAL.TYPES.PARTNER]: 'Partner',
    [MARKETINGREFERRAL.TYPES.EMPLOYEE]: 'Employee',
    [MARKETINGREFERRAL.TYPES.FRIEND]: 'Friend',
    [MARKETINGREFERRAL.TYPES.FAMILY]: 'Family',
    [MARKETINGREFERRAL.TYPES.INFLUENCER]: 'Influencer',
    [MARKETINGREFERRAL.TYPES.BUSINESS]: 'Business',
    [MARKETINGREFERRAL.TYPES.ORGANIZATION]: 'Organization',
    [MARKETINGREFERRAL.TYPES.COMMUNITY]: 'Community',
  };
  return labels[type] || 'Unknown Referral Type';
}

export function marketingreferralGetSourceLabel(source: MarketingReferralSource): string {
  const labels: Record<MarketingReferralSource, string> = {
    [MARKETINGREFERRAL.SOURCES.EMAIL]: 'Email',
    [MARKETINGREFERRAL.SOURCES.SMS]: 'SMS',
    [MARKETINGREFERRAL.SOURCES.SOCIAL_MEDIA]: 'Social Media',
    [MARKETINGREFERRAL.SOURCES.WHATSAPP]: 'WhatsApp',
    [MARKETINGREFERRAL.SOURCES.FACEBOOK]: 'Facebook',
    [MARKETINGREFERRAL.SOURCES.INSTAGRAM]: 'Instagram',
    [MARKETINGREFERRAL.SOURCES.TWITTER]: 'Twitter/X',
    [MARKETINGREFERRAL.SOURCES.LINKEDIN]: 'LinkedIn',
    [MARKETINGREFERRAL.SOURCES.YOUTUBE]: 'YouTube',
    [MARKETINGREFERRAL.SOURCES.TIKTOK]: 'TikTok',
    [MARKETINGREFERRAL.SOURCES.WEBSITE]: 'Website',
    [MARKETINGREFERRAL.SOURCES.APP]: 'App',
    [MARKETINGREFERRAL.SOURCES.QR_CODE]: 'QR Code',
    [MARKETINGREFERRAL.SOURCES.REFERRAL_LINK]: 'Referral Link',
    [MARKETINGREFERRAL.SOURCES.REFERRAL_CODE]: 'Referral Code',
    [MARKETINGREFERRAL.SOURCES.IN_PERSON]: 'In Person',
    [MARKETINGREFERRAL.SOURCES.PHONE]: 'Phone',
    [MARKETINGREFERRAL.SOURCES.OTHER]: 'Other',
  };
  return labels[source] || 'Unknown Source';
}

export function marketingreferralGetProgramLabel(program: MarketingReferralProgram): string {
  const labels: Record<MarketingReferralProgram, string> = {
    [MARKETINGREFERRAL.PROGRAMS.STANDARD]: 'Standard Program',
    [MARKETINGREFERRAL.PROGRAMS.PREMIUM]: 'Premium Program',
    [MARKETINGREFERRAL.PROGRAMS.ENTERPRISE]: 'Enterprise Program',
    [MARKETINGREFERRAL.PROGRAMS.LOYALTY]: 'Loyalty Program',
    [MARKETINGREFERRAL.PROGRAMS.SEASONAL]: 'Seasonal Program',
    [MARKETINGREFERRAL.PROGRAMS.LIMITED]: 'Limited Program',
    [MARKETINGREFERRAL.PROGRAMS.EXCLUSIVE]: 'Exclusive Program',
    [MARKETINGREFERRAL.PROGRAMS.INVITE_ONLY]: 'Invite Only',
    [MARKETINGREFERRAL.PROGRAMS.PUBLIC]: 'Public Program',
    [MARKETINGREFERRAL.PROGRAMS.PRIVATE]: 'Private Program',
  };
  return labels[program] || 'Unknown Program';
}

export function marketingreferralGetMethodLabel(method: MarketingReferralMethod): string {
  const labels: Record<MarketingReferralMethod, string> = {
    [MARKETINGREFERRAL.METHODS.CODE]: 'Referral Code',
    [MARKETINGREFERRAL.METHODS.LINK]: 'Referral Link',
    [MARKETINGREFERRAL.METHODS.EMAIL_INVITE]: 'Email Invite',
    [MARKETINGREFERRAL.METHODS.SMS_INVITE]: 'SMS Invite',
    [MARKETINGREFERRAL.METHODS.SOCIAL_SHARE]: 'Social Share',
    [MARKETINGREFERRAL.METHODS.QR_CODE]: 'QR Code',
    [MARKETINGREFERRAL.METHODS.DIRECT]: 'Direct',
    [MARKETINGREFERRAL.METHODS.AUTOMATIC]: 'Automatic',
  };
  return labels[method] || 'Unknown Method';
}

export function marketingreferralGetStatusLabel(status: MarketingReferralStatus): string {
  const labels: Record<MarketingReferralStatus, string> = {
    [MARKETINGREFERRAL.STATUSES.PENDING]: 'Pending',
    [MARKETINGREFERRAL.STATUSES.SENT]: 'Sent',
    [MARKETINGREFERRAL.STATUSES.OPENED]: 'Opened',
    [MARKETINGREFERRAL.STATUSES.CLICKED]: 'Clicked',
    [MARKETINGREFERRAL.STATUSES.REGISTERED]: 'Registered',
    [MARKETINGREFERRAL.STATUSES.QUALIFIED]: 'Qualified',
    [MARKETINGREFERRAL.STATUSES.CONVERTED]: 'Converted',
    [MARKETINGREFERRAL.STATUSES.COMPLETED]: 'Completed',
    [MARKETINGREFERRAL.STATUSES.EXPIRED]: 'Expired',
    [MARKETINGREFERRAL.STATUSES.CANCELLED]: 'Cancelled',
    [MARKETINGREFERRAL.STATUSES.REJECTED]: 'Rejected',
    [MARKETINGREFERRAL.STATUSES.FRAUD]: 'Fraud',
  };
  return labels[status] || 'Unknown Status';
}

export function marketingreferralGetTierLabel(tier: MarketingReferralTier): string {
  const labels: Record<MarketingReferralTier, string> = {
    [MARKETINGREFERRAL.TIERS.TIER_1]: 'Tier 1',
    [MARKETINGREFERRAL.TIERS.TIER_2]: 'Tier 2',
    [MARKETINGREFERRAL.TIERS.TIER_3]: 'Tier 3',
    [MARKETINGREFERRAL.TIERS.TIER_4]: 'Tier 4',
    [MARKETINGREFERRAL.TIERS.TIER_5]: 'Tier 5',
    [MARKETINGREFERRAL.TIERS.TIER_6]: 'Tier 6',
    [MARKETINGREFERRAL.TIERS.TIER_7]: 'Tier 7',
    [MARKETINGREFERRAL.TIERS.TIER_8]: 'Tier 8',
    [MARKETINGREFERRAL.TIERS.TIER_9]: 'Tier 9',
    [MARKETINGREFERRAL.TIERS.TIER_10]: 'Tier 10',
  };
  return labels[tier] || 'Unknown Tier';
}

export function marketingreferralGetDefaultRewardAmount(): number {
  return MARKETINGREFERRAL.DEFAULTS.DEFAULT_REWARD_AMOUNT;
}

export function marketingreferralGetDefaultExpiryDays(): number {
  return MARKETINGREFERRAL.DEFAULTS.DEFAULT_EXPIRY_DAYS;
}

export function marketingreferralGetDefaultCookieDuration(): number {
  return MARKETINGREFERRAL.DEFAULTS.DEFAULT_COOKIE_DURATION;
}

export function marketingreferralIsCompleted(status: MarketingReferralStatus): boolean {
  const completedStatuses: MarketingReferralStatus[] = [
    MARKETINGREFERRAL.STATUSES.COMPLETED,
    MARKETINGREFERRAL.STATUSES.CONVERTED,
    MARKETINGREFERRAL.STATUSES.QUALIFIED,
  ];
  return completedStatuses.includes(status);
}

export function marketingreferralIsActive(status: MarketingReferralStatus): boolean {
  const activeStatuses: MarketingReferralStatus[] = [
    MARKETINGREFERRAL.STATUSES.PENDING,
    MARKETINGREFERRAL.STATUSES.SENT,
    MARKETINGREFERRAL.STATUSES.OPENED,
    MARKETINGREFERRAL.STATUSES.CLICKED,
    MARKETINGREFERRAL.STATUSES.REGISTERED,
  ];
  return activeStatuses.includes(status);
}

export function marketingreferralIsValidReferral(type: MarketingReferralType): boolean {
  const validTypes: MarketingReferralType[] = [
    MARKETINGREFERRAL.TYPES.CUSTOMER,
    MARKETINGREFERRAL.TYPES.FRIEND,
    MARKETINGREFERRAL.TYPES.FAMILY,
    MARKETINGREFERRAL.TYPES.COMMUNITY,
  ];
  return validTypes.includes(type);
}
