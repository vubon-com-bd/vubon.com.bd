/**
 * SEO Link Constants
 * Configuration for link management, analysis, and optimization
 */

export const SEO_LINK = {
  // Link Types
  TYPES: {
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    BACKLINK: 'backlink',
    INBOUND: 'inbound',
    OUTBOUND: 'outbound',
    DOFOLLOW: 'dofollow',
    NOFOLLOW: 'nofollow',
    SPONSORED: 'sponsored',
    UGC: 'ugc',
    CANONICAL: 'canonical',
    REL_ALTERNATE: 'rel_alternate',
    REL_NEXT: 'rel_next',
    REL_PREV: 'rel_prev',
    BOOKMARK: 'bookmark',
    AUTHOR: 'author',
    HELP: 'help',
    LICENSE: 'license',
    SEARCH: 'search',
    TAG: 'tag',
  } as const,

  // Link Status
  STATUS: {
    ACTIVE: 'active',
    BROKEN: 'broken',
    REDIRECTED: 'redirected',
    INACTIVE: 'inactive',
    REMOVED: 'removed',
    PENDING: 'pending',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    SUSPICIOUS: 'suspicious',
    PENALIZED: 'penalized',
    ARCHIVED: 'archived',
  } as const,

  // Link Attributes
  ATTRIBUTES: {
    REL: 'rel',
    HREFLANG: 'hreflang',
    MEDIA: 'media',
    TARGET: 'target',
    TYPE: 'type',
    TITLE: 'title',
    CLASS: 'class',
    ID: 'id',
    STYLE: 'style',
    DOWNLOAD: 'download',
    PING: 'ping',
    REFERRER_POLICY: 'referrer_policy',
    SIZES: 'sizes',
    CHARSET: 'charset',
    COORDS: 'coords',
    SHAPE: 'shape',
  } as const,

  // Link Relations
  RELATIONS: {
    ALTERNATE: 'alternate',
    AUTHOR: 'author',
    BOOKMARK: 'bookmark',
    CANONICAL: 'canonical',
    HELP: 'help',
    ICON: 'icon',
    LICENSE: 'license',
    NEXT: 'next',
    PREV: 'prev',
    SEARCH: 'search',
    STYLESHEET: 'stylesheet',
    TAG: 'tag',
    AMPHTML: 'amphtml',
    APPLE_TOUCH_ICON: 'apple-touch-icon',
    MANIFEST: 'manifest',
    PRECONNECT: 'preconnect',
    PREFETCH: 'prefetch',
    PRELOAD: 'preload',
    PRERENDER: 'prerender',
    DNS_PREFETCH: 'dns-prefetch',
    MODULE_PRELOAD: 'modulepreload',
  } as const,

  // Link Target Values
  TARGETS: {
    SELF: '_self',
    BLANK: '_blank',
    PARENT: '_parent',
    TOP: '_top',
    NEW: '_new',
  } as const,

  // Link Quality Scores
  QUALITY_SCORES: {
    EXCELLENT: 100,
    GOOD: 75,
    AVERAGE: 50,
    POOR: 25,
    VERY_POOR: 10,
  } as const,

  // Link Authority Levels
  AUTHORITY_LEVELS: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    VERY_LOW: 'very_low',
    NO_AUTHORITY: 'no_authority',
  } as const,

  // Link Placement Types
  PLACEMENT_TYPES: {
    HEADER: 'header',
    FOOTER: 'footer',
    SIDEBAR: 'sidebar',
    CONTENT: 'content',
    NAVIGATION: 'navigation',
    BREADCRUMB: 'breadcrumb',
    RELATED: 'related',
    FEATURED: 'featured',
    POPUP: 'popup',
    MODAL: 'modal',
    INLINE: 'inline',
  } as const,

  // Link Sources
  SOURCES: {
    ORGANIC: 'organic',
    PAID: 'paid',
    SOCIAL: 'social',
    EMAIL: 'email',
    REFERRAL: 'referral',
    DIRECT: 'direct',
    SYNDICATION: 'syndication',
    PRESS_RELEASE: 'press_release',
    GUEST_POST: 'guest_post',
    FORUM: 'forum',
    COMMENT: 'comment',
    DIRECTORY: 'directory',
    BLOG_ROLL: 'blog_roll',
    WIKIPEDIA: 'wikipedia',
    NEWS: 'news',
    VIDEO: 'video',
    PODCAST: 'podcast',
    INFOGRAFIC: 'infografic',
    EBOOK: 'ebook',
    WEBINAR: 'webinar',
  } as const,

  // Link Anchor Text Types
  ANCHOR_TEXT_TYPES: {
    EXACT_MATCH: 'exact_match',
    PARTIAL_MATCH: 'partial_match',
    BRANDED: 'branded',
    GENERIC: 'generic',
    NAKED: 'naked',
    IMAGE: 'image',
    LONG_TAIL: 'long_tail',
    LSI: 'lsi',
    RELATED: 'related',
    MISMATCHED: 'mismatched',
  } as const,

  // Link Metrics
  METRICS: {
    TOTAL_LINKS: 'total_links',
    UNIQUE_DOMAINS: 'unique_domains',
    DOFOLLOW_COUNT: 'dofollow_count',
    NOFOLLOW_COUNT: 'nofollow_count',
    INTERNAL_COUNT: 'internal_count',
    EXTERNAL_COUNT: 'external_count',
    BROKEN_COUNT: 'broken_count',
    REDIRECT_COUNT: 'redirect_count',
    AUTHORITY_SCORE: 'authority_score',
    TRUST_SCORE: 'trust_score',
    RELEVANCE_SCORE: 'relevance_score',
    DOMAIN_AUTHORITY: 'domain_authority',
    PAGE_AUTHORITY: 'page_authority',
    SPAM_SCORE: 'spam_score',
  } as const,

  // Link Errors
  ERROR_TYPES: {
    BROKEN_LINK: 'broken_link',
    REDIRECT_CHAIN: 'redirect_chain',
    MISSING_TITLE: 'missing_title',
    NO_ANCHOR_TEXT: 'no_anchor_text',
    DUPLICATE_LINK: 'duplicate_link',
    EXCESSIVE_LINKS: 'excessive_links',
    LOW_QUALITY: 'low_quality',
    SUSPICIOUS_LINK: 'suspicious_link',
    TOO_MANY_REDIRECTS: 'too_many_redirects',
    SSL_ERROR: 'ssl_error',
    TIMEOUT: 'timeout',
    FORBIDDEN: 'forbidden',
    NOT_FOUND: 'not_found',
    SERVER_ERROR: 'server_error',
  } as const,
} as const;

