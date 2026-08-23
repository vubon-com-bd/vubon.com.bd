/**
 * Affiliate Constants
 * Core affiliate marketing configuration and settings
 */

export const MARKETINGAFFILIATE = {
  // Affiliate Types
  TYPES: {
    INDIVIDUAL: 'individual',
    BUSINESS: 'business',
    INFLUENCER: 'influencer',
    BLOGGER: 'blogger',
    CONTENT_CREATOR: 'content_creator',
    PUBLISHER: 'publisher',
    NETWORK: 'network',
    AGENCY: 'agency',
    PARTNER: 'partner',
    RESELLER: 'reseller',
    REFERRAL: 'referral',
    LOYALTY: 'loyalty',
  } as const,

  // Affiliate Levels
  LEVELS: {
    BRONZE: 'bronze',
    SILVER: 'silver',
    GOLD: 'gold',
    PLATINUM: 'platinum',
    DIAMOND: 'diamond',
    ELITE: 'elite',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
  } as const,

  // Affiliate Tiers
  TIERS: {
    TIER_1: 'tier_1',
    TIER_2: 'tier_2',
    TIER_3: 'tier_3',
    TIER_4: 'tier_4',
    TIER_5: 'tier_5',
  } as const,

  // Affiliate Sources
  SOURCES: {
    WEBSITE: 'website',
    BLOG: 'blog',
    SOCIAL_MEDIA: 'social_media',
    YOUTUBE: 'youtube',
    PODCAST: 'podcast',
    EMAIL: 'email',
    NEWSLETTER: 'newsletter',
    COUPON_SITE: 'coupon_site',
    REVIEW_SITE: 'review_site',
    COMPARISON_SITE: 'comparison_site',
    FORUM: 'forum',
    COMMUNITY: 'community',
    REFERRAL: 'referral',
    PAID_ADS: 'paid_ads',
    ORGANIC: 'organic',
    DIRECT: 'direct',
  } as const,

  // Affiliate Verticals
  VERTICALS: {
    ECOMMERCE: 'ecommerce',
    FASHION: 'fashion',
    ELECTRONICS: 'electronics',
    HEALTH: 'health',
    BEAUTY: 'beauty',
    FITNESS: 'fitness',
    FOOD: 'food',
    TRAVEL: 'travel',
    FINANCE: 'finance',
    EDUCATION: 'education',
    TECHNOLOGY: 'technology',
    GAMING: 'gaming',
    HOME: 'home',
    GARDEN: 'garden',
    AUTOMOTIVE: 'automotive',
    SPORTS: 'sports',
    ENTERTAINMENT: 'entertainment',
    OTHER: 'other',
  } as const,

  // Affiliate Performance Metrics
  METRICS: {
    CLICKS: 'clicks',
    IMPRESSIONS: 'impressions',
    CONVERSIONS: 'conversions',
    CONVERSION_RATE: 'conversion_rate',
    REVENUE: 'revenue',
    COMMISSION: 'commission',
    EARNINGS: 'earnings',
    AOV: 'aov',
    CTR: 'ctr',
    EPC: 'epc',
    ROI: 'roi',
    CR: 'cr',
    SALES: 'sales',
    REFUNDS: 'refunds',
    CHARGEBACKS: 'chargebacks',
    ACTIVE_USERS: 'active_users',
    NEW_USERS: 'new_users',
  } as const,

  // Affiliate Defaults
  DEFAULTS: {
    DEFAULT_COMMISSION_RATE: 10,
    DEFAULT_REFERRAL_BONUS: 5,
    DEFAULT_MINIMUM_PAYOUT: 50,
    DEFAULT_PAYOUT_CURRENCY: 'BDT',
    DEFAULT_COOKIE_DURATION: 30,
    DEFAULT_ATTRIBUTION_WINDOW: 30,
    DEFAULT_COMMISSION_TYPE: 'percentage',
    DEFAULT_LEVEL: 'bronze',
    DEFAULT_TIER: 'tier_1',
    DEFAULT_PAYOUT_METHOD: 'bank_transfer',
    MIN_REFERRALS_FOR_BONUS: 5,
    MAX_REFERRALS_FOR_BONUS: 100,
  } as const,

  // Affiliate Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_WEBSITES_PER_AFFILIATE: 10,
    MAX_PROMO_CODES_PER_AFFILIATE: 20,
    MAX_REFERRAL_LINKS_PER_AFFILIATE: 50,
    MIN_REFERRAL_AMOUNT: 1,
    MAX_REFERRAL_AMOUNT: 10000,
    MIN_COMMISSION_RATE: 1,
    MAX_COMMISSION_RATE: 100,
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  } as const,
} as const;

