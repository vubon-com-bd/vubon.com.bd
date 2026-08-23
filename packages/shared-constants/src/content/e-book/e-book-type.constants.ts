/**
 * E-Book Type Constants
 * Types and classifications of e-books
 */

export const CONTENT_E_BOOK_TYPE = {
  // E-Book Categories
  CATEGORIES: {
    FICTION: 'fiction',
    NON_FICTION: 'non_fiction',
    REFERENCE: 'reference',
    ACADEMIC: 'academic',
    PROFESSIONAL: 'professional',
    CHILDREN: 'children',
    YOUNG_ADULT: 'young_adult',
    CUSTOM: 'custom',
  } as const,

  // E-Book Sub-Types
  SUB_TYPES: {
    // Fiction
    NOVEL: 'novel',
    SHORT_STORY: 'short_story',
    ANTHOLOGY: 'anthology',
    POETRY: 'poetry',
    DRAMA: 'drama',

    // Non-Fiction
    BIOGRAPHY: 'biography',
    MEMOIR: 'memoir',
    ESSAY: 'essay',
    JOURNALISM: 'journalism',

    // Reference
    DICTIONARY: 'dictionary',
    ENCYCLOPEDIA: 'encyclopedia',
    THESAURUS: 'thesaurus',
    HANDBOOK: 'handbook',

    // Academic
    TEXTBOOK: 'textbook',
    MONOGRAPH: 'monograph',
    JOURNAL: 'journal',
    PAPER: 'paper',

    // Professional
    MANUAL: 'manual',
    GUIDE: 'guide',
    REPORT: 'report',
    WHITE_PAPER: 'white_paper',

    // Children
    PICTURE_BOOK: 'picture_book',
    CHAPTER_BOOK: 'chapter_book',
    ACTIVITY_BOOK: 'activity_book',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // E-Book Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    NATIONAL: 'national',
    LOCAL: 'local',
    CUSTOM: 'custom',
  } as const,

  // E-Book Audiences
  AUDIENCES: {
    GENERAL: 'general',
    CHILDREN: 'children',
    TEEN: 'teen',
    YOUNG_ADULT: 'young_adult',
    ADULT: 'adult',
    PROFESSIONAL: 'professional',
    ACADEMIC: 'academic',
    CUSTOM: 'custom',
  } as const,

  // E-Book Complexity
  COMPLEXITY: {
    BASIC: 'basic',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // E-Book Quality
  QUALITY: {
    STANDARD: 'standard',
    PREMIUM: 'premium',
    FEATURED: 'featured',
    BESTSELLER: 'bestseller',
    AWARD_WINNING: 'award_winning',
    CUSTOM: 'custom',
  } as const,

  // E-Book Rights
  RIGHTS: {
    ALL_RIGHTS_RESERVED: 'all_rights_reserved',
    CC_BY: 'cc_by',
    CC_BY_SA: 'cc_by_sa',
    CC_BY_ND: 'cc_by_nd',
    CC_BY_NC: 'cc_by_nc',
    CC_BY_NC_SA: 'cc_by_nc_sa',
    CC_BY_NC_ND: 'cc_by_nc_nd',
    CC0: 'cc0',
    PUBLIC_DOMAIN: 'public_domain',
    CUSTOM: 'custom',
  } as const,
} as const;

// E-Book Categories
export type ContentEBookTypeCategory =
  (typeof CONTENT_E_BOOK_TYPE.CATEGORIES)[keyof typeof CONTENT_E_BOOK_TYPE.CATEGORIES];

// E-Book Sub-Types
export type ContentEBookTypeSubType =
  (typeof CONTENT_E_BOOK_TYPE.SUB_TYPES)[keyof typeof CONTENT_E_BOOK_TYPE.SUB_TYPES];

// E-Book Scopes
export type ContentEBookTypeScope =
  (typeof CONTENT_E_BOOK_TYPE.SCOPES)[keyof typeof CONTENT_E_BOOK_TYPE.SCOPES];

// E-Book Audiences
export type ContentEBookTypeAudience =
  (typeof CONTENT_E_BOOK_TYPE.AUDIENCES)[keyof typeof CONTENT_E_BOOK_TYPE.AUDIENCES];

// E-Book Complexity
export type ContentEBookTypeComplexity =
  (typeof CONTENT_E_BOOK_TYPE.COMPLEXITY)[keyof typeof CONTENT_E_BOOK_TYPE.COMPLEXITY];

// E-Book Quality
export type ContentEBookTypeQuality =
  (typeof CONTENT_E_BOOK_TYPE.QUALITY)[keyof typeof CONTENT_E_BOOK_TYPE.QUALITY];

// E-Book Rights
export type ContentEBookTypeRights =
  (typeof CONTENT_E_BOOK_TYPE.RIGHTS)[keyof typeof CONTENT_E_BOOK_TYPE.RIGHTS];

// Utility Functions
export function contentEBookTypeGetCategoryLabel(category: ContentEBookTypeCategory): string {
  const labels: Record<ContentEBookTypeCategory, string> = {
    [CONTENT_E_BOOK_TYPE.CATEGORIES.FICTION]: 'Fiction E-Book',
    [CONTENT_E_BOOK_TYPE.CATEGORIES.NON_FICTION]: 'Non-Fiction E-Book',
    [CONTENT_E_BOOK_TYPE.CATEGORIES.REFERENCE]: 'Reference E-Book',
    [CONTENT_E_BOOK_TYPE.CATEGORIES.ACADEMIC]: 'Academic E-Book',
    [CONTENT_E_BOOK_TYPE.CATEGORIES.PROFESSIONAL]: 'Professional E-Book',
    [CONTENT_E_BOOK_TYPE.CATEGORIES.CHILDREN]: "Children's E-Book",
    [CONTENT_E_BOOK_TYPE.CATEGORIES.YOUNG_ADULT]: 'Young Adult E-Book',
    [CONTENT_E_BOOK_TYPE.CATEGORIES.CUSTOM]: 'Custom E-Book',
  };
  return labels[category] || 'Unknown Category';
}

export function contentEBookTypeGetSubTypeLabel(subType: ContentEBookTypeSubType): string {
  const labels: Record<ContentEBookTypeSubType, string> = {
    // Fiction
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.NOVEL]: 'Novel',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.SHORT_STORY]: 'Short Story',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.ANTHOLOGY]: 'Anthology',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.POETRY]: 'Poetry',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.DRAMA]: 'Drama',

    // Non-Fiction
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.BIOGRAPHY]: 'Biography',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.MEMOIR]: 'Memoir',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.ESSAY]: 'Essay',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.JOURNALISM]: 'Journalism',

    // Reference
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.DICTIONARY]: 'Dictionary',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.ENCYCLOPEDIA]: 'Encyclopedia',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.THESAURUS]: 'Thesaurus',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.HANDBOOK]: 'Handbook',

    // Academic
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.TEXTBOOK]: 'Textbook',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.MONOGRAPH]: 'Monograph',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.JOURNAL]: 'Journal',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.PAPER]: 'Paper',

    // Professional
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.MANUAL]: 'Manual',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.GUIDE]: 'Guide',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.REPORT]: 'Report',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.WHITE_PAPER]: 'White Paper',

    // Children
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.PICTURE_BOOK]: 'Picture Book',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.CHAPTER_BOOK]: 'Chapter Book',
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.ACTIVITY_BOOK]: 'Activity Book',

    // Custom
    [CONTENT_E_BOOK_TYPE.SUB_TYPES.CUSTOM]: 'Custom Sub-Type',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function contentEBookTypeGetScopeLabel(scope: ContentEBookTypeScope): string {
  const labels: Record<ContentEBookTypeScope, string> = {
    [CONTENT_E_BOOK_TYPE.SCOPES.GLOBAL]: 'Global',
    [CONTENT_E_BOOK_TYPE.SCOPES.REGIONAL]: 'Regional',
    [CONTENT_E_BOOK_TYPE.SCOPES.NATIONAL]: 'National',
    [CONTENT_E_BOOK_TYPE.SCOPES.LOCAL]: 'Local',
    [CONTENT_E_BOOK_TYPE.SCOPES.CUSTOM]: 'Custom Scope',
  };
  return labels[scope] || 'Unknown Scope';
}

