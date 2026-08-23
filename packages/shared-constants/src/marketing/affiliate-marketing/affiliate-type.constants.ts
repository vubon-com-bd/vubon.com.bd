/**
 * Affiliate Type Constants
 * Type definitions and classifications for affiliates
 */

export const MARKETINGAFFILIATE_TYPE = {
  // Affiliate Categories
  CATEGORIES: {
    INDIVIDUAL: 'individual',
    BUSINESS: 'business',
    ORGANIZATION: 'organization',
    NETWORK: 'network',
  } as const,

  // Affiliate Sub-Types
  SUB_TYPES: {
    // Individual
    BLOGGER: 'blogger',
    INFLUENCER: 'influencer',
    CONTENT_CREATOR: 'content_creator',
    REVIEWER: 'reviewer',
    VLOGGER: 'vlogger',
    PODCASTER: 'podcaster',
    FREELANCER: 'freelancer',

    // Business
    AGENCY: 'agency',
    PUBLISHER: 'publisher',
    RESELLER: 'reseller',
    DISTRIBUTOR: 'distributor',
    WHOLESALER: 'wholesaler',

    // Organization
    NON_PROFIT: 'non_profit',
    EDUCATIONAL: 'educational',
    GOVERNMENT: 'government',
    CORPORATE: 'corporate',

    // Network
    AFFILIATE_NETWORK: 'affiliate_network',
    REFERRAL_NETWORK: 'referral_network',
    PARTNER_NETWORK: 'partner_network',
  } as const,

  // Affiliate Specializations
  SPECIALIZATIONS: {
    ECOMMERCE: 'ecommerce',
    FASHION: 'fashion',
    ELECTRONICS: 'electronics',
    HEALTH_WELLNESS: 'health_wellness',
    BEAUTY: 'beauty',
    FITNESS: 'fitness',
    FOOD_BEVERAGE: 'food_beverage',
    TRAVEL: 'travel',
    FINANCE: 'finance',
    EDUCATION: 'education',
    TECHNOLOGY: 'technology',
    GAMING: 'gaming',
    HOME_GARDEN: 'home_garden',
    AUTOMOTIVE: 'automotive',
    SPORTS: 'sports',
    ENTERTAINMENT: 'entertainment',
    REAL_ESTATE: 'real_estate',
    INSURANCE: 'insurance',
    LEGAL: 'legal',
    OTHER: 'other',
  } as const,

  // Affiliate Experience Levels
  EXPERIENCE_LEVELS: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
    PROFESSIONAL: 'professional',
  } as const,

  // Affiliate Verification Status
  VERIFICATION_STATUS: {
    UNVERIFIED: 'unverified',
    PENDING: 'pending',
    VERIFIED: 'verified',
    FAILED: 'failed',
    REJECTED: 'rejected',
  } as const,

  // Affiliate Engagement Types
  ENGAGEMENT_TYPES: {
    ACTIVE: 'active',
    PASSIVE: 'passive',
    HYBRID: 'hybrid',
    AUTOMATED: 'automated',
    MANUAL: 'manual',
  } as const,
} as const;

// Affiliate Categories
export type MarketingAffiliateCategory =
  (typeof MARKETINGAFFILIATE_TYPE.CATEGORIES)[keyof typeof MARKETINGAFFILIATE_TYPE.CATEGORIES];

// Affiliate Sub-Types
export type MarketingAffiliateSubType =
  (typeof MARKETINGAFFILIATE_TYPE.SUB_TYPES)[keyof typeof MARKETINGAFFILIATE_TYPE.SUB_TYPES];

// Affiliate Specializations
export type MarketingAffiliateSpecialization =
  (typeof MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS)[keyof typeof MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS];

// Affiliate Experience Levels
export type MarketingAffiliateExperienceLevel =
  (typeof MARKETINGAFFILIATE_TYPE.EXPERIENCE_LEVELS)[keyof typeof MARKETINGAFFILIATE_TYPE.EXPERIENCE_LEVELS];

// Affiliate Verification Status
export type MarketingAffiliateVerificationStatus =
  (typeof MARKETINGAFFILIATE_TYPE.VERIFICATION_STATUS)[keyof typeof MARKETINGAFFILIATE_TYPE.VERIFICATION_STATUS];

// Affiliate Engagement Types
export type MarketingAffiliateEngagementType =
  (typeof MARKETINGAFFILIATE_TYPE.ENGAGEMENT_TYPES)[keyof typeof MARKETINGAFFILIATE_TYPE.ENGAGEMENT_TYPES];