// Link Types
export type SEOLinkType = (typeof SEO_LINK.TYPES)[keyof typeof SEO_LINK.TYPES];

// Link Status
export type SEOLinkStatus = (typeof SEO_LINK.STATUS)[keyof typeof SEO_LINK.STATUS];

// Link Attributes
export type SEOLinkAttribute = (typeof SEO_LINK.ATTRIBUTES)[keyof typeof SEO_LINK.ATTRIBUTES];

// Link Relations
export type SEOLinkRelation = (typeof SEO_LINK.RELATIONS)[keyof typeof SEO_LINK.RELATIONS];

// Link Targets
export type SEOLinkTarget = (typeof SEO_LINK.TARGETS)[keyof typeof SEO_LINK.TARGETS];

// Link Quality Scores
export type SEOLinkQualityScore =
  (typeof SEO_LINK.QUALITY_SCORES)[keyof typeof SEO_LINK.QUALITY_SCORES];

// Link Authority Levels
export type SEOLinkAuthorityLevel =
  (typeof SEO_LINK.AUTHORITY_LEVELS)[keyof typeof SEO_LINK.AUTHORITY_LEVELS];

// Link Placement Types
export type SEOLinkPlacementType =
  (typeof SEO_LINK.PLACEMENT_TYPES)[keyof typeof SEO_LINK.PLACEMENT_TYPES];

// Link Sources
export type SEOLinkSource = (typeof SEO_LINK.SOURCES)[keyof typeof SEO_LINK.SOURCES];

// Link Anchor Text Types
export type SEOLinkAnchorTextType =
  (typeof SEO_LINK.ANCHOR_TEXT_TYPES)[keyof typeof SEO_LINK.ANCHOR_TEXT_TYPES];

// Link Metrics
export type SEOLinkMetric = (typeof SEO_LINK.METRICS)[keyof typeof SEO_LINK.METRICS];

// Link Errors
export type SEOLinkErrorType = (typeof SEO_LINK.ERROR_TYPES)[keyof typeof SEO_LINK.ERROR_TYPES];

