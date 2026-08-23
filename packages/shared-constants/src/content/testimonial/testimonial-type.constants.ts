/**
 * Testimonial Type Constants
 * Types and classifications of testimonials
 */

export const CONTENT_TESTIMONIAL_TYPE = {
  // Testimonial Categories
  CATEGORIES: {
    PRODUCT: 'product',
    SERVICE: 'service',
    EXPERIENCE: 'experience',
    SUPPORT: 'support',
    QUALITY: 'quality',
    VALUE: 'value',
    RELIABILITY: 'reliability',
    TRUST: 'trust',
    SATISFACTION: 'satisfaction',
    RECOMMENDATION: 'recommendation',
    CUSTOM: 'custom',
  } as const,

  // Testimonial Sub-Types
  SUB_TYPES: {
    // Product
    PRODUCT_REVIEW: 'product_review',
    PRODUCT_RECOMMENDATION: 'product_recommendation',
    PRODUCT_COMPARISON: 'product_comparison',

    // Service
    SERVICE_REVIEW: 'service_review',
    SERVICE_EXPERIENCE: 'service_experience',

    // Experience
    USER_EXPERIENCE: 'user_experience',
    CUSTOMER_EXPERIENCE: 'customer_experience',

    // Support
    SUPPORT_EXPERIENCE: 'support_experience',
    SUPPORT_RESPONSE: 'support_response',

    // Quality
    QUALITY_REVIEW: 'quality_review',
    QUALITY_ASSURANCE: 'quality_assurance',

    // Value
    VALUE_REVIEW: 'value_review',
    VALUE_FOR_MONEY: 'value_for_money',

    // Reliability
    RELIABILITY_REVIEW: 'reliability_review',
    RELIABILITY_TESTIMONIAL: 'reliability_testimonial',

    // Trust
    TRUST_REVIEW: 'trust_review',
    TRUST_BUILDING: 'trust_building',

    // Satisfaction
    SATISFACTION_REVIEW: 'satisfaction_review',
    SATISFACTION_SURVEY: 'satisfaction_survey',

    // Recommendation
    RECOMMENDATION_REVIEW: 'recommendation_review',
    REFERRAL_TESTIMONIAL: 'referral_testimonial',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // Testimonial Sentiments
  SENTIMENTS: {
    POSITIVE: 'positive',
    NEGATIVE: 'negative',
    NEUTRAL: 'neutral',
    MIXED: 'mixed',
  } as const,

  // Testimonial Authenticity
  AUTHENTICITY: {
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    PENDING: 'pending',
    FLAGGED: 'flagged',
  } as const,

  // Testimonial Impact
  IMPACT: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    FEATURED: 'featured',
    TOP: 'top',
  } as const,

  // Testimonial Language
  LANGUAGES: {
    EN: 'en',
    BN: 'bn',
    HI: 'hi',
    AR: 'ar',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    ZH: 'zh',
    JA: 'ja',
    RU: 'ru',
  } as const,
} as const;

// Testimonial Categories
export type ContentTestimonialTypeCategory =
  (typeof CONTENT_TESTIMONIAL_TYPE.CATEGORIES)[keyof typeof CONTENT_TESTIMONIAL_TYPE.CATEGORIES];

// Testimonial Sub-Types
export type ContentTestimonialTypeSubType =
  (typeof CONTENT_TESTIMONIAL_TYPE.SUB_TYPES)[keyof typeof CONTENT_TESTIMONIAL_TYPE.SUB_TYPES];

// Testimonial Sentiments
export type ContentTestimonialTypeSentiment =
  (typeof CONTENT_TESTIMONIAL_TYPE.SENTIMENTS)[keyof typeof CONTENT_TESTIMONIAL_TYPE.SENTIMENTS];

// Testimonial Authenticity
export type ContentTestimonialTypeAuthenticity =
  (typeof CONTENT_TESTIMONIAL_TYPE.AUTHENTICITY)[keyof typeof CONTENT_TESTIMONIAL_TYPE.AUTHENTICITY];

// Testimonial Impact
export type ContentTestimonialTypeImpact =
  (typeof CONTENT_TESTIMONIAL_TYPE.IMPACT)[keyof typeof CONTENT_TESTIMONIAL_TYPE.IMPACT];

// Testimonial Language
export type ContentTestimonialTypeLanguage =
  (typeof CONTENT_TESTIMONIAL_TYPE.LANGUAGES)[keyof typeof CONTENT_TESTIMONIAL_TYPE.LANGUAGES];

// Utility Functions
export function contentTestimonialTypeGetCategoryLabel(
  category: ContentTestimonialTypeCategory
): string {
  const labels: Record<ContentTestimonialTypeCategory, string> = {
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.PRODUCT]: 'Product Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.SERVICE]: 'Service Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.EXPERIENCE]: 'Experience Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.SUPPORT]: 'Support Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.QUALITY]: 'Quality Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.VALUE]: 'Value Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.RELIABILITY]: 'Reliability Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.TRUST]: 'Trust Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.SATISFACTION]: 'Satisfaction Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.RECOMMENDATION]: 'Recommendation Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.CATEGORIES.CUSTOM]: 'Custom Testimonial',
  };
  return labels[category] || 'Unknown Category';
}

