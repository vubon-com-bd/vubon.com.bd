/**
 * SEO Robots Constants
 * Configuration for robots.txt, meta robots, and crawl directives
 */

export const SEO_ROBOTS = {
  // Robots Types
  TYPES: {
    ROBOTS_TXT: 'robots_txt',
    META_ROBOTS: 'meta_robots',
    X_ROBOTS: 'x_robots',
    REL_NOFOLLOW: 'rel_nofollow',
    REL_NOINDEX: 'rel_noindex',
    CANONICAL: 'canonical',
    HREFLANG: 'hreflang',
  } as const,

  // Robots Status
  STATUS: {
    PENDING: 'pending',
    GENERATED: 'generated',
    PUBLISHED: 'published',
    VALID: 'valid',
    INVALID: 'invalid',
    PARTIAL: 'partial',
    UPDATING: 'updating',
    OUTDATED: 'outdated',
    ERROR: 'error',
    ARCHIVED: 'archived',
  } as const,

  // Robots Directives
  DIRECTIVES: {
    // For robots.txt
    USER_AGENT: 'User-agent',
    DISALLOW: 'Disallow',
    ALLOW: 'Allow',
    SITEMAP: 'Sitemap',
    CRAWL_DELAY: 'Crawl-delay',
    HOST: 'Host',
    ROBOTS_NOINDEX: 'Noindex',
    ROBOTS_NONE: 'None',

    // For meta robots
    META_INDEX: 'index',
    META_NOINDEX: 'noindex',
    META_FOLLOW: 'follow',
    META_NOFOLLOW: 'nofollow',
    META_NOARCHIVE: 'noarchive',
    META_NOSNIPPET: 'nosnippet',
    META_NOODP: 'noodp',
    META_NOYDIR: 'noydir',
    META_NOTRANSLATE: 'notranslate',
    META_NOCACHE: 'nocache',
    META_NOPREVIEW: 'nopreview',
    META_MAX_SNIPPET: 'max-snippet',
    META_MAX_VIDEO_PREVIEW: 'max-video-preview',
    META_MAX_IMAGE_PREVIEW: 'max-image-preview',
  } as const,

  // Robots User Agents
  USER_AGENTS: {
    ALL: '*',
    GOOGLE: 'Googlebot',
    GOOGLE_IMAGE: 'Googlebot-Image',
    GOOGLE_VIDEO: 'Googlebot-Video',
    GOOGLE_NEWS: 'Googlebot-News',
    GOOGLE_MOBILE: 'Googlebot-Mobile',
    BING: 'Bingbot',
    BING_IMAGE: 'BingPreview',
    YANDEX: 'YandexBot',
    YANDEX_IMAGE: 'YandexImages',
    BAIDU: 'Baiduspider',
    DUCKDUCKGO: 'DuckDuckBot',
    YAHOO: 'Yahoo! Slurp',
    FACEBOOK: 'facebookexternalhit',
    TWITTER: 'Twitterbot',
    LINKEDIN: 'LinkedInBot',
    PINTEREST: 'Pinterestbot',
    SLACK: 'Slackbot',
    TELEGRAM: 'TelegramBot',
  } as const,

  // Robots Parameters
  PARAMETERS: {
    MAX_SNIPPET: 'max-snippet',
    MAX_VIDEO_PREVIEW: 'max-video-preview',
    MAX_IMAGE_PREVIEW: 'max-image-preview',
    IMAGE_PREVIEW_STANDARD: 'standard',
    IMAGE_PREVIEW_LARGE: 'large',
    IMAGE_PREVIEW_NONE: 'none',
  } as const,

  // Robots Validation
  VALIDATION: {
    VALID: 'valid',
    INVALID: 'invalid',
    WARNING: 'warning',
    ERROR: 'error',
  } as const,

  // Robots Errors
  ERROR_TYPES: {
    MISSING_SITEMAP: 'missing_sitemap',
    INVALID_USER_AGENT: 'invalid_user_agent',
    INVALID_DISALLOW: 'invalid_disallow',
    INVALID_ALLOW: 'invalid_allow',
    DUPLICATE_DIRECTIVE: 'duplicate_directive',
    CONFLICTING_DIRECTIVES: 'conflicting_directives',
    MAX_FILE_SIZE: 'max_file_size',
    FORMAT_ERROR: 'format_error',
    SYNTAX_ERROR: 'syntax_error',
    MISSING_REQUIRED: 'missing_required',
  } as const,

  // Robots Metrics
  METRICS: {
    TOTAL_RULES: 'total_rules',
    USER_AGENTS_COUNT: 'user_agents_count',
    DISALLOW_RULES: 'disallow_rules',
    ALLOW_RULES: 'allow_rules',
    SITEMAP_COUNT: 'sitemap_count',
    FILE_SIZE: 'file_size',
    VALIDITY_SCORE: 'validity_score',
  } as const,
} as const;