// Utility Functions
export function getSEOLinkTypeLabel(type: SEOLinkType): string {
  const labels: Record<SEOLinkType, string> = {
    [SEO_LINK.TYPES.INTERNAL]: 'Internal Link',
    [SEO_LINK.TYPES.EXTERNAL]: 'External Link',
    [SEO_LINK.TYPES.BACKLINK]: 'Backlink',
    [SEO_LINK.TYPES.INBOUND]: 'Inbound Link',
    [SEO_LINK.TYPES.OUTBOUND]: 'Outbound Link',
    [SEO_LINK.TYPES.DOFOLLOW]: 'Dofollow Link',
    [SEO_LINK.TYPES.NOFOLLOW]: 'Nofollow Link',
    [SEO_LINK.TYPES.SPONSORED]: 'Sponsored Link',
    [SEO_LINK.TYPES.UGC]: 'UGC Link',
    [SEO_LINK.TYPES.CANONICAL]: 'Canonical Link',
    [SEO_LINK.TYPES.REL_ALTERNATE]: 'Alternate Link',
    [SEO_LINK.TYPES.REL_NEXT]: 'Next Link',
    [SEO_LINK.TYPES.REL_PREV]: 'Previous Link',
    [SEO_LINK.TYPES.BOOKMARK]: 'Bookmark Link',
    [SEO_LINK.TYPES.AUTHOR]: 'Author Link',
    [SEO_LINK.TYPES.HELP]: 'Help Link',
    [SEO_LINK.TYPES.LICENSE]: 'License Link',
    [SEO_LINK.TYPES.SEARCH]: 'Search Link',
    [SEO_LINK.TYPES.TAG]: 'Tag Link',
  };
  return labels[type] || 'Unknown Link Type';
}

