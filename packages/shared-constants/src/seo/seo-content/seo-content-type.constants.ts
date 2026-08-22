/**
 * SEO Content Type Constants
 * Types and classifications for SEO content
 */

export const SEO_CONTENT_TYPE = {
  // Content Categories
  CATEGORIES: {
    BLOG: 'blog',
    MARKETING: 'marketing',
    PRODUCT: 'product',
    TECHNICAL: 'technical',
    SUPPORT: 'support',
    EDUCATIONAL: 'educational',
    ENTERTAINMENT: 'entertainment',
    NEWS: 'news',
    CORPORATE: 'corporate',
    USER_GENERATED: 'user_generated',
  } as const,

  // Content Sub-categories
  SUB_CATEGORIES: {
    // Blog
    TUTORIAL: 'tutorial',
    GUIDE: 'guide',
    REVIEW: 'review',
    COMPARISON: 'comparison',
    LIST: 'list',
    HOW_TO: 'how_to',
    OPINION: 'opinion',
    CASE_STUDY: 'case_study',
    INTERVIEW: 'interview',
    GUEST_POST: 'guest_post',

    // Marketing
    LANDING: 'landing',
    SALES: 'sales',
    ADVERTORIAL: 'advertorial',
    PROMOTIONAL: 'promotional',
    LEAD_MAGNET: 'lead_magnet',

    // Product
    DESCRIPTION: 'description',
    SPECIFICATION: 'specification',
    USER_GUIDE: 'user_guide',
    INSTALLATION: 'installation',
    TROUBLESHOOTING: 'troubleshooting',

    // Technical
    DOCUMENTATION: 'documentation',
    API: 'api',
    DEVELOPER: 'developer',
    RELEASE_NOTES: 'release_notes',
    CHANGELOG: 'changelog',

    // Support
    FAQ: 'faq',
    KNOWLEDGE_BASE: 'knowledge_base',
    TICKET: 'ticket',
    SOLUTION: 'solution',
  } as const,

  // Content Styles
  STYLES: {
    NARRATIVE: 'narrative',
    DESCRIPTIVE: 'descriptive',
    EXPOSITORY: 'expository',
    PERSUASIVE: 'persuasive',
    ARGUMENTATIVE: 'argumentative',
    COMPARATIVE: 'comparative',
    ANALYTICAL: 'analytical',
    CRITICAL: 'critical',
    INFORMATIVE: 'informative',
    ENTERTAINING: 'entertaining',
    INSPIRATIONAL: 'inspirational',
  } as const,

  // Content Complexity
  COMPLEXITY: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // Content Audience
  AUDIENCES: {
    B2C: 'b2c',
    B2B: 'b2b',
    D2C: 'd2c',
    ENTERPRISE: 'enterprise',
    SME: 'sme',
    GENERAL: 'general',
    NICHE: 'niche',
  } as const,

  // Content Formats
  FORMATS: {
    LONG_FORM: 'long_form',
    SHORT_FORM: 'short_form',
    LISTICLE: 'listicle',
    STEP_BY_STEP: 'step_by_step',
    Q_A: 'q_a',
    CHECKLIST: 'checklist',
    TEMPLATE: 'template',
    WORKSHEET: 'worksheet',
    SLIDESHOW: 'slideshow',
    INTERACTIVE: 'interactive',
    MULTIMEDIA: 'multimedia',
  } as const,

  // Content Sources
  SOURCES: {
    ORIGINAL: 'original',
    CURATED: 'curated',
    SYNDICATED: 'syndicated',
    USER_GENERATED: 'user_generated',
    AI_GENERATED: 'ai_generated',
    TRANSLATED: 'translated',
    UPDATED: 'updated',
    REPURPOSED: 'repurposed',
  } as const,
} as const;

// Content Categories
export type SEOContentTypeCategory =
  (typeof SEO_CONTENT_TYPE.CATEGORIES)[keyof typeof SEO_CONTENT_TYPE.CATEGORIES];

// Content Sub-categories
export type SEOContentTypeSubCategory =
  (typeof SEO_CONTENT_TYPE.SUB_CATEGORIES)[keyof typeof SEO_CONTENT_TYPE.SUB_CATEGORIES];

// Content Styles
export type SEOContentTypeStyle =
  (typeof SEO_CONTENT_TYPE.STYLES)[keyof typeof SEO_CONTENT_TYPE.STYLES];