// Affiliate Types
export type MarketingAffiliateType =
  (typeof MARKETINGAFFILIATE.TYPES)[keyof typeof MARKETINGAFFILIATE.TYPES];

// Affiliate Levels
export type MarketingAffiliateLevel =
  (typeof MARKETINGAFFILIATE.LEVELS)[keyof typeof MARKETINGAFFILIATE.LEVELS];

// Affiliate Tiers
export type MarketingAffiliateTier =
  (typeof MARKETINGAFFILIATE.TIERS)[keyof typeof MARKETINGAFFILIATE.TIERS];

// Affiliate Sources
export type MarketingAffiliateSource =
  (typeof MARKETINGAFFILIATE.SOURCES)[keyof typeof MARKETINGAFFILIATE.SOURCES];

// Affiliate Verticals
export type MarketingAffiliateVertical =
  (typeof MARKETINGAFFILIATE.VERTICALS)[keyof typeof MARKETINGAFFILIATE.VERTICALS];

// Affiliate Performance Metrics
export type MarketingAffiliateMetric =
  (typeof MARKETINGAFFILIATE.METRICS)[keyof typeof MARKETINGAFFILIATE.METRICS];

// Affiliate Defaults
export type MarketingAffiliateDefault =
  (typeof MARKETINGAFFILIATE.DEFAULTS)[keyof typeof MARKETINGAFFILIATE.DEFAULTS];

// Affiliate Limits
export type MarketingAffiliateLimit =
  (typeof MARKETINGAFFILIATE.LIMITS)[keyof typeof MARKETINGAFFILIATE.LIMITS];

// Utility Functions
export function marketingaffiliateGetTypeLabel(type: MarketingAffiliateType): string {
  const labels: Record<MarketingAffiliateType, string> = {
    [MARKETINGAFFILIATE.TYPES.INDIVIDUAL]: 'Individual',
    [MARKETINGAFFILIATE.TYPES.BUSINESS]: 'Business',
    [MARKETINGAFFILIATE.TYPES.INFLUENCER]: 'Influencer',
    [MARKETINGAFFILIATE.TYPES.BLOGGER]: 'Blogger',
    [MARKETINGAFFILIATE.TYPES.CONTENT_CREATOR]: 'Content Creator',
    [MARKETINGAFFILIATE.TYPES.PUBLISHER]: 'Publisher',
    [MARKETINGAFFILIATE.TYPES.NETWORK]: 'Network',
    [MARKETINGAFFILIATE.TYPES.AGENCY]: 'Agency',
    [MARKETINGAFFILIATE.TYPES.PARTNER]: 'Partner',
    [MARKETINGAFFILIATE.TYPES.RESELLER]: 'Reseller',
    [MARKETINGAFFILIATE.TYPES.REFERRAL]: 'Referral',
    [MARKETINGAFFILIATE.TYPES.LOYALTY]: 'Loyalty',
  };
  return labels[type] || 'Unknown Affiliate Type';
}

export function marketingaffiliateGetLevelLabel(level: MarketingAffiliateLevel): string {
  const labels: Record<MarketingAffiliateLevel, string> = {
    [MARKETINGAFFILIATE.LEVELS.BRONZE]: 'Bronze',
    [MARKETINGAFFILIATE.LEVELS.SILVER]: 'Silver',
    [MARKETINGAFFILIATE.LEVELS.GOLD]: 'Gold',
    [MARKETINGAFFILIATE.LEVELS.PLATINUM]: 'Platinum',
    [MARKETINGAFFILIATE.LEVELS.DIAMOND]: 'Diamond',
    [MARKETINGAFFILIATE.LEVELS.ELITE]: 'Elite',
    [MARKETINGAFFILIATE.LEVELS.PREMIUM]: 'Premium',
    [MARKETINGAFFILIATE.LEVELS.ENTERPRISE]: 'Enterprise',
  };
  return labels[level] || 'Unknown Level';
}

