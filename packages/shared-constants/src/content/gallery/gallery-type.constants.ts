/**
 * Gallery Type Constants
 * Types and classifications of galleries
 */

export const CONTENT_GALLERY_TYPE = {
  // Gallery Categories
  CATEGORIES: {
    PHOTOGRAPHY: 'photography',
    ART: 'art',
    DESIGN: 'design',
    FASHION: 'fashion',
    PRODUCT: 'product',
    ARCHITECTURE: 'architecture',
    NATURE: 'nature',
    TRAVEL: 'travel',
    FOOD: 'food',
    EVENT: 'event',
    PORTFOLIO: 'portfolio',
    COLLECTION: 'collection',
    CUSTOM: 'custom',
  } as const,

  // Gallery Purposes
  PURPOSES: {
    SHOWCASE: 'showcase',
    PORTFOLIO: 'portfolio',
    CATALOG: 'catalog',
    COLLECTION: 'collection',
    EXHIBITION: 'exhibition',
    STORYTELLING: 'storytelling',
    MARKETING: 'marketing',
    EDUCATIONAL: 'educational',
    CUSTOM: 'custom',
  } as const,

  // Gallery Audiences
  AUDIENCES: {
    PUBLIC: 'public',
    CLIENTS: 'clients',
    TEAM: 'team',
    PARTNERS: 'partners',
    SUBSCRIBERS: 'subscribers',
    PREMIUM: 'premium',
    CUSTOM: 'custom',
  } as const,

  // Gallery Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    PREMIUM: 'premium',
  } as const,

  // Gallery Interaction
  INTERACTION: {
    STATIC: 'static',
    INTERACTIVE: 'interactive',
    VIRTUAL: 'virtual',
    TOUR: 'tour',
    CUSTOM: 'custom',
  } as const,

  // Gallery Quality
  QUALITY: {
    STANDARD: 'standard',
    HD: 'hd',
    FHD: 'fhd',
    QHD: 'qhd',
    UHD: 'uhd',
    ORIGINAL: 'original',
  } as const,
} as const;

// Gallery Categories
export type ContentGalleryTypeCategory =
  (typeof CONTENT_GALLERY_TYPE.CATEGORIES)[keyof typeof CONTENT_GALLERY_TYPE.CATEGORIES];

// Gallery Purposes
export type ContentGalleryTypePurpose =
  (typeof CONTENT_GALLERY_TYPE.PURPOSES)[keyof typeof CONTENT_GALLERY_TYPE.PURPOSES];

// Gallery Audiences
export type ContentGalleryTypeAudience =
  (typeof CONTENT_GALLERY_TYPE.AUDIENCES)[keyof typeof CONTENT_GALLERY_TYPE.AUDIENCES];

// Gallery Complexity
export type ContentGalleryTypeComplexity =
  (typeof CONTENT_GALLERY_TYPE.COMPLEXITY)[keyof typeof CONTENT_GALLERY_TYPE.COMPLEXITY];

// Gallery Interaction
export type ContentGalleryTypeInteraction =
  (typeof CONTENT_GALLERY_TYPE.INTERACTION)[keyof typeof CONTENT_GALLERY_TYPE.INTERACTION];

// Gallery Quality
export type ContentGalleryTypeQuality =
  (typeof CONTENT_GALLERY_TYPE.QUALITY)[keyof typeof CONTENT_GALLERY_TYPE.QUALITY];