// Content Complexity
export type SEOContentTypeComplexity =
  (typeof SEO_CONTENT_TYPE.COMPLEXITY)[keyof typeof SEO_CONTENT_TYPE.COMPLEXITY];

// Content Audience
export type SEOContentTypeAudience =
  (typeof SEO_CONTENT_TYPE.AUDIENCES)[keyof typeof SEO_CONTENT_TYPE.AUDIENCES];

// Content Formats
export type SEOContentTypeFormat =
  (typeof SEO_CONTENT_TYPE.FORMATS)[keyof typeof SEO_CONTENT_TYPE.FORMATS];

// Content Sources
export type SEOContentTypeSource =
  (typeof SEO_CONTENT_TYPE.SOURCES)[keyof typeof SEO_CONTENT_TYPE.SOURCES];

// Utility Functions
export function getSEOContentCategoryLabel(category: SEOContentTypeCategory): string {
  const labels: Record<SEOContentTypeCategory, string> = {
    [SEO_CONTENT_TYPE.CATEGORIES.BLOG]: 'Blog Content',
    [SEO_CONTENT_TYPE.CATEGORIES.MARKETING]: 'Marketing Content',
    [SEO_CONTENT_TYPE.CATEGORIES.PRODUCT]: 'Product Content',
    [SEO_CONTENT_TYPE.CATEGORIES.TECHNICAL]: 'Technical Content',
    [SEO_CONTENT_TYPE.CATEGORIES.SUPPORT]: 'Support Content',
    [SEO_CONTENT_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational Content',
    [SEO_CONTENT_TYPE.CATEGORIES.ENTERTAINMENT]: 'Entertainment Content',
    [SEO_CONTENT_TYPE.CATEGORIES.NEWS]: 'News Content',
    [SEO_CONTENT_TYPE.CATEGORIES.CORPORATE]: 'Corporate Content',
    [SEO_CONTENT_TYPE.CATEGORIES.USER_GENERATED]: 'User Generated Content',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOContentSubCategoryLabel(subCategory: SEOContentTypeSubCategory): string {
  const labels: Record<SEOContentTypeSubCategory, string> = {
    // Blog
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.TUTORIAL]: 'Tutorial',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.GUIDE]: 'Guide',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.REVIEW]: 'Review',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.COMPARISON]: 'Comparison',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.LIST]: 'List',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.HOW_TO]: 'How-To',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.OPINION]: 'Opinion',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.CASE_STUDY]: 'Case Study',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.INTERVIEW]: 'Interview',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.GUEST_POST]: 'Guest Post',

    // Marketing
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.LANDING]: 'Landing Page',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.SALES]: 'Sales Content',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.ADVERTORIAL]: 'Advertorial',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.PROMOTIONAL]: 'Promotional Content',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.LEAD_MAGNET]: 'Lead Magnet',

    // Product
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.DESCRIPTION]: 'Product Description',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.SPECIFICATION]: 'Product Specification',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.USER_GUIDE]: 'User Guide',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.INSTALLATION]: 'Installation Guide',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.TROUBLESHOOTING]: 'Troubleshooting',

    // Technical
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.DOCUMENTATION]: 'Documentation',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.API]: 'API Documentation',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.DEVELOPER]: 'Developer Content',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.RELEASE_NOTES]: 'Release Notes',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.CHANGELOG]: 'Changelog',

    // Support
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.FAQ]: 'FAQ',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.KNOWLEDGE_BASE]: 'Knowledge Base',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.TICKET]: 'Support Ticket',
    [SEO_CONTENT_TYPE.SUB_CATEGORIES.SOLUTION]: 'Solution',
  };
  return labels[subCategory] || 'Unknown Sub-Category';
}

export function getSEOContentStyleLabel(style: SEOContentTypeStyle): string {
  const labels: Record<SEOContentTypeStyle, string> = {
    [SEO_CONTENT_TYPE.STYLES.NARRATIVE]: 'Narrative',
    [SEO_CONTENT_TYPE.STYLES.DESCRIPTIVE]: 'Descriptive',
    [SEO_CONTENT_TYPE.STYLES.EXPOSITORY]: 'Expository',
    [SEO_CONTENT_TYPE.STYLES.PERSUASIVE]: 'Persuasive',
    [SEO_CONTENT_TYPE.STYLES.ARGUMENTATIVE]: 'Argumentative',
    [SEO_CONTENT_TYPE.STYLES.COMPARATIVE]: 'Comparative',
    [SEO_CONTENT_TYPE.STYLES.ANALYTICAL]: 'Analytical',
    [SEO_CONTENT_TYPE.STYLES.CRITICAL]: 'Critical',
    [SEO_CONTENT_TYPE.STYLES.INFORMATIVE]: 'Informative',
    [SEO_CONTENT_TYPE.STYLES.ENTERTAINING]: 'Entertaining',
    [SEO_CONTENT_TYPE.STYLES.INSPIRATIONAL]: 'Inspirational',
  };
  return labels[style] || 'Unknown Style';
}

