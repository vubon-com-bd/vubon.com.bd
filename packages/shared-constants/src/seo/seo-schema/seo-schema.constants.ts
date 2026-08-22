/**
 * SEO Schema Constants
 * Configuration for schema markup, structured data, and rich snippets
 */

export const SEO_SCHEMA = {
  // Schema Types
  TYPES: {
    // Creative Works
    ARTICLE: 'Article',
    BLOG_POST: 'BlogPosting',
    NEWS_ARTICLE: 'NewsArticle',
    REVIEW: 'Review',
    BOOK: 'Book',
    MOVIE: 'Movie',
    MUSIC: 'MusicRecording',
    VIDEO: 'VideoObject',
    AUDIO: 'AudioObject',
    IMAGE: 'ImageObject',

    // Commerce
    PRODUCT: 'Product',
    OFFER: 'Offer',
    AGGREGATE_OFFER: 'AggregateOffer',
    PRICE_SPECIFICATION: 'PriceSpecification',
    DEMAND: 'Demand',

    // Organizations
    ORGANIZATION: 'Organization',
    LOCAL_BUSINESS: 'LocalBusiness',
    CORPORATION: 'Corporation',
    NONPROFIT: 'Nonprofit',
    GOVERNMENT: 'GovernmentOrganization',

    // Places
    PLACE: 'Place',
    STORE: 'Store',
    RESTAURANT: 'Restaurant',
    HOTEL: 'Hotel',
    EVENT_VENUE: 'EventVenue',

    // Events
    EVENT: 'Event',
    BUSINESS_EVENT: 'BusinessEvent',
    SOCIAL_EVENT: 'SocialEvent',
    SPORTS_EVENT: 'SportsEvent',
    CONCERT: 'Concert',
    FESTIVAL: 'Festival',

    // People
    PERSON: 'Person',
    AUTHOR: 'Author',
    ARTIST: 'Artist',
    MUSICIAN: 'Musician',
    ACTOR: 'Actor',

    // Educational
    COURSE: 'Course',
    EDUCATIONAL_ORGANIZATION: 'EducationalOrganization',
    SCHOOL: 'School',
    COLLEGE: 'CollegeOrUniversity',

    // Health
    MEDICAL: 'MedicalEntity',
    HOSPITAL: 'Hospital',
    DOCTOR: 'Doctor',
    PHARMACY: 'Pharmacy',

    // Food
    RECIPE: 'Recipe',
    NUTRITION: 'NutritionInformation',

    // Other
    FAQ: 'FAQPage',
    HOW_TO: 'HowTo',
    Q_A: 'QAPage',
    BREADCRUMB: 'BreadcrumbList',
    SITE_NAVIGATION: 'SiteNavigationElement',
    SEARCH_ACTION: 'SearchAction',
    INTERACTIVE: 'InteractiveContent',
    SOFTWARE: 'SoftwareApplication',
    SERVICE: 'Service',
    JOB_POSTING: 'JobPosting',
    EMPLOYMENT: 'EmploymentAgency',
    REAL_ESTATE: 'RealEstateListing',
    CAR: 'Car',
    VEHICLE: 'Vehicle',
  } as const,

  // Schema Status
  STATUS: {
    PENDING: 'pending',
    DRAFT: 'draft',
    GENERATED: 'generated',
    VALID: 'valid',
    INVALID: 'invalid',
    PARTIAL: 'partial',
    PUBLISHED: 'published',
    UPDATING: 'updating',
    OUTDATED: 'outdated',
    ERROR: 'error',
    ARCHIVED: 'archived',
  } as const,

  // Schema Validation
  VALIDATION: {
    VALID: 'valid',
    INVALID: 'invalid',
    PARTIAL: 'partial',
    WARNING: 'warning',
    ERROR: 'error',
  } as const,

  // Schema Formats
  FORMATS: {
    JSON_LD: 'json_ld',
    MICRODATA: 'microdata',
    RDFA: 'rdfa',
    RDF_XML: 'rdf_xml',
  } as const,

  // Schema Contexts
  CONTEXTS: {
    SCHEMA_ORG: 'https://schema.org',
    DUBLIN_CORE: 'http://purl.org/dc/elements/1.1/',
    FOAF: 'http://xmlns.com/foaf/0.1/',
    OG: 'http://ogp.me/ns#',
    TWITTER: 'https://twitter.com/schema',
  } as const,

  // Schema Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    OPTIONAL: 'optional',
  } as const,

  // Schema Errors
  ERROR_TYPES: {
    MISSING_REQUIRED: 'missing_required',
    INVALID_TYPE: 'invalid_type',
    INVALID_PROPERTY: 'invalid_property',
    INVALID_VALUE: 'invalid_value',
    MISSING_PROPERTY: 'missing_property',
    DUPLICATE_PROPERTY: 'duplicate_property',
    FORMAT_ERROR: 'format_error',
    SYNTAX_ERROR: 'syntax_error',
    CONTEXT_ERROR: 'context_error',
    MAX_SIZE: 'max_size',
  } as const,

  // Schema Metrics
  METRICS: {
    TOTAL_TYPES: 'total_types',
    VALID_PROPERTIES: 'valid_properties',
    INVALID_PROPERTIES: 'invalid_properties',
    WARNINGS: 'warnings',
    ERRORS: 'errors',
    VALIDITY_SCORE: 'validity_score',
    COMPLETENESS_SCORE: 'completeness_score',
  } as const,

  // Schema Tools
  TOOLS: {
    GOOGLE_STRUCTURED_DATA: 'google_structured_data',
    RICH_RESULTS_TEST: 'rich_results_test',
    SCHEMA_VALIDATOR: 'schema_validator',
    JSON_LD_GENERATOR: 'json_ld_generator',
    SCHEMA_ORG: 'schema_org',
    YOAST: 'yoast',
    RANK_MATH: 'rank_math',
  } as const,
} as const;

