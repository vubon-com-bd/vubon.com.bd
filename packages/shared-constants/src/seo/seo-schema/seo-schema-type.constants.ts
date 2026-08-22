/**
 * SEO Schema Type Constants
 * Types and classifications for schema markup
 */

export const SEO_SCHEMA_TYPE = {
  // Schema Categories
  CATEGORIES: {
    CREATIVE_WORK: 'creative_work',
    COMMERCE: 'commerce',
    ORGANIZATION: 'organization',
    PLACE: 'place',
    EVENT: 'event',
    PERSON: 'person',
    EDUCATION: 'education',
    HEALTH: 'health',
    FOOD: 'food',
    OTHER: 'other',
  } as const,

  // Schema Sub-types
  SUB_TYPES: {
    // Creative Work
    BLOG: 'blog',
    NEWS: 'news',
    REVIEW: 'review',
    BOOK: 'book',
    MOVIE: 'movie',
    MUSIC: 'music',
    VIDEO: 'video',
    IMAGE: 'image',

    // Commerce
    PHYSICAL: 'physical',
    DIGITAL: 'digital',
    SERVICE: 'service',
    BUNDLE: 'bundle',

    // Organization
    BUSINESS: 'business',
    NONPROFIT: 'nonprofit',
    GOVERNMENT: 'government',
    EDUCATIONAL: 'educational',

    // Place
    STORE: 'store',
    RESTAURANT: 'restaurant',
    HOTEL: 'hotel',
    VENUE: 'venue',
  } as const,

  // Schema Properties
  PROPERTIES: {
    // Common
    NAME: 'name',
    DESCRIPTION: 'description',
    URL: 'url',
    IMAGE: 'image',
    AUTHOR: 'author',
    DATE_PUBLISHED: 'datePublished',
    DATE_MODIFIED: 'dateModified',

    // Product
    SKU: 'sku',
    BRAND: 'brand',
    OFFERS: 'offers',
    REVIEWS: 'reviews',
    RATING: 'rating',

    // Organization
    ADDRESS: 'address',
    TELEPHONE: 'telephone',
    EMAIL: 'email',
    LOGO: 'logo',
    SOCIAL_MEDIA: 'sameAs',

    // Person
    JOB_TITLE: 'jobTitle',
    WORKS_FOR: 'worksFor',
    BIRTH_DATE: 'birthDate',
    DEATH_DATE: 'deathDate',

    // Event
    START_DATE: 'startDate',
    END_DATE: 'endDate',
    LOCATION: 'location',
    PERFORMER: 'performer',
    ORGANIZER: 'organizer',

    // Place
    GEO: 'geo',
    ADDRESS_REGION: 'addressRegion',
    POSTAL_CODE: 'postalCode',
    COUNTRY: 'addressCountry',
  } as const,

  // Schema Property Groups
  PROPERTY_GROUPS: {
    IDENTIFICATION: 'identification',
    DESCRIPTION: 'description',
    CONTEXT: 'context',
    RELATIONSHIP: 'relationship',
    MEDIA: 'media',
    LOCATION: 'location',
    TIME: 'time',
    COMMERCE: 'commerce',
    PERSONAL: 'personal',
  } as const,

  // Schema Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Schema Purpose
  PURPOSE: {
    SEO: 'seo',
    RICH_SNIPPET: 'rich_snippet',
    KNOWLEDGE_GRAPH: 'knowledge_graph',
    SOCIAL: 'social',
    EMAIL: 'email',
    APP: 'app',
    AI: 'ai',
  } as const,
} as const;

// Schema Categories
export type SEOSchemaTypeCategory =
  (typeof SEO_SCHEMA_TYPE.CATEGORIES)[keyof typeof SEO_SCHEMA_TYPE.CATEGORIES];

// Schema Sub-types
export type SEOSchemaTypeSubType =
  (typeof SEO_SCHEMA_TYPE.SUB_TYPES)[keyof typeof SEO_SCHEMA_TYPE.SUB_TYPES];

// Schema Properties
export type SEOSchemaTypeProperty =
  (typeof SEO_SCHEMA_TYPE.PROPERTIES)[keyof typeof SEO_SCHEMA_TYPE.PROPERTIES];

// Schema Property Groups
export type SEOSchemaTypePropertyGroup =
  (typeof SEO_SCHEMA_TYPE.PROPERTY_GROUPS)[keyof typeof SEO_SCHEMA_TYPE.PROPERTY_GROUPS];

// Schema Complexity
export type SEOSchemaTypeComplexity =
  (typeof SEO_SCHEMA_TYPE.COMPLEXITY)[keyof typeof SEO_SCHEMA_TYPE.COMPLEXITY];

// Schema Purpose
export type SEOSchemaTypePurpose =
  (typeof SEO_SCHEMA_TYPE.PURPOSE)[keyof typeof SEO_SCHEMA_TYPE.PURPOSE];

