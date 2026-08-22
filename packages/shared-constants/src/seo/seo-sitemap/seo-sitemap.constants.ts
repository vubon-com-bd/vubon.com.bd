/**
 * SEO Sitemap Constants
 * Configuration for sitemap generation, management, and optimization
 */

export const SEO_SITEMAP = {
  // Sitemap Types
  TYPES: {
    XML: 'xml',
    HTML: 'html',
    TEXT: 'text',
    RSS: 'rss',
    ATOM: 'atom',
    JSON: 'json',
    VIDEO: 'video',
    IMAGE: 'image',
    NEWS: 'news',
    MOBILE: 'mobile',
    INDEX: 'index',
    SITEMAP_INDEX: 'sitemap_index',
  } as const,

  // Sitemap Status
  STATUS: {
    PENDING: 'pending',
    GENERATING: 'generating',
    GENERATED: 'generated',
    PUBLISHED: 'published',
    SUBMITTED: 'submitted',
    INDEXED: 'indexed',
    PARTIAL: 'partial',
    FAILED: 'failed',
    UPDATING: 'updating',
    OUTDATED: 'outdated',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,

  // Sitemap Priority
  PRIORITY: {
    HIGHEST: 1.0,
    HIGH: 0.8,
    MEDIUM: 0.6,
    LOW: 0.4,
    LOWEST: 0.2,
    NONE: 0.0,
  } as const,

  // Sitemap Change Frequency
  CHANGE_FREQUENCY: {
    ALWAYS: 'always',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
    NEVER: 'never',
  } as const,

  // Sitemap Formats
  FORMATS: {
    XML: 'application/xml',
    HTML: 'text/html',
    TEXT: 'text/plain',
    RSS: 'application/rss+xml',
    ATOM: 'application/atom+xml',
    JSON: 'application/json',
  } as const,

  // Sitemap Sizes
  SIZES: {
    MAX_URLS: 50000,
    MAX_FILE_SIZE: 10485760, // 10MB
    MAX_SITEMAP_INDEX: 50000,
    DEFAULT_BATCH_SIZE: 1000,
  } as const,

  // Sitemap Protocols
  PROTOCOLS: {
    HTTP: 'http',
    HTTPS: 'https',
    FTP: 'ftp',
    SFTP: 'sftp',
  } as const,

  // Sitemap Compression
  COMPRESSION: {
    NONE: 'none',
    GZIP: 'gzip',
    BROTLI: 'brotli',
    DEFLATE: 'deflate',
  } as const,

  // Sitemap Validation
  VALIDATION: {
    VALID: 'valid',
    INVALID: 'invalid',
    PARTIAL: 'partial',
    WARNING: 'warning',
    ERROR: 'error',
  } as const,

  // Sitemap Errors
  ERROR_TYPES: {
    FORMAT_ERROR: 'format_error',
    TOO_LARGE: 'too_large',
    TOO_MANY_URLS: 'too_many_urls',
    INVALID_URL: 'invalid_url',
    INVALID_PRIORITY: 'invalid_priority',
    INVALID_FREQUENCY: 'invalid_frequency',
    INVALID_DATE: 'invalid_date',
    DUPLICATE_URL: 'duplicate_url',
    MISSING_REQUIRED: 'missing_required',
    ENCODING_ERROR: 'encoding_error',
    PARSING_ERROR: 'parsing_error',
  } as const,

  // Sitemap Metrics
  METRICS: {
    TOTAL_URLS: 'total_urls',
    INDEXED_URLS: 'indexed_urls',
    PENDING_URLS: 'pending_urls',
    ERROR_URLS: 'error_urls',
    FILE_SIZE: 'file_size',
    GENERATION_TIME: 'generation_time',
    SUBMISSION_TIME: 'submission_time',
    LAST_MODIFIED: 'last_modified',
  } as const,

  // Sitemap Sources
  SOURCES: {
    DATABASE: 'database',
    FILESYSTEM: 'filesystem',
    API: 'api',
    DYNAMIC: 'dynamic',
    STATIC: 'static',
    MIXED: 'mixed',
  } as const,
} as const;

// Sitemap Types
export type SEOSitemapType = (typeof SEO_SITEMAP.TYPES)[keyof typeof SEO_SITEMAP.TYPES];

// Sitemap Status
export type SEOSitemapStatus = (typeof SEO_SITEMAP.STATUS)[keyof typeof SEO_SITEMAP.STATUS];

// Sitemap Priority
export type SEOSitemapPriority = (typeof SEO_SITEMAP.PRIORITY)[keyof typeof SEO_SITEMAP.PRIORITY];

// Change Frequency
export type SEOSitemapChangeFrequency =
  (typeof SEO_SITEMAP.CHANGE_FREQUENCY)[keyof typeof SEO_SITEMAP.CHANGE_FREQUENCY];

// Sitemap Formats
export type SEOSitemapFormat = (typeof SEO_SITEMAP.FORMATS)[keyof typeof SEO_SITEMAP.FORMATS];

// Sitemap Sizes
export type SEOSitemapSize = (typeof SEO_SITEMAP.SIZES)[keyof typeof SEO_SITEMAP.SIZES];

// Sitemap Protocols
export type SEOSitemapProtocol = (typeof SEO_SITEMAP.PROTOCOLS)[keyof typeof SEO_SITEMAP.PROTOCOLS];

// Sitemap Compression
export type SEOSitemapCompression =
  (typeof SEO_SITEMAP.COMPRESSION)[keyof typeof SEO_SITEMAP.COMPRESSION];

// Sitemap Validation
export type SEOSitemapValidation =
  (typeof SEO_SITEMAP.VALIDATION)[keyof typeof SEO_SITEMAP.VALIDATION];

// Sitemap Errors
export type SEOSitemapErrorType =
  (typeof SEO_SITEMAP.ERROR_TYPES)[keyof typeof SEO_SITEMAP.ERROR_TYPES];

// Sitemap Metrics
export type SEOSitemapMetric = (typeof SEO_SITEMAP.METRICS)[keyof typeof SEO_SITEMAP.METRICS];

// Sitemap Sources
export type SEOSitemapSource = (typeof SEO_SITEMAP.SOURCES)[keyof typeof SEO_SITEMAP.SOURCES];

// Utility Functions
export function getSEOSitemapTypeLabel(type: SEOSitemapType): string {
  const labels: Record<SEOSitemapType, string> = {
    [SEO_SITEMAP.TYPES.XML]: 'XML Sitemap',
    [SEO_SITEMAP.TYPES.HTML]: 'HTML Sitemap',
    [SEO_SITEMAP.TYPES.TEXT]: 'Text Sitemap',
    [SEO_SITEMAP.TYPES.RSS]: 'RSS Feed',
    [SEO_SITEMAP.TYPES.ATOM]: 'Atom Feed',
    [SEO_SITEMAP.TYPES.JSON]: 'JSON Sitemap',
    [SEO_SITEMAP.TYPES.VIDEO]: 'Video Sitemap',
    [SEO_SITEMAP.TYPES.IMAGE]: 'Image Sitemap',
    [SEO_SITEMAP.TYPES.NEWS]: 'News Sitemap',
    [SEO_SITEMAP.TYPES.MOBILE]: 'Mobile Sitemap',
    [SEO_SITEMAP.TYPES.INDEX]: 'Sitemap Index',
    [SEO_SITEMAP.TYPES.SITEMAP_INDEX]: 'Sitemap Index',
  };
  return labels[type] || 'Unknown Sitemap Type';
}

export function getSEOSitemapStatusLabel(status: SEOSitemapStatus): string {
  const labels: Record<SEOSitemapStatus, string> = {
    [SEO_SITEMAP.STATUS.PENDING]: 'Pending',
    [SEO_SITEMAP.STATUS.GENERATING]: 'Generating',
    [SEO_SITEMAP.STATUS.GENERATED]: 'Generated',
    [SEO_SITEMAP.STATUS.PUBLISHED]: 'Published',
    [SEO_SITEMAP.STATUS.SUBMITTED]: 'Submitted',
    [SEO_SITEMAP.STATUS.INDEXED]: 'Indexed',
    [SEO_SITEMAP.STATUS.PARTIAL]: 'Partial',
    [SEO_SITEMAP.STATUS.FAILED]: 'Failed',
    [SEO_SITEMAP.STATUS.UPDATING]: 'Updating',
    [SEO_SITEMAP.STATUS.OUTDATED]: 'Outdated',
    [SEO_SITEMAP.STATUS.ARCHIVED]: 'Archived',
    [SEO_SITEMAP.STATUS.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOSitemapPriorityLabel(priority: SEOSitemapPriority): string {
  const labels: Record<SEOSitemapPriority, string> = {
    [SEO_SITEMAP.PRIORITY.HIGHEST]: 'Highest (1.0)',
    [SEO_SITEMAP.PRIORITY.HIGH]: 'High (0.8)',
    [SEO_SITEMAP.PRIORITY.MEDIUM]: 'Medium (0.6)',
    [SEO_SITEMAP.PRIORITY.LOW]: 'Low (0.4)',
    [SEO_SITEMAP.PRIORITY.LOWEST]: 'Lowest (0.2)',
    [SEO_SITEMAP.PRIORITY.NONE]: 'None (0.0)',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getSEOSitemapChangeFrequencyLabel(frequency: SEOSitemapChangeFrequency): string {
  const labels: Record<SEOSitemapChangeFrequency, string> = {
    [SEO_SITEMAP.CHANGE_FREQUENCY.ALWAYS]: 'Always',
    [SEO_SITEMAP.CHANGE_FREQUENCY.HOURLY]: 'Hourly',
    [SEO_SITEMAP.CHANGE_FREQUENCY.DAILY]: 'Daily',
    [SEO_SITEMAP.CHANGE_FREQUENCY.WEEKLY]: 'Weekly',
    [SEO_SITEMAP.CHANGE_FREQUENCY.MONTHLY]: 'Monthly',
    [SEO_SITEMAP.CHANGE_FREQUENCY.YEARLY]: 'Yearly',
    [SEO_SITEMAP.CHANGE_FREQUENCY.NEVER]: 'Never',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function getSEOSitemapFormatLabel(format: SEOSitemapFormat): string {
  const labels: Record<SEOSitemapFormat, string> = {
    [SEO_SITEMAP.FORMATS.XML]: 'XML',
    [SEO_SITEMAP.FORMATS.HTML]: 'HTML',
    [SEO_SITEMAP.FORMATS.TEXT]: 'Text',
    [SEO_SITEMAP.FORMATS.RSS]: 'RSS',
    [SEO_SITEMAP.FORMATS.ATOM]: 'Atom',
    [SEO_SITEMAP.FORMATS.JSON]: 'JSON',
  };
  return labels[format] || 'Unknown Format';
}

export function getSEOSitemapCompressionLabel(compression: SEOSitemapCompression): string {
  const labels: Record<SEOSitemapCompression, string> = {
    [SEO_SITEMAP.COMPRESSION.NONE]: 'None',
    [SEO_SITEMAP.COMPRESSION.GZIP]: 'Gzip',
    [SEO_SITEMAP.COMPRESSION.BROTLI]: 'Brotli',
    [SEO_SITEMAP.COMPRESSION.DEFLATE]: 'Deflate',
  };
  return labels[compression] || 'Unknown Compression';
}

export function getSEOSitemapValidationLabel(validation: SEOSitemapValidation): string {
  const labels: Record<SEOSitemapValidation, string> = {
    [SEO_SITEMAP.VALIDATION.VALID]: 'Valid',
    [SEO_SITEMAP.VALIDATION.INVALID]: 'Invalid',
    [SEO_SITEMAP.VALIDATION.PARTIAL]: 'Partial',
    [SEO_SITEMAP.VALIDATION.WARNING]: 'Warning',
    [SEO_SITEMAP.VALIDATION.ERROR]: 'Error',
  };
  return labels[validation] || 'Unknown Validation Status';
}

export function getSEOSitemapErrorLabel(errorType: SEOSitemapErrorType): string {
  const labels: Record<SEOSitemapErrorType, string> = {
    [SEO_SITEMAP.ERROR_TYPES.FORMAT_ERROR]: 'Format Error',
    [SEO_SITEMAP.ERROR_TYPES.TOO_LARGE]: 'File Too Large',
    [SEO_SITEMAP.ERROR_TYPES.TOO_MANY_URLS]: 'Too Many URLs',
    [SEO_SITEMAP.ERROR_TYPES.INVALID_URL]: 'Invalid URL',
    [SEO_SITEMAP.ERROR_TYPES.INVALID_PRIORITY]: 'Invalid Priority',
    [SEO_SITEMAP.ERROR_TYPES.INVALID_FREQUENCY]: 'Invalid Change Frequency',
    [SEO_SITEMAP.ERROR_TYPES.INVALID_DATE]: 'Invalid Date',
    [SEO_SITEMAP.ERROR_TYPES.DUPLICATE_URL]: 'Duplicate URL',
    [SEO_SITEMAP.ERROR_TYPES.MISSING_REQUIRED]: 'Missing Required Element',
    [SEO_SITEMAP.ERROR_TYPES.ENCODING_ERROR]: 'Encoding Error',
    [SEO_SITEMAP.ERROR_TYPES.PARSING_ERROR]: 'Parsing Error',
  };
  return labels[errorType] || 'Unknown Error';
}

export function getSEOSitemapSourceLabel(source: SEOSitemapSource): string {
  const labels: Record<SEOSitemapSource, string> = {
    [SEO_SITEMAP.SOURCES.DATABASE]: 'Database',
    [SEO_SITEMAP.SOURCES.FILESYSTEM]: 'Filesystem',
    [SEO_SITEMAP.SOURCES.API]: 'API',
    [SEO_SITEMAP.SOURCES.DYNAMIC]: 'Dynamic',
    [SEO_SITEMAP.SOURCES.STATIC]: 'Static',
    [SEO_SITEMAP.SOURCES.MIXED]: 'Mixed',
  };
  return labels[source] || 'Unknown Source';
}

export function getSitemapStatusColor(status: SEOSitemapStatus): string {
  const colors: Record<SEOSitemapStatus, string> = {
    [SEO_SITEMAP.STATUS.PENDING]: '#9E9E9E',
    [SEO_SITEMAP.STATUS.GENERATING]: '#FFC107',
    [SEO_SITEMAP.STATUS.GENERATED]: '#2196F3',
    [SEO_SITEMAP.STATUS.PUBLISHED]: '#4CAF50',
    [SEO_SITEMAP.STATUS.SUBMITTED]: '#8BC34A',
    [SEO_SITEMAP.STATUS.INDEXED]: '#4CAF50',
    [SEO_SITEMAP.STATUS.PARTIAL]: '#FF9800',
    [SEO_SITEMAP.STATUS.FAILED]: '#F44336',
    [SEO_SITEMAP.STATUS.UPDATING]: '#00BCD4',
    [SEO_SITEMAP.STATUS.OUTDATED]: '#FF9800',
    [SEO_SITEMAP.STATUS.ARCHIVED]: '#9E9E9E',
    [SEO_SITEMAP.STATUS.DELETED]: '#D32F2F',
  };
  return colors[status] || '#9E9E9E';
}

export function isSitemapValid(status: SEOSitemapStatus): boolean {
  const validStatuses: SEOSitemapStatus[] = [
    SEO_SITEMAP.STATUS.GENERATED,
    SEO_SITEMAP.STATUS.PUBLISHED,
    SEO_SITEMAP.STATUS.SUBMITTED,
    SEO_SITEMAP.STATUS.INDEXED,
  ];
  return validStatuses.includes(status);
}

export function isSitemapActive(status: SEOSitemapStatus): boolean {
  const activeStatuses: SEOSitemapStatus[] = [
    SEO_SITEMAP.STATUS.GENERATING,
    SEO_SITEMAP.STATUS.GENERATED,
    SEO_SITEMAP.STATUS.PUBLISHED,
    SEO_SITEMAP.STATUS.SUBMITTED,
    SEO_SITEMAP.STATUS.INDEXED,
    SEO_SITEMAP.STATUS.UPDATING,
  ];
  return activeStatuses.includes(status);
}

export function getPriorityValue(priority: SEOSitemapPriority): number {
  const values: Record<SEOSitemapPriority, number> = {
    [SEO_SITEMAP.PRIORITY.HIGHEST]: 1.0,
    [SEO_SITEMAP.PRIORITY.HIGH]: 0.8,
    [SEO_SITEMAP.PRIORITY.MEDIUM]: 0.6,
    [SEO_SITEMAP.PRIORITY.LOW]: 0.4,
    [SEO_SITEMAP.PRIORITY.LOWEST]: 0.2,
    [SEO_SITEMAP.PRIORITY.NONE]: 0.0,
  };
  return values[priority] || 0.0;
}