// Schema Types
export type SEOSchemaType = (typeof SEO_SCHEMA.TYPES)[keyof typeof SEO_SCHEMA.TYPES];

// Schema Status
export type SEOSchemaStatus = (typeof SEO_SCHEMA.STATUS)[keyof typeof SEO_SCHEMA.STATUS];

// Schema Validation
export type SEOSchemaValidation =
  (typeof SEO_SCHEMA.VALIDATION)[keyof typeof SEO_SCHEMA.VALIDATION];

// Schema Formats
export type SEOSchemaFormat = (typeof SEO_SCHEMA.FORMATS)[keyof typeof SEO_SCHEMA.FORMATS];

// Schema Contexts
export type SEOSchemaContext = (typeof SEO_SCHEMA.CONTEXTS)[keyof typeof SEO_SCHEMA.CONTEXTS];

// Schema Priorities
export type SEOSchemaPriority = (typeof SEO_SCHEMA.PRIORITIES)[keyof typeof SEO_SCHEMA.PRIORITIES];

// Schema Errors
export type SEOSchemaErrorType =
  (typeof SEO_SCHEMA.ERROR_TYPES)[keyof typeof SEO_SCHEMA.ERROR_TYPES];

// Schema Metrics
export type SEOSchemaMetric = (typeof SEO_SCHEMA.METRICS)[keyof typeof SEO_SCHEMA.METRICS];

// Schema Tools
export type SEOSchemaTool = (typeof SEO_SCHEMA.TOOLS)[keyof typeof SEO_SCHEMA.TOOLS];