export function contentEBookTypeGetAudienceLabel(audience: ContentEBookTypeAudience): string {
  const labels: Record<ContentEBookTypeAudience, string> = {
    [CONTENT_E_BOOK_TYPE.AUDIENCES.GENERAL]: 'General Audience',
    [CONTENT_E_BOOK_TYPE.AUDIENCES.CHILDREN]: 'Children',
    [CONTENT_E_BOOK_TYPE.AUDIENCES.TEEN]: 'Teen',
    [CONTENT_E_BOOK_TYPE.AUDIENCES.YOUNG_ADULT]: 'Young Adult',
    [CONTENT_E_BOOK_TYPE.AUDIENCES.ADULT]: 'Adult',
    [CONTENT_E_BOOK_TYPE.AUDIENCES.PROFESSIONAL]: 'Professional',
    [CONTENT_E_BOOK_TYPE.AUDIENCES.ACADEMIC]: 'Academic',
    [CONTENT_E_BOOK_TYPE.AUDIENCES.CUSTOM]: 'Custom Audience',
  };
  return labels[audience] || 'Unknown Audience';
}

export function contentEBookTypeGetComplexityLabel(complexity: ContentEBookTypeComplexity): string {
  const labels: Record<ContentEBookTypeComplexity, string> = {
    [CONTENT_E_BOOK_TYPE.COMPLEXITY.BASIC]: 'Basic',
    [CONTENT_E_BOOK_TYPE.COMPLEXITY.INTERMEDIATE]: 'Intermediate',
    [CONTENT_E_BOOK_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [CONTENT_E_BOOK_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function contentEBookTypeGetQualityLabel(quality: ContentEBookTypeQuality): string {
  const labels: Record<ContentEBookTypeQuality, string> = {
    [CONTENT_E_BOOK_TYPE.QUALITY.STANDARD]: 'Standard',
    [CONTENT_E_BOOK_TYPE.QUALITY.PREMIUM]: 'Premium',
    [CONTENT_E_BOOK_TYPE.QUALITY.FEATURED]: 'Featured',
    [CONTENT_E_BOOK_TYPE.QUALITY.BESTSELLER]: 'Bestseller',
    [CONTENT_E_BOOK_TYPE.QUALITY.AWARD_WINNING]: 'Award-Winning',
    [CONTENT_E_BOOK_TYPE.QUALITY.CUSTOM]: 'Custom Quality',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentEBookTypeGetRightsLabel(rights: ContentEBookTypeRights): string {
  const labels: Record<ContentEBookTypeRights, string> = {
    [CONTENT_E_BOOK_TYPE.RIGHTS.ALL_RIGHTS_RESERVED]: 'All Rights Reserved',
    [CONTENT_E_BOOK_TYPE.RIGHTS.CC_BY]: 'CC BY',
    [CONTENT_E_BOOK_TYPE.RIGHTS.CC_BY_SA]: 'CC BY-SA',
    [CONTENT_E_BOOK_TYPE.RIGHTS.CC_BY_ND]: 'CC BY-ND',
    [CONTENT_E_BOOK_TYPE.RIGHTS.CC_BY_NC]: 'CC BY-NC',
    [CONTENT_E_BOOK_TYPE.RIGHTS.CC_BY_NC_SA]: 'CC BY-NC-SA',
    [CONTENT_E_BOOK_TYPE.RIGHTS.CC_BY_NC_ND]: 'CC BY-NC-ND',
    [CONTENT_E_BOOK_TYPE.RIGHTS.CC0]: 'CC0 (Public Domain)',
    [CONTENT_E_BOOK_TYPE.RIGHTS.PUBLIC_DOMAIN]: 'Public Domain',
    [CONTENT_E_BOOK_TYPE.RIGHTS.CUSTOM]: 'Custom Rights',
  };
  return labels[rights] || 'Unknown Rights';
}

export function contentEBookTypeIsValidCategory(
  category: string
): category is ContentEBookTypeCategory {
  return Object.values(CONTENT_E_BOOK_TYPE.CATEGORIES).includes(
    category as ContentEBookTypeCategory
  );
}

export function contentEBookTypeIsValidScope(scope: string): scope is ContentEBookTypeScope {
  return Object.values(CONTENT_E_BOOK_TYPE.SCOPES).includes(scope as ContentEBookTypeScope);
}

export function contentEBookTypeIsValidAudience(
  audience: string
): audience is ContentEBookTypeAudience {
  return Object.values(CONTENT_E_BOOK_TYPE.AUDIENCES).includes(
    audience as ContentEBookTypeAudience
  );
}
