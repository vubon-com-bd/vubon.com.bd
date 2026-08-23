/**
 * Guide Type Constants
 * Types and classifications of guides
 */

export const CONTENT_GUIDE_TYPE = {
  // Guide Categories
  CATEGORIES: {
    TECHNICAL: 'technical',
    USER: 'user',
    ADMIN: 'admin',
    DEVELOPER: 'developer',
    BUSINESS: 'business',
    EDUCATIONAL: 'educational',
    REFERENCE: 'reference',
    TROUBLESHOOTING: 'troubleshooting',
    BEST_PRACTICES: 'best_practices',
    CUSTOM: 'custom',
  } as const,

  // Guide Purposes
  PURPOSES: {
    LEARNING: 'learning',
    REFERENCE: 'reference',
    TROUBLESHOOTING: 'troubleshooting',
    TRAINING: 'training',
    ONBOARDING: 'onboarding',
    IMPROVEMENT: 'improvement',
    MAINTENANCE: 'maintenance',
    COMPLIANCE: 'compliance',
    CUSTOM: 'custom',
  } as const,

  // Guide Audiences
  AUDIENCES: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
    ALL: 'all',
  } as const,

  // Guide Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MEDIUM: 'medium',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Guide Interaction
  INTERACTION: {
    READ_ONLY: 'read_only',
    INTERACTIVE: 'interactive',
    HANDS_ON: 'hands_on',
    DEMO: 'demo',
    CUSTOM: 'custom',
  } as const,

  // Guide Quality
  QUALITY: {
    DRAFT: 'draft',
    STANDARD: 'standard',
    HIGH: 'high',
    PREMIUM: 'premium',
    CERTIFIED: 'certified',
  } as const,

  // Guide Languages
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

// Guide Categories
export type ContentGuideTypeCategory =
  (typeof CONTENT_GUIDE_TYPE.CATEGORIES)[keyof typeof CONTENT_GUIDE_TYPE.CATEGORIES];

// Guide Purposes
export type ContentGuideTypePurpose =
  (typeof CONTENT_GUIDE_TYPE.PURPOSES)[keyof typeof CONTENT_GUIDE_TYPE.PURPOSES];

// Guide Audiences
export type ContentGuideTypeAudience =
  (typeof CONTENT_GUIDE_TYPE.AUDIENCES)[keyof typeof CONTENT_GUIDE_TYPE.AUDIENCES];

// Guide Complexity
export type ContentGuideTypeComplexity =
  (typeof CONTENT_GUIDE_TYPE.COMPLEXITY)[keyof typeof CONTENT_GUIDE_TYPE.COMPLEXITY];

// Guide Interaction
export type ContentGuideTypeInteraction =
  (typeof CONTENT_GUIDE_TYPE.INTERACTION)[keyof typeof CONTENT_GUIDE_TYPE.INTERACTION];

// Guide Quality
export type ContentGuideTypeQuality =
  (typeof CONTENT_GUIDE_TYPE.QUALITY)[keyof typeof CONTENT_GUIDE_TYPE.QUALITY];

// Guide Languages
export type ContentGuideTypeLanguage =
  (typeof CONTENT_GUIDE_TYPE.LANGUAGES)[keyof typeof CONTENT_GUIDE_TYPE.LANGUAGES];

