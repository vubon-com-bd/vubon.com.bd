/**
 * Referral Type Constants
 * Type definitions and classifications for referrals
 */

export const MARKETINGREFERRAL_TYPE = {
  // Referral Categories
  CATEGORIES: {
    CUSTOMER: 'customer',
    BUSINESS: 'business',
    PERSONAL: 'personal',
    PROFESSIONAL: 'professional',
    SOCIAL: 'social',
    COMMUNITY: 'community',
  } as const,

  // Referral Sub-Types
  SUB_TYPES: {
    // Customer
    LOYAL_CUSTOMER: 'loyal_customer',
    VIP_CUSTOMER: 'vip_customer',
    NEW_CUSTOMER: 'new_customer',
    RETURNING_CUSTOMER: 'returning_customer',

    // Business
    PARTNER: 'partner',
    AFFILIATE: 'affiliate',
    VENDOR: 'vendor',
    SUPPLIER: 'supplier',
    DISTRIBUTOR: 'distributor',

    // Personal
    FRIEND: 'friend',
    FAMILY: 'family',
    COLLEAGUE: 'colleague',
    NEIGHBOR: 'neighbor',

    // Professional
    CLIENT: 'client',
    CONSULTANT: 'consultant',
    ADVISOR: 'advisor',
    MENTOR: 'mentor',

    // Social
    INFLUENCER: 'influencer',
    BLOGGER: 'blogger',
    CONTENT_CREATOR: 'content_creator',
    SOCIAL_MEDIA: 'social_media',

    // Community
    ORGANIZATION: 'organization',
    GROUP: 'group',
    ASSOCIATION: 'association',
    CLUB: 'club',
  } as const,

  // Referral Relationships
  RELATIONSHIPS: {
    DIRECT: 'direct',
    INDIRECT: 'indirect',
    ONE_TIME: 'one_time',
    RECURRING: 'recurring',
    LONG_TERM: 'long_term',
    SHORT_TERM: 'short_term',
  } as const,

  // Referral Intentions
  INTENTIONS: {
    AWARENESS: 'awareness',
    CONSIDERATION: 'consideration',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    LOYALTY: 'loyalty',
    ADVOCACY: 'advocacy',
  } as const,

  // Referral Channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    SOCIAL: 'social',
    DIRECT: 'direct',
    REFERRAL_CODE: 'referral_code',
    REFERRAL_LINK: 'referral_link',
    QR_CODE: 'qr_code',
    IN_PERSON: 'in_person',
    PHONE: 'phone',
    VIDEO: 'video',
    CHAT: 'chat',
    OTHER: 'other',
  } as const,
} as const;

// Referral Categories
export type MarketingReferralCategory =
  (typeof MARKETINGREFERRAL_TYPE.CATEGORIES)[keyof typeof MARKETINGREFERRAL_TYPE.CATEGORIES];

// Referral Sub-Types
export type MarketingReferralSubType =
  (typeof MARKETINGREFERRAL_TYPE.SUB_TYPES)[keyof typeof MARKETINGREFERRAL_TYPE.SUB_TYPES];

// Referral Relationships
export type MarketingReferralRelationship =
  (typeof MARKETINGREFERRAL_TYPE.RELATIONSHIPS)[keyof typeof MARKETINGREFERRAL_TYPE.RELATIONSHIPS];

// Referral Intentions
export type MarketingReferralIntention =
  (typeof MARKETINGREFERRAL_TYPE.INTENTIONS)[keyof typeof MARKETINGREFERRAL_TYPE.INTENTIONS];

// Referral Channels
export type MarketingReferralChannel =
  (typeof MARKETINGREFERRAL_TYPE.CHANNELS)[keyof typeof MARKETINGREFERRAL_TYPE.CHANNELS];