export function contentTestimonialTypeGetSubTypeLabel(
  subType: ContentTestimonialTypeSubType
): string {
  const labels: Record<ContentTestimonialTypeSubType, string> = {
    // Product
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.PRODUCT_REVIEW]: 'Product Review',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.PRODUCT_RECOMMENDATION]: 'Product Recommendation',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.PRODUCT_COMPARISON]: 'Product Comparison',

    // Service
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.SERVICE_REVIEW]: 'Service Review',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.SERVICE_EXPERIENCE]: 'Service Experience',

    // Experience
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.USER_EXPERIENCE]: 'User Experience',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.CUSTOMER_EXPERIENCE]: 'Customer Experience',

    // Support
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.SUPPORT_EXPERIENCE]: 'Support Experience',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.SUPPORT_RESPONSE]: 'Support Response',

    // Quality
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.QUALITY_REVIEW]: 'Quality Review',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.QUALITY_ASSURANCE]: 'Quality Assurance',

    // Value
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.VALUE_REVIEW]: 'Value Review',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.VALUE_FOR_MONEY]: 'Value for Money',

    // Reliability
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.RELIABILITY_REVIEW]: 'Reliability Review',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.RELIABILITY_TESTIMONIAL]: 'Reliability Testimonial',

    // Trust
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.TRUST_REVIEW]: 'Trust Review',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.TRUST_BUILDING]: 'Trust Building',

    // Satisfaction
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.SATISFACTION_REVIEW]: 'Satisfaction Review',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.SATISFACTION_SURVEY]: 'Satisfaction Survey',

    // Recommendation
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.RECOMMENDATION_REVIEW]: 'Recommendation Review',
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.REFERRAL_TESTIMONIAL]: 'Referral Testimonial',

    // Custom
    [CONTENT_TESTIMONIAL_TYPE.SUB_TYPES.CUSTOM]: 'Custom Sub-Type',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function contentTestimonialTypeGetSentimentLabel(
  sentiment: ContentTestimonialTypeSentiment
): string {
  const labels: Record<ContentTestimonialTypeSentiment, string> = {
    [CONTENT_TESTIMONIAL_TYPE.SENTIMENTS.POSITIVE]: 'Positive',
    [CONTENT_TESTIMONIAL_TYPE.SENTIMENTS.NEGATIVE]: 'Negative',
    [CONTENT_TESTIMONIAL_TYPE.SENTIMENTS.NEUTRAL]: 'Neutral',
    [CONTENT_TESTIMONIAL_TYPE.SENTIMENTS.MIXED]: 'Mixed',
  };
  return labels[sentiment] || 'Unknown Sentiment';
}

export function contentTestimonialTypeGetAuthenticityLabel(
  authenticity: ContentTestimonialTypeAuthenticity
): string {
  const labels: Record<ContentTestimonialTypeAuthenticity, string> = {
    [CONTENT_TESTIMONIAL_TYPE.AUTHENTICITY.VERIFIED]: 'Verified',
    [CONTENT_TESTIMONIAL_TYPE.AUTHENTICITY.UNVERIFIED]: 'Unverified',
    [CONTENT_TESTIMONIAL_TYPE.AUTHENTICITY.PENDING]: 'Pending Verification',
    [CONTENT_TESTIMONIAL_TYPE.AUTHENTICITY.FLAGGED]: 'Flagged',
  };
  return labels[authenticity] || 'Unknown Authenticity';
}

export function contentTestimonialTypeGetImpactLabel(impact: ContentTestimonialTypeImpact): string {
  const labels: Record<ContentTestimonialTypeImpact, string> = {
    [CONTENT_TESTIMONIAL_TYPE.IMPACT.LOW]: 'Low Impact',
    [CONTENT_TESTIMONIAL_TYPE.IMPACT.MEDIUM]: 'Medium Impact',
    [CONTENT_TESTIMONIAL_TYPE.IMPACT.HIGH]: 'High Impact',
    [CONTENT_TESTIMONIAL_TYPE.IMPACT.FEATURED]: 'Featured Testimonial',
    [CONTENT_TESTIMONIAL_TYPE.IMPACT.TOP]: 'Top Testimonial',
  };
  return labels[impact] || 'Unknown Impact';
}

export function contentTestimonialTypeGetLanguageLabel(
  language: ContentTestimonialTypeLanguage
): string {
  const labels: Record<ContentTestimonialTypeLanguage, string> = {
    [CONTENT_TESTIMONIAL_TYPE.LANGUAGES.EN]: 'English',
    [CONTENT_TESTIMONIAL_TYPE.LANGUAGES.BN]: 'Bengali',
    [CONTENT_TESTIMONIAL_TYPE.LANGUAGES.HI]: 'Hindi',
    [CONTENT_TESTIMONIAL_TYPE.LANGUAGES.AR]: 'Arabic',
    [CONTENT_TESTIMONIAL_TYPE.LANGUAGES.ES]: 'Spanish',
    [CONTENT_TESTIMONIAL_TYPE.LANGUAGES.FR]: 'French',
    [CONTENT_TESTIMONIAL_TYPE.LANGUAGES.DE]: 'German',
    [CONTENT_TESTIMONIAL_TYPE.LANGUAGES.ZH]: 'Chinese',
    [CONTENT_TESTIMONIAL_TYPE.LANGUAGES.JA]: 'Japanese',
    [CONTENT_TESTIMONIAL_TYPE.LANGUAGES.RU]: 'Russian',
  };
  return labels[language] || 'Unknown Language';
}

export function contentTestimonialTypeIsValidCategory(
  category: string
): category is ContentTestimonialTypeCategory {
  return Object.values(CONTENT_TESTIMONIAL_TYPE.CATEGORIES).includes(
    category as ContentTestimonialTypeCategory
  );
}

export function contentTestimonialTypeIsValidSentiment(
  sentiment: string
): sentiment is ContentTestimonialTypeSentiment {
  return Object.values(CONTENT_TESTIMONIAL_TYPE.SENTIMENTS).includes(
    sentiment as ContentTestimonialTypeSentiment
  );
}