export function marketingaffiliateGetTierLabel(tier: MarketingAffiliateTier): string {
  const labels: Record<MarketingAffiliateTier, string> = {
    [MARKETINGAFFILIATE.TIERS.TIER_1]: 'Tier 1',
    [MARKETINGAFFILIATE.TIERS.TIER_2]: 'Tier 2',
    [MARKETINGAFFILIATE.TIERS.TIER_3]: 'Tier 3',
    [MARKETINGAFFILIATE.TIERS.TIER_4]: 'Tier 4',
    [MARKETINGAFFILIATE.TIERS.TIER_5]: 'Tier 5',
  };
  return labels[tier] || 'Unknown Tier';
}

export function marketingaffiliateGetSourceLabel(source: MarketingAffiliateSource): string {
  const labels: Record<MarketingAffiliateSource, string> = {
    [MARKETINGAFFILIATE.SOURCES.WEBSITE]: 'Website',
    [MARKETINGAFFILIATE.SOURCES.BLOG]: 'Blog',
    [MARKETINGAFFILIATE.SOURCES.SOCIAL_MEDIA]: 'Social Media',
    [MARKETINGAFFILIATE.SOURCES.YOUTUBE]: 'YouTube',
    [MARKETINGAFFILIATE.SOURCES.PODCAST]: 'Podcast',
    [MARKETINGAFFILIATE.SOURCES.EMAIL]: 'Email',
    [MARKETINGAFFILIATE.SOURCES.NEWSLETTER]: 'Newsletter',
    [MARKETINGAFFILIATE.SOURCES.COUPON_SITE]: 'Coupon Site',
    [MARKETINGAFFILIATE.SOURCES.REVIEW_SITE]: 'Review Site',
    [MARKETINGAFFILIATE.SOURCES.COMPARISON_SITE]: 'Comparison Site',
    [MARKETINGAFFILIATE.SOURCES.FORUM]: 'Forum',
    [MARKETINGAFFILIATE.SOURCES.COMMUNITY]: 'Community',
    [MARKETINGAFFILIATE.SOURCES.REFERRAL]: 'Referral',
    [MARKETINGAFFILIATE.SOURCES.PAID_ADS]: 'Paid Ads',
    [MARKETINGAFFILIATE.SOURCES.ORGANIC]: 'Organic',
    [MARKETINGAFFILIATE.SOURCES.DIRECT]: 'Direct',
  };
  return labels[source] || 'Unknown Source';
}

export function marketingaffiliateGetVerticalLabel(vertical: MarketingAffiliateVertical): string {
  const labels: Record<MarketingAffiliateVertical, string> = {
    [MARKETINGAFFILIATE.VERTICALS.ECOMMERCE]: 'E-Commerce',
    [MARKETINGAFFILIATE.VERTICALS.FASHION]: 'Fashion',
    [MARKETINGAFFILIATE.VERTICALS.ELECTRONICS]: 'Electronics',
    [MARKETINGAFFILIATE.VERTICALS.HEALTH]: 'Health',
    [MARKETINGAFFILIATE.VERTICALS.BEAUTY]: 'Beauty',
    [MARKETINGAFFILIATE.VERTICALS.FITNESS]: 'Fitness',
    [MARKETINGAFFILIATE.VERTICALS.FOOD]: 'Food',
    [MARKETINGAFFILIATE.VERTICALS.TRAVEL]: 'Travel',
    [MARKETINGAFFILIATE.VERTICALS.FINANCE]: 'Finance',
    [MARKETINGAFFILIATE.VERTICALS.EDUCATION]: 'Education',
    [MARKETINGAFFILIATE.VERTICALS.TECHNOLOGY]: 'Technology',
    [MARKETINGAFFILIATE.VERTICALS.GAMING]: 'Gaming',
    [MARKETINGAFFILIATE.VERTICALS.HOME]: 'Home',
    [MARKETINGAFFILIATE.VERTICALS.GARDEN]: 'Garden',
    [MARKETINGAFFILIATE.VERTICALS.AUTOMOTIVE]: 'Automotive',
    [MARKETINGAFFILIATE.VERTICALS.SPORTS]: 'Sports',
    [MARKETINGAFFILIATE.VERTICALS.ENTERTAINMENT]: 'Entertainment',
    [MARKETINGAFFILIATE.VERTICALS.OTHER]: 'Other',
  };
  return labels[vertical] || 'Unknown Vertical';
}

