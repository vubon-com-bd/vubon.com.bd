/**
 * SEO Robots Type Constants
 * Types and classifications for robots directives
 */

export const SEO_ROBOTS_TYPE = {
  // Robots Categories
  CATEGORIES: {
    ROBOTS_TXT: 'robots_txt',
    META_ROBOTS: 'meta_robots',
    X_ROBOTS: 'x_robots',
    LINK_ATTRIBUTES: 'link_attributes',
  } as const,

  // Meta Robots Sub-types
  META_SUB_TYPES: {
    ALL: 'all',
    NONE: 'none',
    INDEX: 'index',
    NOINDEX: 'noindex',
    FOLLOW: 'follow',
    NOFOLLOW: 'nofollow',
    INDEX_FOLLOW: 'index_follow',
    INDEX_NOFOLLOW: 'index_nofollow',
    NOINDEX_FOLLOW: 'noindex_follow',
    NOINDEX_NOFOLLOW: 'noindex_nofollow',
  } as const,

  // X-Robots Sub-types
  X_ROBOTS_SUB_TYPES: {
    NOINDEX: 'noindex',
    NOFOLLOW: 'nofollow',
    NOARCHIVE: 'noarchive',
    NOSNIPPET: 'nosnippet',
    NOODP: 'noodp',
    NOYDIR: 'noydir',
    NOTRANSLATE: 'notranslate',
    NOCACHE: 'nocache',
    NOPREVIEW: 'nopreview',
  } as const,

  // Link Attribute Sub-types
  LINK_SUB_TYPES: {
    NOFOLLOW: 'nofollow',
    DOFOLLOW: 'dofollow',
    SPONSORED: 'sponsored',
    UGC: 'ugc',
  } as const,

  // Robots Scope
  SCOPE: {
    GLOBAL: 'global',
    PAGE: 'page',
    SECTION: 'section',
    ELEMENT: 'element',
  } as const,

  // Robots Priority
  PRIORITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Robots Implementation
  IMPLEMENTATION: {
    SERVER_SIDE: 'server_side',
    CLIENT_SIDE: 'client_side',
    HYBRID: 'hybrid',
  } as const,
} as const;

// Robots Categories
export type SEORobotsTypeCategory =
  (typeof SEO_ROBOTS_TYPE.CATEGORIES)[keyof typeof SEO_ROBOTS_TYPE.CATEGORIES];

// Meta Robots Sub-types
export type SEORobotsTypeMetaSubType =
  (typeof SEO_ROBOTS_TYPE.META_SUB_TYPES)[keyof typeof SEO_ROBOTS_TYPE.META_SUB_TYPES];

// X-Robots Sub-types
export type SEORobotsTypeXRobotsSubType =
  (typeof SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES)[keyof typeof SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES];

// Link Attribute Sub-types
export type SEORobotsTypeLinkSubType =
  (typeof SEO_ROBOTS_TYPE.LINK_SUB_TYPES)[keyof typeof SEO_ROBOTS_TYPE.LINK_SUB_TYPES];

// Robots Scope
export type SEORobotsTypeScope = (typeof SEO_ROBOTS_TYPE.SCOPE)[keyof typeof SEO_ROBOTS_TYPE.SCOPE];

// Robots Priority
export type SEORobotsTypePriority =
  (typeof SEO_ROBOTS_TYPE.PRIORITY)[keyof typeof SEO_ROBOTS_TYPE.PRIORITY];

// Robots Implementation
export type SEORobotsTypeImplementation =
  (typeof SEO_ROBOTS_TYPE.IMPLEMENTATION)[keyof typeof SEO_ROBOTS_TYPE.IMPLEMENTATION];