export function getSEOContentComplexityLabel(complexity: SEOContentTypeComplexity): string {
  const labels: Record<SEOContentTypeComplexity, string> = {
    [SEO_CONTENT_TYPE.COMPLEXITY.BEGINNER]: 'Beginner',
    [SEO_CONTENT_TYPE.COMPLEXITY.INTERMEDIATE]: 'Intermediate',
    [SEO_CONTENT_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [SEO_CONTENT_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function getSEOContentAudienceLabel(audience: SEOContentTypeAudience): string {
  const labels: Record<SEOContentTypeAudience, string> = {
    [SEO_CONTENT_TYPE.AUDIENCES.B2C]: 'B2C',
    [SEO_CONTENT_TYPE.AUDIENCES.B2B]: 'B2B',
    [SEO_CONTENT_TYPE.AUDIENCES.D2C]: 'D2C',
    [SEO_CONTENT_TYPE.AUDIENCES.ENTERPRISE]: 'Enterprise',
    [SEO_CONTENT_TYPE.AUDIENCES.SME]: 'SME',
    [SEO_CONTENT_TYPE.AUDIENCES.GENERAL]: 'General Audience',
    [SEO_CONTENT_TYPE.AUDIENCES.NICHE]: 'Niche Audience',
  };
  return labels[audience] || 'Unknown Audience';
}

export function getSEOContentFormatTypeLabel(format: SEOContentTypeFormat): string {
  const labels: Record<SEOContentTypeFormat, string> = {
    [SEO_CONTENT_TYPE.FORMATS.LONG_FORM]: 'Long Form Content',
    [SEO_CONTENT_TYPE.FORMATS.SHORT_FORM]: 'Short Form Content',
    [SEO_CONTENT_TYPE.FORMATS.LISTICLE]: 'Listicle',
    [SEO_CONTENT_TYPE.FORMATS.STEP_BY_STEP]: 'Step-by-Step Guide',
    [SEO_CONTENT_TYPE.FORMATS.Q_A]: 'Q&A Format',
    [SEO_CONTENT_TYPE.FORMATS.CHECKLIST]: 'Checklist',
    [SEO_CONTENT_TYPE.FORMATS.TEMPLATE]: 'Template',
    [SEO_CONTENT_TYPE.FORMATS.WORKSHEET]: 'Worksheet',
    [SEO_CONTENT_TYPE.FORMATS.SLIDESHOW]: 'Slideshow',
    [SEO_CONTENT_TYPE.FORMATS.INTERACTIVE]: 'Interactive Content',
    [SEO_CONTENT_TYPE.FORMATS.MULTIMEDIA]: 'Multimedia Content',
  };
  return labels[format] || 'Unknown Format';
}

export function getSEOContentSourceLabel(source: SEOContentTypeSource): string {
  const labels: Record<SEOContentTypeSource, string> = {
    [SEO_CONTENT_TYPE.SOURCES.ORIGINAL]: 'Original Content',
    [SEO_CONTENT_TYPE.SOURCES.CURATED]: 'Curated Content',
    [SEO_CONTENT_TYPE.SOURCES.SYNDICATED]: 'Syndicated Content',
    [SEO_CONTENT_TYPE.SOURCES.USER_GENERATED]: 'User Generated Content',
    [SEO_CONTENT_TYPE.SOURCES.AI_GENERATED]: 'AI Generated Content',
    [SEO_CONTENT_TYPE.SOURCES.TRANSLATED]: 'Translated Content',
    [SEO_CONTENT_TYPE.SOURCES.UPDATED]: 'Updated Content',
    [SEO_CONTENT_TYPE.SOURCES.REPURPOSED]: 'Repurposed Content',
  };
  return labels[source] || 'Unknown Source';
}
