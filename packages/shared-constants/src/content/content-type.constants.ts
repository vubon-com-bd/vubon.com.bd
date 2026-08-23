/**
 * Content Type Constants
 * Types and classifications of content
 */

export const CONTENT_TYPE = {
  // Content Categories (Broader)
  CATEGORIES: {
    TEXT: 'text',
    VISUAL: 'visual',
    AUDIO: 'audio',
    VIDEO: 'video',
    INTERACTIVE: 'interactive',
    DOCUMENT: 'document',
    PRESENTATION: 'presentation',
    SOCIAL: 'social',
    MARKETING: 'marketing',
    EDUCATIONAL: 'educational',
    TECHNICAL: 'technical',
    PROMOTIONAL: 'promotional',
    INFORMATIONAL: 'informational',
    ENTERTAINMENT: 'entertainment',
  } as const,

  // Content Complexity
  COMPLEXITY: {
    BASIC: 'basic',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // Content Purpose
  PURPOSE: {
    EDUCATE: 'educate',
    INFORM: 'inform',
    ENTERTAIN: 'entertain',
    PERSUADE: 'persuade',
    CONVERT: 'convert',
    ENGAGE: 'engage',
    RETAIN: 'retain',
    SELL: 'sell',
    SUPPORT: 'support',
    BUILD_AWARENESS: 'build_awareness',
    GENERATE_LEADS: 'generate_leads',
    BUILD_TRUST: 'build_trust',
  } as const,

  // Content Audience
  AUDIENCE: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
    GENERAL: 'general',
    B2B: 'b2b',
    B2C: 'b2c',
    C2C: 'c2c',
  } as const,

  // Content Tone
  TONE: {
    PROFESSIONAL: 'professional',
    CASUAL: 'casual',
    FRIENDLY: 'friendly',
    FORMAL: 'formal',
    INFORMAL: 'informal',
    CONVERSATIONAL: 'conversational',
    AUTHORITATIVE: 'authoritative',
    PERSUASIVE: 'persuasive',
    INSPIRATIONAL: 'inspirational',
    HUMOROUS: 'humorous',
    SERIOUS: 'serious',
    NEUTRAL: 'neutral',
  } as const,

  // Content Format Types
  FORMAT_TYPES: {
    ARTICLE: 'article',
    BLOG: 'blog',
    NEWSLETTER: 'newsletter',
    EMAIL: 'email',
    SOCIAL_POST: 'social_post',
    VIDEO_SCRIPT: 'video_script',
    PODCAST_SCRIPT: 'podcast_script',
    WEBINAR_SCRIPT: 'webinar_script',
    PRESENTATION_SLIDES: 'presentation_slides',
    WHITE_PAPER: 'white_paper',
    CASE_STUDY: 'case_study',
    E_BOOK: 'e_book',
    GUIDE: 'guide',
    TUTORIAL: 'tutorial',
    DOCUMENTATION: 'documentation',
    FAQ: 'faq',
    TESTIMONIAL: 'testimonial',
    REVIEW: 'review',
    LANDING_PAGE: 'landing_page',
    PRODUCT_DESCRIPTION: 'product_description',
    CATEGORY_DESCRIPTION: 'category_description',
  } as const,

  // Content Quality
  QUALITY: {
    DRAFT: 'draft',
    STANDARD: 'standard',
    HIGH: 'high',
    PREMIUM: 'premium',
    EXCLUSIVE: 'exclusive',
  } as const,
} as const;

// Content Type Categories
export type ContentTypeCategory =
  (typeof CONTENT_TYPE.CATEGORIES)[keyof typeof CONTENT_TYPE.CATEGORIES];

// Content Complexity
export type ContentTypeComplexity =
  (typeof CONTENT_TYPE.COMPLEXITY)[keyof typeof CONTENT_TYPE.COMPLEXITY];

// Content Purpose
export type ContentTypePurpose = (typeof CONTENT_TYPE.PURPOSE)[keyof typeof CONTENT_TYPE.PURPOSE];

// Content Audience
export type ContentTypeAudience =
  (typeof CONTENT_TYPE.AUDIENCE)[keyof typeof CONTENT_TYPE.AUDIENCE];

// Content Tone
export type ContentTypeTone = (typeof CONTENT_TYPE.TONE)[keyof typeof CONTENT_TYPE.TONE];

// Content Format Types
export type ContentTypeFormat =
  (typeof CONTENT_TYPE.FORMAT_TYPES)[keyof typeof CONTENT_TYPE.FORMAT_TYPES];