// Utility Functions
export function getSEOSchemaTypeLabel(type: SEOSchemaType): string {
  const labels: Record<SEOSchemaType, string> = {
    // Creative Works
    [SEO_SCHEMA.TYPES.ARTICLE]: 'Article',
    [SEO_SCHEMA.TYPES.BLOG_POST]: 'Blog Post',
    [SEO_SCHEMA.TYPES.NEWS_ARTICLE]: 'News Article',
    [SEO_SCHEMA.TYPES.REVIEW]: 'Review',
    [SEO_SCHEMA.TYPES.BOOK]: 'Book',
    [SEO_SCHEMA.TYPES.MOVIE]: 'Movie',
    [SEO_SCHEMA.TYPES.MUSIC]: 'Music Recording',
    [SEO_SCHEMA.TYPES.VIDEO]: 'Video Object',
    [SEO_SCHEMA.TYPES.AUDIO]: 'Audio Object',
    [SEO_SCHEMA.TYPES.IMAGE]: 'Image Object',

    // Commerce
    [SEO_SCHEMA.TYPES.PRODUCT]: 'Product',
    [SEO_SCHEMA.TYPES.OFFER]: 'Offer',
    [SEO_SCHEMA.TYPES.AGGREGATE_OFFER]: 'Aggregate Offer',
    [SEO_SCHEMA.TYPES.PRICE_SPECIFICATION]: 'Price Specification',
    [SEO_SCHEMA.TYPES.DEMAND]: 'Demand',

    // Organizations
    [SEO_SCHEMA.TYPES.ORGANIZATION]: 'Organization',
    [SEO_SCHEMA.TYPES.LOCAL_BUSINESS]: 'Local Business',
    [SEO_SCHEMA.TYPES.CORPORATION]: 'Corporation',
    [SEO_SCHEMA.TYPES.NONPROFIT]: 'Nonprofit',
    [SEO_SCHEMA.TYPES.GOVERNMENT]: 'Government Organization',

    // Places
    [SEO_SCHEMA.TYPES.PLACE]: 'Place',
    [SEO_SCHEMA.TYPES.STORE]: 'Store',
    [SEO_SCHEMA.TYPES.RESTAURANT]: 'Restaurant',
    [SEO_SCHEMA.TYPES.HOTEL]: 'Hotel',
    [SEO_SCHEMA.TYPES.EVENT_VENUE]: 'Event Venue',

    // Events
    [SEO_SCHEMA.TYPES.EVENT]: 'Event',
    [SEO_SCHEMA.TYPES.BUSINESS_EVENT]: 'Business Event',
    [SEO_SCHEMA.TYPES.SOCIAL_EVENT]: 'Social Event',
    [SEO_SCHEMA.TYPES.SPORTS_EVENT]: 'Sports Event',
    [SEO_SCHEMA.TYPES.CONCERT]: 'Concert',
    [SEO_SCHEMA.TYPES.FESTIVAL]: 'Festival',

    // People
    [SEO_SCHEMA.TYPES.PERSON]: 'Person',
    [SEO_SCHEMA.TYPES.AUTHOR]: 'Author',
    [SEO_SCHEMA.TYPES.ARTIST]: 'Artist',
    [SEO_SCHEMA.TYPES.MUSICIAN]: 'Musician',
    [SEO_SCHEMA.TYPES.ACTOR]: 'Actor',

    // Educational
    [SEO_SCHEMA.TYPES.COURSE]: 'Course',
    [SEO_SCHEMA.TYPES.EDUCATIONAL_ORGANIZATION]: 'Educational Organization',
    [SEO_SCHEMA.TYPES.SCHOOL]: 'School',
    [SEO_SCHEMA.TYPES.COLLEGE]: 'College or University',

    // Health
    [SEO_SCHEMA.TYPES.MEDICAL]: 'Medical Entity',
    [SEO_SCHEMA.TYPES.HOSPITAL]: 'Hospital',
    [SEO_SCHEMA.TYPES.DOCTOR]: 'Doctor',
    [SEO_SCHEMA.TYPES.PHARMACY]: 'Pharmacy',

    // Food
    [SEO_SCHEMA.TYPES.RECIPE]: 'Recipe',
    [SEO_SCHEMA.TYPES.NUTRITION]: 'Nutrition Information',

    // Other
    [SEO_SCHEMA.TYPES.FAQ]: 'FAQ Page',
    [SEO_SCHEMA.TYPES.HOW_TO]: 'How-To',
    [SEO_SCHEMA.TYPES.Q_A]: 'Q&A Page',
    [SEO_SCHEMA.TYPES.BREADCRUMB]: 'Breadcrumb List',
    [SEO_SCHEMA.TYPES.SITE_NAVIGATION]: 'Site Navigation',
    [SEO_SCHEMA.TYPES.SEARCH_ACTION]: 'Search Action',
    [SEO_SCHEMA.TYPES.INTERACTIVE]: 'Interactive Content',
    [SEO_SCHEMA.TYPES.SOFTWARE]: 'Software Application',
    [SEO_SCHEMA.TYPES.SERVICE]: 'Service',
    [SEO_SCHEMA.TYPES.JOB_POSTING]: 'Job Posting',
    [SEO_SCHEMA.TYPES.EMPLOYMENT]: 'Employment Agency',
    [SEO_SCHEMA.TYPES.REAL_ESTATE]: 'Real Estate Listing',
    [SEO_SCHEMA.TYPES.CAR]: 'Car',
    [SEO_SCHEMA.TYPES.VEHICLE]: 'Vehicle',
  };
  return labels[type] || 'Unknown Schema Type';
}