// Utility Functions
export function contentGuideTypeGetCategoryLabel(category: ContentGuideTypeCategory): string {
  const labels: Record<ContentGuideTypeCategory, string> = {
    [CONTENT_GUIDE_TYPE.CATEGORIES.TECHNICAL]: 'Technical Guide',
    [CONTENT_GUIDE_TYPE.CATEGORIES.USER]: 'User Guide',
    [CONTENT_GUIDE_TYPE.CATEGORIES.ADMIN]: 'Admin Guide',
    [CONTENT_GUIDE_TYPE.CATEGORIES.DEVELOPER]: 'Developer Guide',
    [CONTENT_GUIDE_TYPE.CATEGORIES.BUSINESS]: 'Business Guide',
    [CONTENT_GUIDE_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational Guide',
    [CONTENT_GUIDE_TYPE.CATEGORIES.REFERENCE]: 'Reference Guide',
    [CONTENT_GUIDE_TYPE.CATEGORIES.TROUBLESHOOTING]: 'Troubleshooting Guide',
    [CONTENT_GUIDE_TYPE.CATEGORIES.BEST_PRACTICES]: 'Best Practices Guide',
    [CONTENT_GUIDE_TYPE.CATEGORIES.CUSTOM]: 'Custom Guide',
  };
  return labels[category] || 'Unknown Category';
}

export function contentGuideTypeGetPurposeLabel(purpose: ContentGuideTypePurpose): string {
  const labels: Record<ContentGuideTypePurpose, string> = {
    [CONTENT_GUIDE_TYPE.PURPOSES.LEARNING]: 'Learning',
    [CONTENT_GUIDE_TYPE.PURPOSES.REFERENCE]: 'Reference',
    [CONTENT_GUIDE_TYPE.PURPOSES.TROUBLESHOOTING]: 'Troubleshooting',
    [CONTENT_GUIDE_TYPE.PURPOSES.TRAINING]: 'Training',
    [CONTENT_GUIDE_TYPE.PURPOSES.ONBOARDING]: 'Onboarding',
    [CONTENT_GUIDE_TYPE.PURPOSES.IMPROVEMENT]: 'Improvement',
    [CONTENT_GUIDE_TYPE.PURPOSES.MAINTENANCE]: 'Maintenance',
    [CONTENT_GUIDE_TYPE.PURPOSES.COMPLIANCE]: 'Compliance',
    [CONTENT_GUIDE_TYPE.PURPOSES.CUSTOM]: 'Custom Purpose',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function contentGuideTypeGetAudienceLabel(audience: ContentGuideTypeAudience): string {
  const labels: Record<ContentGuideTypeAudience, string> = {
    [CONTENT_GUIDE_TYPE.AUDIENCES.BEGINNER]: 'Beginner',
    [CONTENT_GUIDE_TYPE.AUDIENCES.INTERMEDIATE]: 'Intermediate',
    [CONTENT_GUIDE_TYPE.AUDIENCES.ADVANCED]: 'Advanced',
    [CONTENT_GUIDE_TYPE.AUDIENCES.EXPERT]: 'Expert',
    [CONTENT_GUIDE_TYPE.AUDIENCES.ALL]: 'All Levels',
  };
  return labels[audience] || 'Unknown Audience';
}

export function contentGuideTypeGetComplexityLabel(complexity: ContentGuideTypeComplexity): string {
  const labels: Record<ContentGuideTypeComplexity, string> = {
    [CONTENT_GUIDE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [CONTENT_GUIDE_TYPE.COMPLEXITY.MEDIUM]: 'Medium',
    [CONTENT_GUIDE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [CONTENT_GUIDE_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function contentGuideTypeGetInteractionLabel(
  interaction: ContentGuideTypeInteraction
): string {
  const labels: Record<ContentGuideTypeInteraction, string> = {
    [CONTENT_GUIDE_TYPE.INTERACTION.READ_ONLY]: 'Read Only',
    [CONTENT_GUIDE_TYPE.INTERACTION.INTERACTIVE]: 'Interactive',
    [CONTENT_GUIDE_TYPE.INTERACTION.HANDS_ON]: 'Hands-On',
    [CONTENT_GUIDE_TYPE.INTERACTION.DEMO]: 'Demo',
    [CONTENT_GUIDE_TYPE.INTERACTION.CUSTOM]: 'Custom Interaction',
  };
  return labels[interaction] || 'Unknown Interaction';
}

export function contentGuideTypeGetQualityLabel(quality: ContentGuideTypeQuality): string {
  const labels: Record<ContentGuideTypeQuality, string> = {
    [CONTENT_GUIDE_TYPE.QUALITY.DRAFT]: 'Draft',
    [CONTENT_GUIDE_TYPE.QUALITY.STANDARD]: 'Standard',
    [CONTENT_GUIDE_TYPE.QUALITY.HIGH]: 'High Quality',
    [CONTENT_GUIDE_TYPE.QUALITY.PREMIUM]: 'Premium',
    [CONTENT_GUIDE_TYPE.QUALITY.CERTIFIED]: 'Certified',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentGuideTypeGetLanguageLabel(language: ContentGuideTypeLanguage): string {
  const labels: Record<ContentGuideTypeLanguage, string> = {
    [CONTENT_GUIDE_TYPE.LANGUAGES.EN]: 'English',
    [CONTENT_GUIDE_TYPE.LANGUAGES.BN]: 'Bengali',
    [CONTENT_GUIDE_TYPE.LANGUAGES.HI]: 'Hindi',
    [CONTENT_GUIDE_TYPE.LANGUAGES.AR]: 'Arabic',
    [CONTENT_GUIDE_TYPE.LANGUAGES.ES]: 'Spanish',
    [CONTENT_GUIDE_TYPE.LANGUAGES.FR]: 'French',
    [CONTENT_GUIDE_TYPE.LANGUAGES.DE]: 'German',
    [CONTENT_GUIDE_TYPE.LANGUAGES.ZH]: 'Chinese',
    [CONTENT_GUIDE_TYPE.LANGUAGES.JA]: 'Japanese',
    [CONTENT_GUIDE_TYPE.LANGUAGES.RU]: 'Russian',
  };
  return labels[language] || 'Unknown Language';
}

export function contentGuideTypeIsValidCategory(
  category: string
): category is ContentGuideTypeCategory {
  return Object.values(CONTENT_GUIDE_TYPE.CATEGORIES).includes(
    category as ContentGuideTypeCategory
  );
}

export function contentGuideTypeIsValidPurpose(
  purpose: string
): purpose is ContentGuideTypePurpose {
  return Object.values(CONTENT_GUIDE_TYPE.PURPOSES).includes(purpose as ContentGuideTypePurpose);
}

export function contentGuideTypeIsValidAudience(
  audience: string
): audience is ContentGuideTypeAudience {
  return Object.values(CONTENT_GUIDE_TYPE.AUDIENCES).includes(audience as ContentGuideTypeAudience);
}