// Utility Functions
export function marketingaffiliateGetCategoryLabel(category: MarketingAffiliateCategory): string {
  const labels: Record<MarketingAffiliateCategory, string> = {
    [MARKETINGAFFILIATE_TYPE.CATEGORIES.INDIVIDUAL]: 'Individual',
    [MARKETINGAFFILIATE_TYPE.CATEGORIES.BUSINESS]: 'Business',
    [MARKETINGAFFILIATE_TYPE.CATEGORIES.ORGANIZATION]: 'Organization',
    [MARKETINGAFFILIATE_TYPE.CATEGORIES.NETWORK]: 'Network',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingaffiliateGetSubTypeLabel(subType: MarketingAffiliateSubType): string {
  const labels: Record<MarketingAffiliateSubType, string> = {
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.BLOGGER]: 'Blogger',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.INFLUENCER]: 'Influencer',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.CONTENT_CREATOR]: 'Content Creator',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.REVIEWER]: 'Reviewer',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.VLOGGER]: 'Vlogger',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.PODCASTER]: 'Podcaster',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.FREELANCER]: 'Freelancer',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.AGENCY]: 'Agency',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.PUBLISHER]: 'Publisher',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.RESELLER]: 'Reseller',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.DISTRIBUTOR]: 'Distributor',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.WHOLESALER]: 'Wholesaler',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.NON_PROFIT]: 'Non-Profit',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.EDUCATIONAL]: 'Educational',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.GOVERNMENT]: 'Government',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.CORPORATE]: 'Corporate',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.AFFILIATE_NETWORK]: 'Affiliate Network',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.REFERRAL_NETWORK]: 'Referral Network',
    [MARKETINGAFFILIATE_TYPE.SUB_TYPES.PARTNER_NETWORK]: 'Partner Network',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function marketingaffiliateGetSpecializationLabel(
  specialization: MarketingAffiliateSpecialization
): string {
  const labels: Record<MarketingAffiliateSpecialization, string> = {
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.ECOMMERCE]: 'E-Commerce',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.FASHION]: 'Fashion',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.ELECTRONICS]: 'Electronics',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.HEALTH_WELLNESS]: 'Health & Wellness',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.BEAUTY]: 'Beauty',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.FITNESS]: 'Fitness',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.FOOD_BEVERAGE]: 'Food & Beverage',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.TRAVEL]: 'Travel',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.FINANCE]: 'Finance',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.EDUCATION]: 'Education',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.TECHNOLOGY]: 'Technology',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.GAMING]: 'Gaming',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.HOME_GARDEN]: 'Home & Garden',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.AUTOMOTIVE]: 'Automotive',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.SPORTS]: 'Sports',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.ENTERTAINMENT]: 'Entertainment',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.REAL_ESTATE]: 'Real Estate',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.INSURANCE]: 'Insurance',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.LEGAL]: 'Legal',
    [MARKETINGAFFILIATE_TYPE.SPECIALIZATIONS.OTHER]: 'Other',
  };
  return labels[specialization] || 'Unknown Specialization';
}

export function marketingaffiliateGetExperienceLevelLabel(
  level: MarketingAffiliateExperienceLevel
): string {
  const labels: Record<MarketingAffiliateExperienceLevel, string> = {
    [MARKETINGAFFILIATE_TYPE.EXPERIENCE_LEVELS.BEGINNER]: 'Beginner',
    [MARKETINGAFFILIATE_TYPE.EXPERIENCE_LEVELS.INTERMEDIATE]: 'Intermediate',
    [MARKETINGAFFILIATE_TYPE.EXPERIENCE_LEVELS.ADVANCED]: 'Advanced',
    [MARKETINGAFFILIATE_TYPE.EXPERIENCE_LEVELS.EXPERT]: 'Expert',
    [MARKETINGAFFILIATE_TYPE.EXPERIENCE_LEVELS.PROFESSIONAL]: 'Professional',
  };
  return labels[level] || 'Unknown Experience Level';
}

export function marketingaffiliateGetVerificationStatusLabel(
  status: MarketingAffiliateVerificationStatus
): string {
  const labels: Record<MarketingAffiliateVerificationStatus, string> = {
    [MARKETINGAFFILIATE_TYPE.VERIFICATION_STATUS.UNVERIFIED]: 'Unverified',
    [MARKETINGAFFILIATE_TYPE.VERIFICATION_STATUS.PENDING]: 'Pending',
    [MARKETINGAFFILIATE_TYPE.VERIFICATION_STATUS.VERIFIED]: 'Verified',
    [MARKETINGAFFILIATE_TYPE.VERIFICATION_STATUS.FAILED]: 'Failed',
    [MARKETINGAFFILIATE_TYPE.VERIFICATION_STATUS.REJECTED]: 'Rejected',
  };
  return labels[status] || 'Unknown Verification Status';
}

export function marketingaffiliateGetEngagementTypeLabel(
  engagementType: MarketingAffiliateEngagementType
): string {
  const labels: Record<MarketingAffiliateEngagementType, string> = {
    [MARKETINGAFFILIATE_TYPE.ENGAGEMENT_TYPES.ACTIVE]: 'Active',
    [MARKETINGAFFILIATE_TYPE.ENGAGEMENT_TYPES.PASSIVE]: 'Passive',
    [MARKETINGAFFILIATE_TYPE.ENGAGEMENT_TYPES.HYBRID]: 'Hybrid',
    [MARKETINGAFFILIATE_TYPE.ENGAGEMENT_TYPES.AUTOMATED]: 'Automated',
    [MARKETINGAFFILIATE_TYPE.ENGAGEMENT_TYPES.MANUAL]: 'Manual',
  };
  return labels[engagementType] || 'Unknown Engagement Type';
}

export function marketingaffiliateIsIndividualCategory(
  category: MarketingAffiliateCategory
): boolean {
  return category === MARKETINGAFFILIATE_TYPE.CATEGORIES.INDIVIDUAL;
}

export function marketingaffiliateIsBusinessCategory(
  category: MarketingAffiliateCategory
): boolean {
  return (
    category === MARKETINGAFFILIATE_TYPE.CATEGORIES.BUSINESS ||
    category === MARKETINGAFFILIATE_TYPE.CATEGORIES.ORGANIZATION
  );
}

export function marketingaffiliateIsVerified(
  status: MarketingAffiliateVerificationStatus
): boolean {
  return status === MARKETINGAFFILIATE_TYPE.VERIFICATION_STATUS.VERIFIED;
}

export function marketingaffiliateIsPendingVerification(
  status: MarketingAffiliateVerificationStatus
): boolean {
  return status === MARKETINGAFFILIATE_TYPE.VERIFICATION_STATUS.PENDING;
}