export function marketingaffiliateGetMetricLabel(metric: MarketingAffiliateMetric): string {
  const labels: Record<MarketingAffiliateMetric, string> = {
    [MARKETINGAFFILIATE.METRICS.CLICKS]: 'Clicks',
    [MARKETINGAFFILIATE.METRICS.IMPRESSIONS]: 'Impressions',
    [MARKETINGAFFILIATE.METRICS.CONVERSIONS]: 'Conversions',
    [MARKETINGAFFILIATE.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [MARKETINGAFFILIATE.METRICS.REVENUE]: 'Revenue',
    [MARKETINGAFFILIATE.METRICS.COMMISSION]: 'Commission',
    [MARKETINGAFFILIATE.METRICS.EARNINGS]: 'Earnings',
    [MARKETINGAFFILIATE.METRICS.AOV]: 'Average Order Value',
    [MARKETINGAFFILIATE.METRICS.CTR]: 'Click-Through Rate',
    [MARKETINGAFFILIATE.METRICS.EPC]: 'Earnings Per Click',
    [MARKETINGAFFILIATE.METRICS.ROI]: 'Return on Investment',
    [MARKETINGAFFILIATE.METRICS.CR]: 'Conversion Rate',
    [MARKETINGAFFILIATE.METRICS.SALES]: 'Sales',
    [MARKETINGAFFILIATE.METRICS.REFUNDS]: 'Refunds',
    [MARKETINGAFFILIATE.METRICS.CHARGEBACKS]: 'Chargebacks',
    [MARKETINGAFFILIATE.METRICS.ACTIVE_USERS]: 'Active Users',
    [MARKETINGAFFILIATE.METRICS.NEW_USERS]: 'New Users',
  };
  return labels[metric] || 'Unknown Metric';
}

export function marketingaffiliateGetDefaultCommissionRate(): number {
  return MARKETINGAFFILIATE.DEFAULTS.DEFAULT_COMMISSION_RATE;
}

export function marketingaffiliateGetDefaultPayoutCurrency(): string {
  return MARKETINGAFFILIATE.DEFAULTS.DEFAULT_PAYOUT_CURRENCY;
}

export function marketingaffiliateGetDefaultCookieDuration(): number {
  return MARKETINGAFFILIATE.DEFAULTS.DEFAULT_COOKIE_DURATION;
}

export function marketingaffiliateIsTopTier(level: MarketingAffiliateLevel): boolean {
  const topTiers: MarketingAffiliateLevel[] = [
    MARKETINGAFFILIATE.LEVELS.PLATINUM,
    MARKETINGAFFILIATE.LEVELS.DIAMOND,
    MARKETINGAFFILIATE.LEVELS.ELITE,
    MARKETINGAFFILIATE.LEVELS.PREMIUM,
    MARKETINGAFFILIATE.LEVELS.ENTERPRISE,
  ];
  return topTiers.includes(level);
}

export function marketingaffiliateIsBusinessType(type: MarketingAffiliateType): boolean {
  const businessTypes: MarketingAffiliateType[] = [
    MARKETINGAFFILIATE.TYPES.BUSINESS,
    MARKETINGAFFILIATE.TYPES.NETWORK,
    MARKETINGAFFILIATE.TYPES.AGENCY,
    MARKETINGAFFILIATE.TYPES.PARTNER,
    MARKETINGAFFILIATE.TYPES.RESELLER,
  ];
  return businessTypes.includes(type);
}

export function marketingaffiliateIsIndividualType(type: MarketingAffiliateType): boolean {
  const individualTypes: MarketingAffiliateType[] = [
    MARKETINGAFFILIATE.TYPES.INDIVIDUAL,
    MARKETINGAFFILIATE.TYPES.INFLUENCER,
    MARKETINGAFFILIATE.TYPES.BLOGGER,
    MARKETINGAFFILIATE.TYPES.CONTENT_CREATOR,
    MARKETINGAFFILIATE.TYPES.PUBLISHER,
    MARKETINGAFFILIATE.TYPES.REFERRAL,
    MARKETINGAFFILIATE.TYPES.LOYALTY,
  ];
  return individualTypes.includes(type);
}