// Utility Functions
export function marketingreferralGetCategoryLabel(category: MarketingReferralCategory): string {
  const labels: Record<MarketingReferralCategory, string> = {
    [MARKETINGREFERRAL_TYPE.CATEGORIES.CUSTOMER]: 'Customer',
    [MARKETINGREFERRAL_TYPE.CATEGORIES.BUSINESS]: 'Business',
    [MARKETINGREFERRAL_TYPE.CATEGORIES.PERSONAL]: 'Personal',
    [MARKETINGREFERRAL_TYPE.CATEGORIES.PROFESSIONAL]: 'Professional',
    [MARKETINGREFERRAL_TYPE.CATEGORIES.SOCIAL]: 'Social',
    [MARKETINGREFERRAL_TYPE.CATEGORIES.COMMUNITY]: 'Community',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingreferralGetSubTypeLabel(subType: MarketingReferralSubType): string {
  const labels: Record<MarketingReferralSubType, string> = {
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.LOYAL_CUSTOMER]: 'Loyal Customer',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.VIP_CUSTOMER]: 'VIP Customer',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.NEW_CUSTOMER]: 'New Customer',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.RETURNING_CUSTOMER]: 'Returning Customer',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.PARTNER]: 'Partner',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.AFFILIATE]: 'Affiliate',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.VENDOR]: 'Vendor',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.SUPPLIER]: 'Supplier',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.DISTRIBUTOR]: 'Distributor',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.FRIEND]: 'Friend',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.FAMILY]: 'Family',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.COLLEAGUE]: 'Colleague',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.NEIGHBOR]: 'Neighbor',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.CLIENT]: 'Client',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.CONSULTANT]: 'Consultant',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.ADVISOR]: 'Advisor',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.MENTOR]: 'Mentor',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.INFLUENCER]: 'Influencer',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.BLOGGER]: 'Blogger',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.CONTENT_CREATOR]: 'Content Creator',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.SOCIAL_MEDIA]: 'Social Media',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.ORGANIZATION]: 'Organization',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.GROUP]: 'Group',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.ASSOCIATION]: 'Association',
    [MARKETINGREFERRAL_TYPE.SUB_TYPES.CLUB]: 'Club',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function marketingreferralGetRelationshipLabel(
  relationship: MarketingReferralRelationship
): string {
  const labels: Record<MarketingReferralRelationship, string> = {
    [MARKETINGREFERRAL_TYPE.RELATIONSHIPS.DIRECT]: 'Direct',
    [MARKETINGREFERRAL_TYPE.RELATIONSHIPS.INDIRECT]: 'Indirect',
    [MARKETINGREFERRAL_TYPE.RELATIONSHIPS.ONE_TIME]: 'One Time',
    [MARKETINGREFERRAL_TYPE.RELATIONSHIPS.RECURRING]: 'Recurring',
    [MARKETINGREFERRAL_TYPE.RELATIONSHIPS.LONG_TERM]: 'Long Term',
    [MARKETINGREFERRAL_TYPE.RELATIONSHIPS.SHORT_TERM]: 'Short Term',
  };
  return labels[relationship] || 'Unknown Relationship';
}

export function marketingreferralGetIntentionLabel(intention: MarketingReferralIntention): string {
  const labels: Record<MarketingReferralIntention, string> = {
    [MARKETINGREFERRAL_TYPE.INTENTIONS.AWARENESS]: 'Awareness',
    [MARKETINGREFERRAL_TYPE.INTENTIONS.CONSIDERATION]: 'Consideration',
    [MARKETINGREFERRAL_TYPE.INTENTIONS.CONVERSION]: 'Conversion',
    [MARKETINGREFERRAL_TYPE.INTENTIONS.RETENTION]: 'Retention',
    [MARKETINGREFERRAL_TYPE.INTENTIONS.LOYALTY]: 'Loyalty',
    [MARKETINGREFERRAL_TYPE.INTENTIONS.ADVOCACY]: 'Advocacy',
  };
  return labels[intention] || 'Unknown Intention';
}

export function marketingreferralGetChannelLabel(channel: MarketingReferralChannel): string {
  const labels: Record<MarketingReferralChannel, string> = {
    [MARKETINGREFERRAL_TYPE.CHANNELS.EMAIL]: 'Email',
    [MARKETINGREFERRAL_TYPE.CHANNELS.SMS]: 'SMS',
    [MARKETINGREFERRAL_TYPE.CHANNELS.SOCIAL]: 'Social Media',
    [MARKETINGREFERRAL_TYPE.CHANNELS.DIRECT]: 'Direct',
    [MARKETINGREFERRAL_TYPE.CHANNELS.REFERRAL_CODE]: 'Referral Code',
    [MARKETINGREFERRAL_TYPE.CHANNELS.REFERRAL_LINK]: 'Referral Link',
    [MARKETINGREFERRAL_TYPE.CHANNELS.QR_CODE]: 'QR Code',
    [MARKETINGREFERRAL_TYPE.CHANNELS.IN_PERSON]: 'In Person',
    [MARKETINGREFERRAL_TYPE.CHANNELS.PHONE]: 'Phone',
    [MARKETINGREFERRAL_TYPE.CHANNELS.VIDEO]: 'Video',
    [MARKETINGREFERRAL_TYPE.CHANNELS.CHAT]: 'Chat',
    [MARKETINGREFERRAL_TYPE.CHANNELS.OTHER]: 'Other',
  };
  return labels[channel] || 'Unknown Channel';
}

export function marketingreferralIsCustomerCategory(category: MarketingReferralCategory): boolean {
  const customerCategories: MarketingReferralCategory[] = [
    MARKETINGREFERRAL_TYPE.CATEGORIES.CUSTOMER,
    MARKETINGREFERRAL_TYPE.CATEGORIES.PERSONAL,
  ];
  return customerCategories.includes(category);
}

export function marketingreferralIsBusinessCategory(category: MarketingReferralCategory): boolean {
  return category === MARKETINGREFERRAL_TYPE.CATEGORIES.BUSINESS;
}

export function marketingreferralIsProfessionalCategory(
  category: MarketingReferralCategory
): boolean {
  return category === MARKETINGREFERRAL_TYPE.CATEGORIES.PROFESSIONAL;
}