export function getSEOLinkStatusLabel(status: SEOLinkStatus): string {
  const labels: Record<SEOLinkStatus, string> = {
    [SEO_LINK.STATUS.ACTIVE]: 'Active',
    [SEO_LINK.STATUS.BROKEN]: 'Broken',
    [SEO_LINK.STATUS.REDIRECTED]: 'Redirected',
    [SEO_LINK.STATUS.INACTIVE]: 'Inactive',
    [SEO_LINK.STATUS.REMOVED]: 'Removed',
    [SEO_LINK.STATUS.PENDING]: 'Pending',
    [SEO_LINK.STATUS.VERIFIED]: 'Verified',
    [SEO_LINK.STATUS.UNVERIFIED]: 'Unverified',
    [SEO_LINK.STATUS.SUSPICIOUS]: 'Suspicious',
    [SEO_LINK.STATUS.PENALIZED]: 'Penalized',
    [SEO_LINK.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOLinkRelationLabel(relation: SEOLinkRelation): string {
  const labels: Record<SEOLinkRelation, string> = {
    [SEO_LINK.RELATIONS.ALTERNATE]: 'Alternate',
    [SEO_LINK.RELATIONS.AUTHOR]: 'Author',
    [SEO_LINK.RELATIONS.BOOKMARK]: 'Bookmark',
    [SEO_LINK.RELATIONS.CANONICAL]: 'Canonical',
    [SEO_LINK.RELATIONS.HELP]: 'Help',
    [SEO_LINK.RELATIONS.ICON]: 'Icon',
    [SEO_LINK.RELATIONS.LICENSE]: 'License',
    [SEO_LINK.RELATIONS.NEXT]: 'Next',
    [SEO_LINK.RELATIONS.PREV]: 'Previous',
    [SEO_LINK.RELATIONS.SEARCH]: 'Search',
    [SEO_LINK.RELATIONS.STYLESHEET]: 'Stylesheet',
    [SEO_LINK.RELATIONS.TAG]: 'Tag',
    [SEO_LINK.RELATIONS.AMPHTML]: 'AMP HTML',
    [SEO_LINK.RELATIONS.APPLE_TOUCH_ICON]: 'Apple Touch Icon',
    [SEO_LINK.RELATIONS.MANIFEST]: 'Manifest',
    [SEO_LINK.RELATIONS.PRECONNECT]: 'Preconnect',
    [SEO_LINK.RELATIONS.PREFETCH]: 'Prefetch',
    [SEO_LINK.RELATIONS.PRELOAD]: 'Preload',
    [SEO_LINK.RELATIONS.PRERENDER]: 'Prerender',
    [SEO_LINK.RELATIONS.DNS_PREFETCH]: 'DNS Prefetch',
    [SEO_LINK.RELATIONS.MODULE_PRELOAD]: 'Module Preload',
  };
  return labels[relation] || 'Unknown Relation';
}

export function getSEOLinkTargetLabel(target: SEOLinkTarget): string {
  const labels: Record<SEOLinkTarget, string> = {
    [SEO_LINK.TARGETS.SELF]: '_self (Same Tab)',
    [SEO_LINK.TARGETS.BLANK]: '_blank (New Tab)',
    [SEO_LINK.TARGETS.PARENT]: '_parent (Parent Frame)',
    [SEO_LINK.TARGETS.TOP]: '_top (Top Frame)',
    [SEO_LINK.TARGETS.NEW]: '_new (New Window)',
  };
  return labels[target] || 'Unknown Target';
}

export function getSEOLinkAuthorityLabel(authority: SEOLinkAuthorityLevel): string {
  const labels: Record<SEOLinkAuthorityLevel, string> = {
    [SEO_LINK.AUTHORITY_LEVELS.HIGH]: 'High Authority',
    [SEO_LINK.AUTHORITY_LEVELS.MEDIUM]: 'Medium Authority',
    [SEO_LINK.AUTHORITY_LEVELS.LOW]: 'Low Authority',
    [SEO_LINK.AUTHORITY_LEVELS.VERY_LOW]: 'Very Low Authority',
    [SEO_LINK.AUTHORITY_LEVELS.NO_AUTHORITY]: 'No Authority',
  };
  return labels[authority] || 'Unknown Authority';
}

export function getSEOLinkPlacementLabel(placement: SEOLinkPlacementType): string {
  const labels: Record<SEOLinkPlacementType, string> = {
    [SEO_LINK.PLACEMENT_TYPES.HEADER]: 'Header',
    [SEO_LINK.PLACEMENT_TYPES.FOOTER]: 'Footer',
    [SEO_LINK.PLACEMENT_TYPES.SIDEBAR]: 'Sidebar',
    [SEO_LINK.PLACEMENT_TYPES.CONTENT]: 'Content',
    [SEO_LINK.PLACEMENT_TYPES.NAVIGATION]: 'Navigation',
    [SEO_LINK.PLACEMENT_TYPES.BREADCRUMB]: 'Breadcrumb',
    [SEO_LINK.PLACEMENT_TYPES.RELATED]: 'Related Links',
    [SEO_LINK.PLACEMENT_TYPES.FEATURED]: 'Featured',
    [SEO_LINK.PLACEMENT_TYPES.POPUP]: 'Popup',
    [SEO_LINK.PLACEMENT_TYPES.MODAL]: 'Modal',
    [SEO_LINK.PLACEMENT_TYPES.INLINE]: 'Inline',
  };
  return labels[placement] || 'Unknown Placement';
}

export function getSEOLinkSourceLabel(source: SEOLinkSource): string {
  const labels: Record<SEOLinkSource, string> = {
    [SEO_LINK.SOURCES.ORGANIC]: 'Organic Search',
    [SEO_LINK.SOURCES.PAID]: 'Paid Advertising',
    [SEO_LINK.SOURCES.SOCIAL]: 'Social Media',
    [SEO_LINK.SOURCES.EMAIL]: 'Email Campaign',
    [SEO_LINK.SOURCES.REFERRAL]: 'Referral Traffic',
    [SEO_LINK.SOURCES.DIRECT]: 'Direct Visit',
    [SEO_LINK.SOURCES.SYNDICATION]: 'Content Syndication',
    [SEO_LINK.SOURCES.PRESS_RELEASE]: 'Press Release',
    [SEO_LINK.SOURCES.GUEST_POST]: 'Guest Post',
    [SEO_LINK.SOURCES.FORUM]: 'Forum Post',
    [SEO_LINK.SOURCES.COMMENT]: 'Comment',
    [SEO_LINK.SOURCES.DIRECTORY]: 'Directory Submission',
    [SEO_LINK.SOURCES.BLOG_ROLL]: 'Blog Roll',
    [SEO_LINK.SOURCES.WIKIPEDIA]: 'Wikipedia Reference',
    [SEO_LINK.SOURCES.NEWS]: 'News Article',
    [SEO_LINK.SOURCES.VIDEO]: 'Video Description',
    [SEO_LINK.SOURCES.PODCAST]: 'Podcast Show Notes',
    [SEO_LINK.SOURCES.INFOGRAFIC]: 'Infographic',
    [SEO_LINK.SOURCES.EBOOK]: 'E-Book',
    [SEO_LINK.SOURCES.WEBINAR]: 'Webinar',
  };
  return labels[source] || 'Unknown Source';
}

export function getSEOLinkAnchorTextTypeLabel(type: SEOLinkAnchorTextType): string {
  const labels: Record<SEOLinkAnchorTextType, string> = {
    [SEO_LINK.ANCHOR_TEXT_TYPES.EXACT_MATCH]: 'Exact Match',
    [SEO_LINK.ANCHOR_TEXT_TYPES.PARTIAL_MATCH]: 'Partial Match',
    [SEO_LINK.ANCHOR_TEXT_TYPES.BRANDED]: 'Branded',
    [SEO_LINK.ANCHOR_TEXT_TYPES.GENERIC]: 'Generic',
    [SEO_LINK.ANCHOR_TEXT_TYPES.NAKED]: 'Naked URL',
    [SEO_LINK.ANCHOR_TEXT_TYPES.IMAGE]: 'Image Link',
    [SEO_LINK.ANCHOR_TEXT_TYPES.LONG_TAIL]: 'Long-tail',
    [SEO_LINK.ANCHOR_TEXT_TYPES.LSI]: 'LSI Keyword',
    [SEO_LINK.ANCHOR_TEXT_TYPES.RELATED]: 'Related Phrase',
    [SEO_LINK.ANCHOR_TEXT_TYPES.MISMATCHED]: 'Mismatched',
  };
  return labels[type] || 'Unknown Anchor Text Type';
}

export function getSEOLinkErrorLabel(errorType: SEOLinkErrorType): string {
  const labels: Record<SEOLinkErrorType, string> = {
    [SEO_LINK.ERROR_TYPES.BROKEN_LINK]: 'Broken Link (404)',
    [SEO_LINK.ERROR_TYPES.REDIRECT_CHAIN]: 'Redirect Chain',
    [SEO_LINK.ERROR_TYPES.MISSING_TITLE]: 'Missing Title Attribute',
    [SEO_LINK.ERROR_TYPES.NO_ANCHOR_TEXT]: 'No Anchor Text',
    [SEO_LINK.ERROR_TYPES.DUPLICATE_LINK]: 'Duplicate Link',
    [SEO_LINK.ERROR_TYPES.EXCESSIVE_LINKS]: 'Excessive Links on Page',
    [SEO_LINK.ERROR_TYPES.LOW_QUALITY]: 'Low Quality Link',
    [SEO_LINK.ERROR_TYPES.SUSPICIOUS_LINK]: 'Suspicious Link',
    [SEO_LINK.ERROR_TYPES.TOO_MANY_REDIRECTS]: 'Too Many Redirects',
    [SEO_LINK.ERROR_TYPES.SSL_ERROR]: 'SSL Certificate Error',
    [SEO_LINK.ERROR_TYPES.TIMEOUT]: 'Timeout Error',
    [SEO_LINK.ERROR_TYPES.FORBIDDEN]: 'Forbidden (403)',
    [SEO_LINK.ERROR_TYPES.NOT_FOUND]: 'Not Found (404)',
    [SEO_LINK.ERROR_TYPES.SERVER_ERROR]: 'Server Error (5xx)',
  };
  return labels[errorType] || 'Unknown Error';
}

export function isLinkActive(status: SEOLinkStatus): boolean {
  return status === SEO_LINK.STATUS.ACTIVE || status === SEO_LINK.STATUS.VERIFIED;
}

export function isLinkProblematic(status: SEOLinkStatus): boolean {
  const problematicStatuses: SEOLinkStatus[] = [
    SEO_LINK.STATUS.BROKEN,
    SEO_LINK.STATUS.SUSPICIOUS,
    SEO_LINK.STATUS.PENALIZED,
    SEO_LINK.STATUS.REDIRECTED,
  ];
  return problematicStatuses.includes(status);
}

export function getLinkStatusColor(status: SEOLinkStatus): string {
  const colors: Record<SEOLinkStatus, string> = {
    [SEO_LINK.STATUS.ACTIVE]: '#4CAF50',
    [SEO_LINK.STATUS.BROKEN]: '#F44336',
    [SEO_LINK.STATUS.REDIRECTED]: '#FF9800',
    [SEO_LINK.STATUS.INACTIVE]: '#9E9E9E',
    [SEO_LINK.STATUS.REMOVED]: '#9E9E9E',
    [SEO_LINK.STATUS.PENDING]: '#FFC107',
    [SEO_LINK.STATUS.VERIFIED]: '#4CAF50',
    [SEO_LINK.STATUS.UNVERIFIED]: '#FF9800',
    [SEO_LINK.STATUS.SUSPICIOUS]: '#F44336',
    [SEO_LINK.STATUS.PENALIZED]: '#D32F2F',
    [SEO_LINK.STATUS.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}