// Robots Types
export type SEORobotsType = (typeof SEO_ROBOTS.TYPES)[keyof typeof SEO_ROBOTS.TYPES];

// Robots Status
export type SEORobotsStatus = (typeof SEO_ROBOTS.STATUS)[keyof typeof SEO_ROBOTS.STATUS];

// Robots Directives
export type SEORobotsDirective = (typeof SEO_ROBOTS.DIRECTIVES)[keyof typeof SEO_ROBOTS.DIRECTIVES];

// User Agents
export type SEORobotsUserAgent =
  (typeof SEO_ROBOTS.USER_AGENTS)[keyof typeof SEO_ROBOTS.USER_AGENTS];

// Robots Parameters
export type SEORobotsParameter = (typeof SEO_ROBOTS.PARAMETERS)[keyof typeof SEO_ROBOTS.PARAMETERS];

// Robots Validation
export type SEORobotsValidation =
  (typeof SEO_ROBOTS.VALIDATION)[keyof typeof SEO_ROBOTS.VALIDATION];

// Robots Errors
export type SEORobotsErrorType =
  (typeof SEO_ROBOTS.ERROR_TYPES)[keyof typeof SEO_ROBOTS.ERROR_TYPES];

// Robots Metrics
export type SEORobotsMetric = (typeof SEO_ROBOTS.METRICS)[keyof typeof SEO_ROBOTS.METRICS];

// Utility Functions
export function getSEORobotsTypeLabel(type: SEORobotsType): string {
  const labels: Record<SEORobotsType, string> = {
    [SEO_ROBOTS.TYPES.ROBOTS_TXT]: 'robots.txt',
    [SEO_ROBOTS.TYPES.META_ROBOTS]: 'Meta Robots',
    [SEO_ROBOTS.TYPES.X_ROBOTS]: 'X-Robots Header',
    [SEO_ROBOTS.TYPES.REL_NOFOLLOW]: 'rel="nofollow"',
    [SEO_ROBOTS.TYPES.REL_NOINDEX]: 'rel="noindex"',
    [SEO_ROBOTS.TYPES.CANONICAL]: 'Canonical Tag',
    [SEO_ROBOTS.TYPES.HREFLANG]: 'Hreflang Tag',
  };
  return labels[type] || 'Unknown Robots Type';
}