// Utility Functions
export function contentGalleryTypeGetCategoryLabel(category: ContentGalleryTypeCategory): string {
  const labels: Record<ContentGalleryTypeCategory, string> = {
    [CONTENT_GALLERY_TYPE.CATEGORIES.PHOTOGRAPHY]: 'Photography',
    [CONTENT_GALLERY_TYPE.CATEGORIES.ART]: 'Art',
    [CONTENT_GALLERY_TYPE.CATEGORIES.DESIGN]: 'Design',
    [CONTENT_GALLERY_TYPE.CATEGORIES.FASHION]: 'Fashion',
    [CONTENT_GALLERY_TYPE.CATEGORIES.PRODUCT]: 'Product',
    [CONTENT_GALLERY_TYPE.CATEGORIES.ARCHITECTURE]: 'Architecture',
    [CONTENT_GALLERY_TYPE.CATEGORIES.NATURE]: 'Nature',
    [CONTENT_GALLERY_TYPE.CATEGORIES.TRAVEL]: 'Travel',
    [CONTENT_GALLERY_TYPE.CATEGORIES.FOOD]: 'Food',
    [CONTENT_GALLERY_TYPE.CATEGORIES.EVENT]: 'Event',
    [CONTENT_GALLERY_TYPE.CATEGORIES.PORTFOLIO]: 'Portfolio',
    [CONTENT_GALLERY_TYPE.CATEGORIES.COLLECTION]: 'Collection',
    [CONTENT_GALLERY_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function contentGalleryTypeGetPurposeLabel(purpose: ContentGalleryTypePurpose): string {
  const labels: Record<ContentGalleryTypePurpose, string> = {
    [CONTENT_GALLERY_TYPE.PURPOSES.SHOWCASE]: 'Showcase',
    [CONTENT_GALLERY_TYPE.PURPOSES.PORTFOLIO]: 'Portfolio',
    [CONTENT_GALLERY_TYPE.PURPOSES.CATALOG]: 'Catalog',
    [CONTENT_GALLERY_TYPE.PURPOSES.COLLECTION]: 'Collection',
    [CONTENT_GALLERY_TYPE.PURPOSES.EXHIBITION]: 'Exhibition',
    [CONTENT_GALLERY_TYPE.PURPOSES.STORYTELLING]: 'Storytelling',
    [CONTENT_GALLERY_TYPE.PURPOSES.MARKETING]: 'Marketing',
    [CONTENT_GALLERY_TYPE.PURPOSES.EDUCATIONAL]: 'Educational',
    [CONTENT_GALLERY_TYPE.PURPOSES.CUSTOM]: 'Custom',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function contentGalleryTypeGetAudienceLabel(audience: ContentGalleryTypeAudience): string {
  const labels: Record<ContentGalleryTypeAudience, string> = {
    [CONTENT_GALLERY_TYPE.AUDIENCES.PUBLIC]: 'Public',
    [CONTENT_GALLERY_TYPE.AUDIENCES.CLIENTS]: 'Clients',
    [CONTENT_GALLERY_TYPE.AUDIENCES.TEAM]: 'Team',
    [CONTENT_GALLERY_TYPE.AUDIENCES.PARTNERS]: 'Partners',
    [CONTENT_GALLERY_TYPE.AUDIENCES.SUBSCRIBERS]: 'Subscribers',
    [CONTENT_GALLERY_TYPE.AUDIENCES.PREMIUM]: 'Premium',
    [CONTENT_GALLERY_TYPE.AUDIENCES.CUSTOM]: 'Custom',
  };
  return labels[audience] || 'Unknown Audience';
}

export function contentGalleryTypeGetComplexityLabel(
  complexity: ContentGalleryTypeComplexity
): string {
  const labels: Record<ContentGalleryTypeComplexity, string> = {
    [CONTENT_GALLERY_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [CONTENT_GALLERY_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [CONTENT_GALLERY_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [CONTENT_GALLERY_TYPE.COMPLEXITY.PREMIUM]: 'Premium',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function contentGalleryTypeGetInteractionLabel(
  interaction: ContentGalleryTypeInteraction
): string {
  const labels: Record<ContentGalleryTypeInteraction, string> = {
    [CONTENT_GALLERY_TYPE.INTERACTION.STATIC]: 'Static',
    [CONTENT_GALLERY_TYPE.INTERACTION.INTERACTIVE]: 'Interactive',
    [CONTENT_GALLERY_TYPE.INTERACTION.VIRTUAL]: 'Virtual',
    [CONTENT_GALLERY_TYPE.INTERACTION.TOUR]: 'Tour',
    [CONTENT_GALLERY_TYPE.INTERACTION.CUSTOM]: 'Custom',
  };
  return labels[interaction] || 'Unknown Interaction';
}

export function contentGalleryTypeGetQualityLabel(quality: ContentGalleryTypeQuality): string {
  const labels: Record<ContentGalleryTypeQuality, string> = {
    [CONTENT_GALLERY_TYPE.QUALITY.STANDARD]: 'Standard',
    [CONTENT_GALLERY_TYPE.QUALITY.HD]: 'HD',
    [CONTENT_GALLERY_TYPE.QUALITY.FHD]: 'Full HD',
    [CONTENT_GALLERY_TYPE.QUALITY.QHD]: 'QHD',
    [CONTENT_GALLERY_TYPE.QUALITY.UHD]: 'UHD',
    [CONTENT_GALLERY_TYPE.QUALITY.ORIGINAL]: 'Original',
  };
  return labels[quality] || 'Unknown Quality';
}

export function contentGalleryTypeIsValidCategory(
  category: string
): category is ContentGalleryTypeCategory {
  return Object.values(CONTENT_GALLERY_TYPE.CATEGORIES).includes(
    category as ContentGalleryTypeCategory
  );
}

export function contentGalleryTypeIsValidPurpose(
  purpose: string
): purpose is ContentGalleryTypePurpose {
  return Object.values(CONTENT_GALLERY_TYPE.PURPOSES).includes(
    purpose as ContentGalleryTypePurpose
  );
}