export function getSEOSchemaStatusLabel(status: SEOSchemaStatus): string {
  const labels: Record<SEOSchemaStatus, string> = {
    [SEO_SCHEMA.STATUS.PENDING]: 'Pending',
    [SEO_SCHEMA.STATUS.DRAFT]: 'Draft',
    [SEO_SCHEMA.STATUS.GENERATED]: 'Generated',
    [SEO_SCHEMA.STATUS.VALID]: 'Valid',
    [SEO_SCHEMA.STATUS.INVALID]: 'Invalid',
    [SEO_SCHEMA.STATUS.PARTIAL]: 'Partial',
    [SEO_SCHEMA.STATUS.PUBLISHED]: 'Published',
    [SEO_SCHEMA.STATUS.UPDATING]: 'Updating',
    [SEO_SCHEMA.STATUS.OUTDATED]: 'Outdated',
    [SEO_SCHEMA.STATUS.ERROR]: 'Error',
    [SEO_SCHEMA.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOSchemaValidationLabel(validation: SEOSchemaValidation): string {
  const labels: Record<SEOSchemaValidation, string> = {
    [SEO_SCHEMA.VALIDATION.VALID]: 'Valid',
    [SEO_SCHEMA.VALIDATION.INVALID]: 'Invalid',
    [SEO_SCHEMA.VALIDATION.PARTIAL]: 'Partially Valid',
    [SEO_SCHEMA.VALIDATION.WARNING]: 'Warning',
    [SEO_SCHEMA.VALIDATION.ERROR]: 'Error',
  };
  return labels[validation] || 'Unknown Validation';
}

export function getSEOSchemaFormatLabel(format: SEOSchemaFormat): string {
  const labels: Record<SEOSchemaFormat, string> = {
    [SEO_SCHEMA.FORMATS.JSON_LD]: 'JSON-LD',
    [SEO_SCHEMA.FORMATS.MICRODATA]: 'Microdata',
    [SEO_SCHEMA.FORMATS.RDFA]: 'RDFa',
    [SEO_SCHEMA.FORMATS.RDF_XML]: 'RDF/XML',
  };
  return labels[format] || 'Unknown Format';
}

export function getSEOSchemaPriorityLabel(priority: SEOSchemaPriority): string {
  const labels: Record<SEOSchemaPriority, string> = {
    [SEO_SCHEMA.PRIORITIES.CRITICAL]: 'Critical',
    [SEO_SCHEMA.PRIORITIES.HIGH]: 'High',
    [SEO_SCHEMA.PRIORITIES.MEDIUM]: 'Medium',
    [SEO_SCHEMA.PRIORITIES.LOW]: 'Low',
    [SEO_SCHEMA.PRIORITIES.OPTIONAL]: 'Optional',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getSEOSchemaErrorLabel(errorType: SEOSchemaErrorType): string {
  const labels: Record<SEOSchemaErrorType, string> = {
    [SEO_SCHEMA.ERROR_TYPES.MISSING_REQUIRED]: 'Missing Required Property',
    [SEO_SCHEMA.ERROR_TYPES.INVALID_TYPE]: 'Invalid Type',
    [SEO_SCHEMA.ERROR_TYPES.INVALID_PROPERTY]: 'Invalid Property',
    [SEO_SCHEMA.ERROR_TYPES.INVALID_VALUE]: 'Invalid Value',
    [SEO_SCHEMA.ERROR_TYPES.MISSING_PROPERTY]: 'Missing Property',
    [SEO_SCHEMA.ERROR_TYPES.DUPLICATE_PROPERTY]: 'Duplicate Property',
    [SEO_SCHEMA.ERROR_TYPES.FORMAT_ERROR]: 'Format Error',
    [SEO_SCHEMA.ERROR_TYPES.SYNTAX_ERROR]: 'Syntax Error',
    [SEO_SCHEMA.ERROR_TYPES.CONTEXT_ERROR]: 'Context Error',
    [SEO_SCHEMA.ERROR_TYPES.MAX_SIZE]: 'Maximum Size Exceeded',
  };
  return labels[errorType] || 'Unknown Error';
}

export function getSEOSchemaToolLabel(tool: SEOSchemaTool): string {
  const labels: Record<SEOSchemaTool, string> = {
    [SEO_SCHEMA.TOOLS.GOOGLE_STRUCTURED_DATA]: 'Google Structured Data',
    [SEO_SCHEMA.TOOLS.RICH_RESULTS_TEST]: 'Rich Results Test',
    [SEO_SCHEMA.TOOLS.SCHEMA_VALIDATOR]: 'Schema Validator',
    [SEO_SCHEMA.TOOLS.JSON_LD_GENERATOR]: 'JSON-LD Generator',
    [SEO_SCHEMA.TOOLS.SCHEMA_ORG]: 'Schema.org',
    [SEO_SCHEMA.TOOLS.YOAST]: 'Yoast SEO',
    [SEO_SCHEMA.TOOLS.RANK_MATH]: 'Rank Math',
  };
  return labels[tool] || 'Unknown Tool';
}

export function getSchemaStatusColor(status: SEOSchemaStatus): string {
  const colors: Record<SEOSchemaStatus, string> = {
    [SEO_SCHEMA.STATUS.PENDING]: '#9E9E9E',
    [SEO_SCHEMA.STATUS.DRAFT]: '#2196F3',
    [SEO_SCHEMA.STATUS.GENERATED]: '#00BCD4',
    [SEO_SCHEMA.STATUS.VALID]: '#4CAF50',
    [SEO_SCHEMA.STATUS.INVALID]: '#F44336',
    [SEO_SCHEMA.STATUS.PARTIAL]: '#FF9800',
    [SEO_SCHEMA.STATUS.PUBLISHED]: '#4CAF50',
    [SEO_SCHEMA.STATUS.UPDATING]: '#FFC107',
    [SEO_SCHEMA.STATUS.OUTDATED]: '#FF9800',
    [SEO_SCHEMA.STATUS.ERROR]: '#D32F2F',
    [SEO_SCHEMA.STATUS.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isSchemaValid(status: SEOSchemaStatus): boolean {
  const validStatuses: SEOSchemaStatus[] = [SEO_SCHEMA.STATUS.VALID, SEO_SCHEMA.STATUS.PUBLISHED];
  return validStatuses.includes(status);
}

export function isSchemaActive(status: SEOSchemaStatus): boolean {
  const activeStatuses: SEOSchemaStatus[] = [
    SEO_SCHEMA.STATUS.GENERATED,
    SEO_SCHEMA.STATUS.VALID,
    SEO_SCHEMA.STATUS.PUBLISHED,
    SEO_SCHEMA.STATUS.UPDATING,
  ];
  return activeStatuses.includes(status);
}

export function getSchemaCategory(type: SEOSchemaType): string {
  const categories: Record<SEOSchemaType, string> = {
    [SEO_SCHEMA.TYPES.ARTICLE]: 'Creative Work',
    [SEO_SCHEMA.TYPES.BLOG_POST]: 'Creative Work',
    [SEO_SCHEMA.TYPES.NEWS_ARTICLE]: 'Creative Work',
    [SEO_SCHEMA.TYPES.REVIEW]: 'Creative Work',
    [SEO_SCHEMA.TYPES.BOOK]: 'Creative Work',
    [SEO_SCHEMA.TYPES.MOVIE]: 'Creative Work',
    [SEO_SCHEMA.TYPES.MUSIC]: 'Creative Work',
    [SEO_SCHEMA.TYPES.VIDEO]: 'Creative Work',
    [SEO_SCHEMA.TYPES.AUDIO]: 'Creative Work',
    [SEO_SCHEMA.TYPES.IMAGE]: 'Creative Work',
    [SEO_SCHEMA.TYPES.PRODUCT]: 'Commerce',
    [SEO_SCHEMA.TYPES.OFFER]: 'Commerce',
    [SEO_SCHEMA.TYPES.AGGREGATE_OFFER]: 'Commerce',
    [SEO_SCHEMA.TYPES.PRICE_SPECIFICATION]: 'Commerce',
    [SEO_SCHEMA.TYPES.DEMAND]: 'Commerce',
    [SEO_SCHEMA.TYPES.ORGANIZATION]: 'Organization',
    [SEO_SCHEMA.TYPES.LOCAL_BUSINESS]: 'Organization',
    [SEO_SCHEMA.TYPES.CORPORATION]: 'Organization',
    [SEO_SCHEMA.TYPES.NONPROFIT]: 'Organization',
    [SEO_SCHEMA.TYPES.GOVERNMENT]: 'Organization',
    [SEO_SCHEMA.TYPES.PLACE]: 'Place',
    [SEO_SCHEMA.TYPES.STORE]: 'Place',
    [SEO_SCHEMA.TYPES.RESTAURANT]: 'Place',
    [SEO_SCHEMA.TYPES.HOTEL]: 'Place',
    [SEO_SCHEMA.TYPES.EVENT_VENUE]: 'Place',
    [SEO_SCHEMA.TYPES.EVENT]: 'Event',
    [SEO_SCHEMA.TYPES.BUSINESS_EVENT]: 'Event',
    [SEO_SCHEMA.TYPES.SOCIAL_EVENT]: 'Event',
    [SEO_SCHEMA.TYPES.SPORTS_EVENT]: 'Event',
    [SEO_SCHEMA.TYPES.CONCERT]: 'Event',
    [SEO_SCHEMA.TYPES.FESTIVAL]: 'Event',
    [SEO_SCHEMA.TYPES.PERSON]: 'Person',
    [SEO_SCHEMA.TYPES.AUTHOR]: 'Person',
    [SEO_SCHEMA.TYPES.ARTIST]: 'Person',
    [SEO_SCHEMA.TYPES.MUSICIAN]: 'Person',
    [SEO_SCHEMA.TYPES.ACTOR]: 'Person',
    [SEO_SCHEMA.TYPES.COURSE]: 'Education',
    [SEO_SCHEMA.TYPES.EDUCATIONAL_ORGANIZATION]: 'Education',
    [SEO_SCHEMA.TYPES.SCHOOL]: 'Education',
    [SEO_SCHEMA.TYPES.COLLEGE]: 'Education',
    [SEO_SCHEMA.TYPES.MEDICAL]: 'Health',
    [SEO_SCHEMA.TYPES.HOSPITAL]: 'Health',
    [SEO_SCHEMA.TYPES.DOCTOR]: 'Health',
    [SEO_SCHEMA.TYPES.PHARMACY]: 'Health',
    [SEO_SCHEMA.TYPES.RECIPE]: 'Food',
    [SEO_SCHEMA.TYPES.NUTRITION]: 'Food',
    [SEO_SCHEMA.TYPES.FAQ]: 'Other',
    [SEO_SCHEMA.TYPES.HOW_TO]: 'Other',
    [SEO_SCHEMA.TYPES.Q_A]: 'Other',
    [SEO_SCHEMA.TYPES.BREADCRUMB]: 'Other',
    [SEO_SCHEMA.TYPES.SITE_NAVIGATION]: 'Other',
    [SEO_SCHEMA.TYPES.SEARCH_ACTION]: 'Other',
    [SEO_SCHEMA.TYPES.INTERACTIVE]: 'Other',
    [SEO_SCHEMA.TYPES.SOFTWARE]: 'Other',
    [SEO_SCHEMA.TYPES.SERVICE]: 'Other',
    [SEO_SCHEMA.TYPES.JOB_POSTING]: 'Other',
    [SEO_SCHEMA.TYPES.EMPLOYMENT]: 'Other',
    [SEO_SCHEMA.TYPES.REAL_ESTATE]: 'Other',
    [SEO_SCHEMA.TYPES.CAR]: 'Other',
    [SEO_SCHEMA.TYPES.VEHICLE]: 'Other',
  };
  return categories[type] || 'Unknown';
}