export function getSEORobotsStatusLabel(status: SEORobotsStatus): string {
  const labels: Record<SEORobotsStatus, string> = {
    [SEO_ROBOTS.STATUS.PENDING]: 'Pending',
    [SEO_ROBOTS.STATUS.GENERATED]: 'Generated',
    [SEO_ROBOTS.STATUS.PUBLISHED]: 'Published',
    [SEO_ROBOTS.STATUS.VALID]: 'Valid',
    [SEO_ROBOTS.STATUS.INVALID]: 'Invalid',
    [SEO_ROBOTS.STATUS.PARTIAL]: 'Partial',
    [SEO_ROBOTS.STATUS.UPDATING]: 'Updating',
    [SEO_ROBOTS.STATUS.OUTDATED]: 'Outdated',
    [SEO_ROBOTS.STATUS.ERROR]: 'Error',
    [SEO_ROBOTS.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEORobotsDirectiveLabel(directive: SEORobotsDirective): string {
  const labels: Record<SEORobotsDirective, string> = {
    // robots.txt directives
    [SEO_ROBOTS.DIRECTIVES.USER_AGENT]: 'User-agent',
    [SEO_ROBOTS.DIRECTIVES.DISALLOW]: 'Disallow',
    [SEO_ROBOTS.DIRECTIVES.ALLOW]: 'Allow',
    [SEO_ROBOTS.DIRECTIVES.SITEMAP]: 'Sitemap',
    [SEO_ROBOTS.DIRECTIVES.CRAWL_DELAY]: 'Crawl-delay',
    [SEO_ROBOTS.DIRECTIVES.HOST]: 'Host',
    [SEO_ROBOTS.DIRECTIVES.ROBOTS_NOINDEX]: 'Noindex',
    [SEO_ROBOTS.DIRECTIVES.ROBOTS_NONE]: 'None',

    // Meta robots directives
    [SEO_ROBOTS.DIRECTIVES.META_INDEX]: 'index',
    [SEO_ROBOTS.DIRECTIVES.META_NOINDEX]: 'noindex',
    [SEO_ROBOTS.DIRECTIVES.META_FOLLOW]: 'follow',
    [SEO_ROBOTS.DIRECTIVES.META_NOFOLLOW]: 'nofollow',
    [SEO_ROBOTS.DIRECTIVES.META_NOARCHIVE]: 'noarchive',
    [SEO_ROBOTS.DIRECTIVES.META_NOSNIPPET]: 'nosnippet',
    [SEO_ROBOTS.DIRECTIVES.META_NOODP]: 'noodp',
    [SEO_ROBOTS.DIRECTIVES.META_NOYDIR]: 'noydir',
    [SEO_ROBOTS.DIRECTIVES.META_NOTRANSLATE]: 'notranslate',
    [SEO_ROBOTS.DIRECTIVES.META_NOCACHE]: 'nocache',
    [SEO_ROBOTS.DIRECTIVES.META_NOPREVIEW]: 'nopreview',
    [SEO_ROBOTS.DIRECTIVES.META_MAX_SNIPPET]: 'max-snippet',
    [SEO_ROBOTS.DIRECTIVES.META_MAX_VIDEO_PREVIEW]: 'max-video-preview',
    [SEO_ROBOTS.DIRECTIVES.META_MAX_IMAGE_PREVIEW]: 'max-image-preview',
  };
  return labels[directive] || 'Unknown Directive';
}

export function getSEORobotsUserAgentLabel(userAgent: SEORobotsUserAgent): string {
  const labels: Record<SEORobotsUserAgent, string> = {
    [SEO_ROBOTS.USER_AGENTS.ALL]: 'All Crawlers',
    [SEO_ROBOTS.USER_AGENTS.GOOGLE]: 'Googlebot',
    [SEO_ROBOTS.USER_AGENTS.GOOGLE_IMAGE]: 'Googlebot-Image',
    [SEO_ROBOTS.USER_AGENTS.GOOGLE_VIDEO]: 'Googlebot-Video',
    [SEO_ROBOTS.USER_AGENTS.GOOGLE_NEWS]: 'Googlebot-News',
    [SEO_ROBOTS.USER_AGENTS.GOOGLE_MOBILE]: 'Googlebot-Mobile',
    [SEO_ROBOTS.USER_AGENTS.BING]: 'Bingbot',
    [SEO_ROBOTS.USER_AGENTS.BING_IMAGE]: 'BingPreview',
    [SEO_ROBOTS.USER_AGENTS.YANDEX]: 'YandexBot',
    [SEO_ROBOTS.USER_AGENTS.YANDEX_IMAGE]: 'YandexImages',
    [SEO_ROBOTS.USER_AGENTS.BAIDU]: 'Baiduspider',
    [SEO_ROBOTS.USER_AGENTS.DUCKDUCKGO]: 'DuckDuckBot',
    [SEO_ROBOTS.USER_AGENTS.YAHOO]: 'Yahoo! Slurp',
    [SEO_ROBOTS.USER_AGENTS.FACEBOOK]: 'Facebook Crawler',
    [SEO_ROBOTS.USER_AGENTS.TWITTER]: 'Twitterbot',
    [SEO_ROBOTS.USER_AGENTS.LINKEDIN]: 'LinkedInBot',
    [SEO_ROBOTS.USER_AGENTS.PINTEREST]: 'Pinterestbot',
    [SEO_ROBOTS.USER_AGENTS.SLACK]: 'Slackbot',
    [SEO_ROBOTS.USER_AGENTS.TELEGRAM]: 'TelegramBot',
  };
  return labels[userAgent] || 'Unknown User Agent';
}

export function getSEORobotsErrorLabel(errorType: SEORobotsErrorType): string {
  const labels: Record<SEORobotsErrorType, string> = {
    [SEO_ROBOTS.ERROR_TYPES.MISSING_SITEMAP]: 'Missing Sitemap',
    [SEO_ROBOTS.ERROR_TYPES.INVALID_USER_AGENT]: 'Invalid User Agent',
    [SEO_ROBOTS.ERROR_TYPES.INVALID_DISALLOW]: 'Invalid Disallow Path',
    [SEO_ROBOTS.ERROR_TYPES.INVALID_ALLOW]: 'Invalid Allow Path',
    [SEO_ROBOTS.ERROR_TYPES.DUPLICATE_DIRECTIVE]: 'Duplicate Directive',
    [SEO_ROBOTS.ERROR_TYPES.CONFLICTING_DIRECTIVES]: 'Conflicting Directives',
    [SEO_ROBOTS.ERROR_TYPES.MAX_FILE_SIZE]: 'File Size Exceeded',
    [SEO_ROBOTS.ERROR_TYPES.FORMAT_ERROR]: 'Format Error',
    [SEO_ROBOTS.ERROR_TYPES.SYNTAX_ERROR]: 'Syntax Error',
    [SEO_ROBOTS.ERROR_TYPES.MISSING_REQUIRED]: 'Missing Required Directive',
  };
  return labels[errorType] || 'Unknown Error';
}

export function getRobotsStatusColor(status: SEORobotsStatus): string {
  const colors: Record<SEORobotsStatus, string> = {
    [SEO_ROBOTS.STATUS.PENDING]: '#9E9E9E',
    [SEO_ROBOTS.STATUS.GENERATED]: '#2196F3',
    [SEO_ROBOTS.STATUS.PUBLISHED]: '#4CAF50',
    [SEO_ROBOTS.STATUS.VALID]: '#4CAF50',
    [SEO_ROBOTS.STATUS.INVALID]: '#F44336',
    [SEO_ROBOTS.STATUS.PARTIAL]: '#FF9800',
    [SEO_ROBOTS.STATUS.UPDATING]: '#00BCD4',
    [SEO_ROBOTS.STATUS.OUTDATED]: '#FF9800',
    [SEO_ROBOTS.STATUS.ERROR]: '#D32F2F',
    [SEO_ROBOTS.STATUS.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isRobotsValid(status: SEORobotsStatus): boolean {
  const validStatuses: SEORobotsStatus[] = [SEO_ROBOTS.STATUS.VALID, SEO_ROBOTS.STATUS.PUBLISHED];
  return validStatuses.includes(status);
}

export function isRobotsActive(status: SEORobotsStatus): boolean {
  const activeStatuses: SEORobotsStatus[] = [
    SEO_ROBOTS.STATUS.GENERATED,
    SEO_ROBOTS.STATUS.PUBLISHED,
    SEO_ROBOTS.STATUS.VALID,
    SEO_ROBOTS.STATUS.UPDATING,
  ];
  return activeStatuses.includes(status);
}

export function getCombinedDirectives(directives: string[]): string {
  return directives.join(', ');
}

export function formatRobotsDirective(directive: string, value?: string): string {
  if (value) {
    return `${directive}: ${value}`;
  }
  return directive;
}