// Content Quality
export type ContentTypeQuality = (typeof CONTENT_TYPE.QUALITY)[keyof typeof CONTENT_TYPE.QUALITY];

// Utility Functions
export function contentTypeGetCategoryLabel(category: ContentTypeCategory): string {
  const labels: Record<ContentTypeCategory, string> = {
    [CONTENT_TYPE.CATEGORIES.TEXT]: 'Text Content',
    [CONTENT_TYPE.CATEGORIES.VISUAL]: 'Visual Content',
    [CONTENT_TYPE.CATEGORIES.AUDIO]: 'Audio Content',
    [CONTENT_TYPE.CATEGORIES.VIDEO]: 'Video Content',
    [CONTENT_TYPE.CATEGORIES.INTERACTIVE]: 'Interactive Content',
    [CONTENT_TYPE.CATEGORIES.DOCUMENT]: 'Document',
    [CONTENT_TYPE.CATEGORIES.PRESENTATION]: 'Presentation',
    [CONTENT_TYPE.CATEGORIES.SOCIAL]: 'Social Content',
    [CONTENT_TYPE.CATEGORIES.MARKETING]: 'Marketing Content',
    [CONTENT_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational Content',
    [CONTENT_TYPE.CATEGORIES.TECHNICAL]: 'Technical Content',
    [CONTENT_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional Content',
    [CONTENT_TYPE.CATEGORIES.INFORMATIONAL]: 'Informational Content',
    [CONTENT_TYPE.CATEGORIES.ENTERTAINMENT]: 'Entertainment Content',
  };
  return labels[category] || 'Unknown Category';
}

export function contentTypeGetComplexityLabel(complexity: ContentTypeComplexity): string {
  const labels: Record<ContentTypeComplexity, string> = {
    [CONTENT_TYPE.COMPLEXITY.BASIC]: 'Basic',
    [CONTENT_TYPE.COMPLEXITY.INTERMEDIATE]: 'Intermediate',
    [CONTENT_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [CONTENT_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function contentTypeGetPurposeLabel(purpose: ContentTypePurpose): string {
  const labels: Record<ContentTypePurpose, string> = {
    [CONTENT_TYPE.PURPOSE.EDUCATE]: 'Educate',
    [CONTENT_TYPE.PURPOSE.INFORM]: 'Inform',
    [CONTENT_TYPE.PURPOSE.ENTERTAIN]: 'Entertain',
    [CONTENT_TYPE.PURPOSE.PERSUADE]: 'Persuade',
    [CONTENT_TYPE.PURPOSE.CONVERT]: 'Convert',
    [CONTENT_TYPE.PURPOSE.ENGAGE]: 'Engage',
    [CONTENT_TYPE.PURPOSE.RETAIN]: 'Retain',
    [CONTENT_TYPE.PURPOSE.SELL]: 'Sell',
    [CONTENT_TYPE.PURPOSE.SUPPORT]: 'Support',
    [CONTENT_TYPE.PURPOSE.BUILD_AWARENESS]: 'Build Awareness',
    [CONTENT_TYPE.PURPOSE.GENERATE_LEADS]: 'Generate Leads',
    [CONTENT_TYPE.PURPOSE.BUILD_TRUST]: 'Build Trust',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function contentTypeGetAudienceLabel(audience: ContentTypeAudience): string {
  const labels: Record<ContentTypeAudience, string> = {
    [CONTENT_TYPE.AUDIENCE.BEGINNER]: 'Beginner',
    [CONTENT_TYPE.AUDIENCE.INTERMEDIATE]: 'Intermediate',
    [CONTENT_TYPE.AUDIENCE.ADVANCED]: 'Advanced',
    [CONTENT_TYPE.AUDIENCE.EXPERT]: 'Expert',
    [CONTENT_TYPE.AUDIENCE.GENERAL]: 'General Audience',
    [CONTENT_TYPE.AUDIENCE.B2B]: 'B2B',
    [CONTENT_TYPE.AUDIENCE.B2C]: 'B2C',
    [CONTENT_TYPE.AUDIENCE.C2C]: 'C2C',
  };
  return labels[audience] || 'Unknown Audience';
}

export function contentTypeGetToneLabel(tone: ContentTypeTone): string {
  const labels: Record<ContentTypeTone, string> = {
    [CONTENT_TYPE.TONE.PROFESSIONAL]: 'Professional',
    [CONTENT_TYPE.TONE.CASUAL]: 'Casual',
    [CONTENT_TYPE.TONE.FRIENDLY]: 'Friendly',
    [CONTENT_TYPE.TONE.FORMAL]: 'Formal',
    [CONTENT_TYPE.TONE.INFORMAL]: 'Informal',
    [CONTENT_TYPE.TONE.CONVERSATIONAL]: 'Conversational',
    [CONTENT_TYPE.TONE.AUTHORITATIVE]: 'Authoritative',
    [CONTENT_TYPE.TONE.PERSUASIVE]: 'Persuasive',
    [CONTENT_TYPE.TONE.INSPIRATIONAL]: 'Inspirational',
    [CONTENT_TYPE.TONE.HUMOROUS]: 'Humorous',
    [CONTENT_TYPE.TONE.SERIOUS]: 'Serious',
    [CONTENT_TYPE.TONE.NEUTRAL]: 'Neutral',
  };
  return labels[tone] || 'Unknown Tone';
}

export function contentTypeGetFormatLabel(format: ContentTypeFormat): string {
  const labels: Record<ContentTypeFormat, string> = {
    [CONTENT_TYPE.FORMAT_TYPES.ARTICLE]: 'Article',
    [CONTENT_TYPE.FORMAT_TYPES.BLOG]: 'Blog Post',
    [CONTENT_TYPE.FORMAT_TYPES.NEWSLETTER]: 'Newsletter',
    [CONTENT_TYPE.FORMAT_TYPES.EMAIL]: 'Email',
    [CONTENT_TYPE.FORMAT_TYPES.SOCIAL_POST]: 'Social Post',
    [CONTENT_TYPE.FORMAT_TYPES.VIDEO_SCRIPT]: 'Video Script',
    [CONTENT_TYPE.FORMAT_TYPES.PODCAST_SCRIPT]: 'Podcast Script',
    [CONTENT_TYPE.FORMAT_TYPES.WEBINAR_SCRIPT]: 'Webinar Script',
    [CONTENT_TYPE.FORMAT_TYPES.PRESENTATION_SLIDES]: 'Presentation Slides',
    [CONTENT_TYPE.FORMAT_TYPES.WHITE_PAPER]: 'White Paper',
    [CONTENT_TYPE.FORMAT_TYPES.CASE_STUDY]: 'Case Study',
    [CONTENT_TYPE.FORMAT_TYPES.E_BOOK]: 'E-Book',
    [CONTENT_TYPE.FORMAT_TYPES.GUIDE]: 'Guide',
    [CONTENT_TYPE.FORMAT_TYPES.TUTORIAL]: 'Tutorial',
    [CONTENT_TYPE.FORMAT_TYPES.DOCUMENTATION]: 'Documentation',
    [CONTENT_TYPE.FORMAT_TYPES.FAQ]: 'FAQ',
    [CONTENT_TYPE.FORMAT_TYPES.TESTIMONIAL]: 'Testimonial',
    [CONTENT_TYPE.FORMAT_TYPES.REVIEW]: 'Review',
    [CONTENT_TYPE.FORMAT_TYPES.LANDING_PAGE]: 'Landing Page',
    [CONTENT_TYPE.FORMAT_TYPES.PRODUCT_DESCRIPTION]: 'Product Description',
    [CONTENT_TYPE.FORMAT_TYPES.CATEGORY_DESCRIPTION]: 'Category Description',
  };
  return labels[format] || 'Unknown Format';
}

export function contentTypeGetQualityLabel(quality: ContentTypeQuality): string {
  const labels: Record<ContentTypeQuality, string> = {
    [CONTENT_TYPE.QUALITY.DRAFT]: 'Draft',
    [CONTENT_TYPE.QUALITY.STANDARD]: 'Standard',
    [CONTENT_TYPE.QUALITY.HIGH]: 'High Quality',
    [CONTENT_TYPE.QUALITY.PREMIUM]: 'Premium',
    [CONTENT_TYPE.QUALITY.EXCLUSIVE]: 'Exclusive',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentTypeIsValidCategory(category: string): category is ContentTypeCategory {
  return Object.values(CONTENT_TYPE.CATEGORIES).includes(category as ContentTypeCategory);
}

export function contentTypeIsValidPurpose(purpose: string): purpose is ContentTypePurpose {
  return Object.values(CONTENT_TYPE.PURPOSE).includes(purpose as ContentTypePurpose);
}