// Utility Functions
export function getSEOSchemaCategoryLabel(category: SEOSchemaTypeCategory): string {
  const labels: Record<SEOSchemaTypeCategory, string> = {
    [SEO_SCHEMA_TYPE.CATEGORIES.CREATIVE_WORK]: 'Creative Work',
    [SEO_SCHEMA_TYPE.CATEGORIES.COMMERCE]: 'Commerce',
    [SEO_SCHEMA_TYPE.CATEGORIES.ORGANIZATION]: 'Organization',
    [SEO_SCHEMA_TYPE.CATEGORIES.PLACE]: 'Place',
    [SEO_SCHEMA_TYPE.CATEGORIES.EVENT]: 'Event',
    [SEO_SCHEMA_TYPE.CATEGORIES.PERSON]: 'Person',
    [SEO_SCHEMA_TYPE.CATEGORIES.EDUCATION]: 'Education',
    [SEO_SCHEMA_TYPE.CATEGORIES.HEALTH]: 'Health',
    [SEO_SCHEMA_TYPE.CATEGORIES.FOOD]: 'Food',
    [SEO_SCHEMA_TYPE.CATEGORIES.OTHER]: 'Other',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOSchemaSubTypeLabel(subType: SEOSchemaTypeSubType): string {
  const labels: Record<SEOSchemaTypeSubType, string> = {
    // Creative Work
    [SEO_SCHEMA_TYPE.SUB_TYPES.BLOG]: 'Blog Post',
    [SEO_SCHEMA_TYPE.SUB_TYPES.NEWS]: 'News Article',
    [SEO_SCHEMA_TYPE.SUB_TYPES.REVIEW]: 'Review',
    [SEO_SCHEMA_TYPE.SUB_TYPES.BOOK]: 'Book',
    [SEO_SCHEMA_TYPE.SUB_TYPES.MOVIE]: 'Movie',
    [SEO_SCHEMA_TYPE.SUB_TYPES.MUSIC]: 'Music Recording',
    [SEO_SCHEMA_TYPE.SUB_TYPES.VIDEO]: 'Video',
    [SEO_SCHEMA_TYPE.SUB_TYPES.IMAGE]: 'Image',

    // Commerce
    [SEO_SCHEMA_TYPE.SUB_TYPES.PHYSICAL]: 'Physical Product',
    [SEO_SCHEMA_TYPE.SUB_TYPES.DIGITAL]: 'Digital Product',
    [SEO_SCHEMA_TYPE.SUB_TYPES.SERVICE]: 'Service',
    [SEO_SCHEMA_TYPE.SUB_TYPES.BUNDLE]: 'Product Bundle',

    // Organization
    [SEO_SCHEMA_TYPE.SUB_TYPES.BUSINESS]: 'Business',
    [SEO_SCHEMA_TYPE.SUB_TYPES.NONPROFIT]: 'Nonprofit',
    [SEO_SCHEMA_TYPE.SUB_TYPES.GOVERNMENT]: 'Government',
    [SEO_SCHEMA_TYPE.SUB_TYPES.EDUCATIONAL]: 'Educational Organization',

    // Place
    [SEO_SCHEMA_TYPE.SUB_TYPES.STORE]: 'Store',
    [SEO_SCHEMA_TYPE.SUB_TYPES.RESTAURANT]: 'Restaurant',
    [SEO_SCHEMA_TYPE.SUB_TYPES.HOTEL]: 'Hotel',
    [SEO_SCHEMA_TYPE.SUB_TYPES.VENUE]: 'Venue',
  };
  return labels[subType] || 'Unknown Sub-type';
}

export function getSEOSchemaPropertyLabel(property: SEOSchemaTypeProperty): string {
  const labels: Record<SEOSchemaTypeProperty, string> = {
    // Common
    [SEO_SCHEMA_TYPE.PROPERTIES.NAME]: 'Name',
    [SEO_SCHEMA_TYPE.PROPERTIES.DESCRIPTION]: 'Description',
    [SEO_SCHEMA_TYPE.PROPERTIES.URL]: 'URL',
    [SEO_SCHEMA_TYPE.PROPERTIES.IMAGE]: 'Image',
    [SEO_SCHEMA_TYPE.PROPERTIES.AUTHOR]: 'Author',
    [SEO_SCHEMA_TYPE.PROPERTIES.DATE_PUBLISHED]: 'Date Published',
    [SEO_SCHEMA_TYPE.PROPERTIES.DATE_MODIFIED]: 'Date Modified',

    // Product
    [SEO_SCHEMA_TYPE.PROPERTIES.SKU]: 'SKU',
    [SEO_SCHEMA_TYPE.PROPERTIES.BRAND]: 'Brand',
    [SEO_SCHEMA_TYPE.PROPERTIES.OFFERS]: 'Offers',
    [SEO_SCHEMA_TYPE.PROPERTIES.REVIEWS]: 'Reviews',
    [SEO_SCHEMA_TYPE.PROPERTIES.RATING]: 'Rating',

    // Organization
    [SEO_SCHEMA_TYPE.PROPERTIES.ADDRESS]: 'Address',
    [SEO_SCHEMA_TYPE.PROPERTIES.TELEPHONE]: 'Telephone',
    [SEO_SCHEMA_TYPE.PROPERTIES.EMAIL]: 'Email',
    [SEO_SCHEMA_TYPE.PROPERTIES.LOGO]: 'Logo',
    [SEO_SCHEMA_TYPE.PROPERTIES.SOCIAL_MEDIA]: 'Social Media Links',

    // Person
    [SEO_SCHEMA_TYPE.PROPERTIES.JOB_TITLE]: 'Job Title',
    [SEO_SCHEMA_TYPE.PROPERTIES.WORKS_FOR]: 'Works For',
    [SEO_SCHEMA_TYPE.PROPERTIES.BIRTH_DATE]: 'Birth Date',
    [SEO_SCHEMA_TYPE.PROPERTIES.DEATH_DATE]: 'Death Date',

    // Event
    [SEO_SCHEMA_TYPE.PROPERTIES.START_DATE]: 'Start Date',
    [SEO_SCHEMA_TYPE.PROPERTIES.END_DATE]: 'End Date',
    [SEO_SCHEMA_TYPE.PROPERTIES.LOCATION]: 'Location',
    [SEO_SCHEMA_TYPE.PROPERTIES.PERFORMER]: 'Performer',
    [SEO_SCHEMA_TYPE.PROPERTIES.ORGANIZER]: 'Organizer',

    // Place
    [SEO_SCHEMA_TYPE.PROPERTIES.GEO]: 'Geo Location',
    [SEO_SCHEMA_TYPE.PROPERTIES.ADDRESS_REGION]: 'Address Region',
    [SEO_SCHEMA_TYPE.PROPERTIES.POSTAL_CODE]: 'Postal Code',
    [SEO_SCHEMA_TYPE.PROPERTIES.COUNTRY]: 'Country',
  };
  return labels[property] || 'Unknown Property';
}

export function getSEOSchemaPropertyGroupLabel(group: SEOSchemaTypePropertyGroup): string {
  const labels: Record<SEOSchemaTypePropertyGroup, string> = {
    [SEO_SCHEMA_TYPE.PROPERTY_GROUPS.IDENTIFICATION]: 'Identification',
    [SEO_SCHEMA_TYPE.PROPERTY_GROUPS.DESCRIPTION]: 'Description',
    [SEO_SCHEMA_TYPE.PROPERTY_GROUPS.CONTEXT]: 'Context',
    [SEO_SCHEMA_TYPE.PROPERTY_GROUPS.RELATIONSHIP]: 'Relationship',
    [SEO_SCHEMA_TYPE.PROPERTY_GROUPS.MEDIA]: 'Media',
    [SEO_SCHEMA_TYPE.PROPERTY_GROUPS.LOCATION]: 'Location',
    [SEO_SCHEMA_TYPE.PROPERTY_GROUPS.TIME]: 'Time',
    [SEO_SCHEMA_TYPE.PROPERTY_GROUPS.COMMERCE]: 'Commerce',
    [SEO_SCHEMA_TYPE.PROPERTY_GROUPS.PERSONAL]: 'Personal',
  };
  return labels[group] || 'Unknown Property Group';
}

export function getSEOSchemaComplexityLabel(complexity: SEOSchemaTypeComplexity): string {
  const labels: Record<SEOSchemaTypeComplexity, string> = {
    [SEO_SCHEMA_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [SEO_SCHEMA_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [SEO_SCHEMA_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [SEO_SCHEMA_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function getSEOSchemaPurposeLabel(purpose: SEOSchemaTypePurpose): string {
  const labels: Record<SEOSchemaTypePurpose, string> = {
    [SEO_SCHEMA_TYPE.PURPOSE.SEO]: 'SEO',
    [SEO_SCHEMA_TYPE.PURPOSE.RICH_SNIPPET]: 'Rich Snippet',
    [SEO_SCHEMA_TYPE.PURPOSE.KNOWLEDGE_GRAPH]: 'Knowledge Graph',
    [SEO_SCHEMA_TYPE.PURPOSE.SOCIAL]: 'Social Media',
    [SEO_SCHEMA_TYPE.PURPOSE.EMAIL]: 'Email',
    [SEO_SCHEMA_TYPE.PURPOSE.APP]: 'Mobile App',
    [SEO_SCHEMA_TYPE.PURPOSE.AI]: 'AI & Assistant',
  };
  return labels[purpose] || 'Unknown Purpose';
}