// Utility Functions
export function getSEORobotsCategoryLabel(category: SEORobotsTypeCategory): string {
  const labels: Record<SEORobotsTypeCategory, string> = {
    [SEO_ROBOTS_TYPE.CATEGORIES.ROBOTS_TXT]: 'Robots.txt',
    [SEO_ROBOTS_TYPE.CATEGORIES.META_ROBOTS]: 'Meta Robots',
    [SEO_ROBOTS_TYPE.CATEGORIES.X_ROBOTS]: 'X-Robots Header',
    [SEO_ROBOTS_TYPE.CATEGORIES.LINK_ATTRIBUTES]: 'Link Attributes',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEORobotsMetaSubTypeLabel(subType: SEORobotsTypeMetaSubType): string {
  const labels: Record<SEORobotsTypeMetaSubType, string> = {
    [SEO_ROBOTS_TYPE.META_SUB_TYPES.ALL]: 'All (index, follow)',
    [SEO_ROBOTS_TYPE.META_SUB_TYPES.NONE]: 'None (noindex, nofollow)',
    [SEO_ROBOTS_TYPE.META_SUB_TYPES.INDEX]: 'Index Only',
    [SEO_ROBOTS_TYPE.META_SUB_TYPES.NOINDEX]: 'Noindex Only',
    [SEO_ROBOTS_TYPE.META_SUB_TYPES.FOLLOW]: 'Follow Only',
    [SEO_ROBOTS_TYPE.META_SUB_TYPES.NOFOLLOW]: 'Nofollow Only',
    [SEO_ROBOTS_TYPE.META_SUB_TYPES.INDEX_FOLLOW]: 'Index, Follow',
    [SEO_ROBOTS_TYPE.META_SUB_TYPES.INDEX_NOFOLLOW]: 'Index, Nofollow',
    [SEO_ROBOTS_TYPE.META_SUB_TYPES.NOINDEX_FOLLOW]: 'Noindex, Follow',
    [SEO_ROBOTS_TYPE.META_SUB_TYPES.NOINDEX_NOFOLLOW]: 'Noindex, Nofollow',
  };
  return labels[subType] || 'Unknown Meta Sub-type';
}

export function getSEORobotsXRobotsSubTypeLabel(subType: SEORobotsTypeXRobotsSubType): string {
  const labels: Record<SEORobotsTypeXRobotsSubType, string> = {
    [SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES.NOINDEX]: 'Noindex',
    [SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES.NOFOLLOW]: 'Nofollow',
    [SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES.NOARCHIVE]: 'Noarchive',
    [SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES.NOSNIPPET]: 'Nosnippet',
    [SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES.NOODP]: 'No ODP',
    [SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES.NOYDIR]: 'No YDIR',
    [SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES.NOTRANSLATE]: 'Notranslate',
    [SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES.NOCACHE]: 'Nocache',
    [SEO_ROBOTS_TYPE.X_ROBOTS_SUB_TYPES.NOPREVIEW]: 'Nopreview',
  };
  return labels[subType] || 'Unknown X-Robots Sub-type';
}

export function getSEORobotsLinkSubTypeLabel(subType: SEORobotsTypeLinkSubType): string {
  const labels: Record<SEORobotsTypeLinkSubType, string> = {
    [SEO_ROBOTS_TYPE.LINK_SUB_TYPES.NOFOLLOW]: 'Nofollow',
    [SEO_ROBOTS_TYPE.LINK_SUB_TYPES.DOFOLLOW]: 'Dofollow',
    [SEO_ROBOTS_TYPE.LINK_SUB_TYPES.SPONSORED]: 'Sponsored',
    [SEO_ROBOTS_TYPE.LINK_SUB_TYPES.UGC]: 'UGC',
  };
  return labels[subType] || 'Unknown Link Sub-type';
}

export function getSEORobotsScopeLabel(scope: SEORobotsTypeScope): string {
  const labels: Record<SEORobotsTypeScope, string> = {
    [SEO_ROBOTS_TYPE.SCOPE.GLOBAL]: 'Global (Site-wide)',
    [SEO_ROBOTS_TYPE.SCOPE.PAGE]: 'Page Level',
    [SEO_ROBOTS_TYPE.SCOPE.SECTION]: 'Section Level',
    [SEO_ROBOTS_TYPE.SCOPE.ELEMENT]: 'Element Level',
  };
  return labels[scope] || 'Unknown Scope';
}

export function getSEORobotsPriorityLabel(priority: SEORobotsTypePriority): string {
  const labels: Record<SEORobotsTypePriority, string> = {
    [SEO_ROBOTS_TYPE.PRIORITY.HIGH]: 'High Priority',
    [SEO_ROBOTS_TYPE.PRIORITY.MEDIUM]: 'Medium Priority',
    [SEO_ROBOTS_TYPE.PRIORITY.LOW]: 'Low Priority',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getSEORobotsImplementationLabel(
  implementation: SEORobotsTypeImplementation
): string {
  const labels: Record<SEORobotsTypeImplementation, string> = {
    [SEO_ROBOTS_TYPE.IMPLEMENTATION.SERVER_SIDE]: 'Server-side',
    [SEO_ROBOTS_TYPE.IMPLEMENTATION.CLIENT_SIDE]: 'Client-side',
    [SEO_ROBOTS_TYPE.IMPLEMENTATION.HYBRID]: 'Hybrid',
  };
  return labels[implementation] || 'Unknown Implementation';
}
