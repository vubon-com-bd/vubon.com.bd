/**
 * SEO Error Constants
 * Error codes and messages for SEO operations
 */

export const SEO_ERROR = {
  // General Errors (1000-1099)
  GENERAL: {
    UNKNOWN_ERROR: {
      code: 'SEO-1000',
      message: 'An unknown error occurred',
      description: 'An unexpected error occurred while processing the request',
    },
    INVALID_REQUEST: {
      code: 'SEO-1001',
      message: 'Invalid request',
      description: 'The request parameters are invalid',
    },
    UNAUTHORIZED: {
      code: 'SEO-1002',
      message: 'Unauthorized access',
      description: 'You are not authorized to perform this action',
    },
    FORBIDDEN: {
      code: 'SEO-1003',
      message: 'Forbidden',
      description: 'You do not have permission to access this resource',
    },
    NOT_FOUND: {
      code: 'SEO-1004',
      message: 'Resource not found',
      description: 'The requested resource could not be found',
    },
    TIMEOUT: {
      code: 'SEO-1005',
      message: 'Request timeout',
      description: 'The request timed out while processing',
    },
    RATE_LIMIT: {
      code: 'SEO-1006',
      message: 'Rate limit exceeded',
      description: 'Too many requests. Please try again later',
    },
    SERVICE_UNAVAILABLE: {
      code: 'SEO-1007',
      message: 'Service unavailable',
      description: 'The service is temporarily unavailable',
    },
  } as const,

  // Validation Errors (1100-1199)
  VALIDATION: {
    MISSING_REQUIRED: {
      code: 'SEO-1100',
      message: 'Missing required field',
      description: 'A required field is missing from the request',
    },
    INVALID_DATA: {
      code: 'SEO-1101',
      message: 'Invalid data format',
      description: 'The data format is invalid',
    },
    INVALID_URL: {
      code: 'SEO-1102',
      message: 'Invalid URL',
      description: 'The provided URL is invalid or malformed',
    },
    INVALID_EMAIL: {
      code: 'SEO-1103',
      message: 'Invalid email address',
      description: 'The provided email address is invalid',
    },
    INVALID_PHONE: {
      code: 'SEO-1104',
      message: 'Invalid phone number',
      description: 'The provided phone number is invalid',
    },
    INVALID_DATE: {
      code: 'SEO-1105',
      message: 'Invalid date',
      description: 'The provided date is invalid',
    },
    INVALID_KEYWORD: {
      code: 'SEO-1106',
      message: 'Invalid keyword',
      description: 'The keyword contains invalid characters or format',
    },
    KEYWORD_TOO_SHORT: {
      code: 'SEO-1107',
      message: 'Keyword too short',
      description: 'The keyword must be at least 2 characters long',
    },
    KEYWORD_TOO_LONG: {
      code: 'SEO-1108',
      message: 'Keyword too long',
      description: 'The keyword exceeds the maximum length limit',
    },
    DUPLICATE_KEYWORD: {
      code: 'SEO-1109',
      message: 'Duplicate keyword',
      description: 'This keyword already exists in the database',
    },
    INVALID_PRIORITY: {
      code: 'SEO-1110',
      message: 'Invalid priority',
      description: 'The priority value must be between 0 and 1',
    },
    INVALID_FREQUENCY: {
      code: 'SEO-1111',
      message: 'Invalid change frequency',
      description: 'The change frequency value is invalid',
    },
  } as const,

  // Database Errors (1200-1299)
  DATABASE: {
    CONNECTION_ERROR: {
      code: 'SEO-1200',
      message: 'Database connection error',
      description: 'Failed to connect to the database',
    },
    QUERY_ERROR: {
      code: 'SEO-1201',
      message: 'Database query error',
      description: 'An error occurred while executing the database query',
    },
    RECORD_NOT_FOUND: {
      code: 'SEO-1202',
      message: 'Record not found',
      description: 'The requested record could not be found in the database',
    },
    DUPLICATE_ENTRY: {
      code: 'SEO-1203',
      message: 'Duplicate entry',
      description: 'A record with this key already exists',
    },
    FOREIGN_KEY_VIOLATION: {
      code: 'SEO-1204',
      message: 'Foreign key violation',
      description: 'The operation violates a foreign key constraint',
    },
    CONSTRAINT_VIOLATION: {
      code: 'SEO-1205',
      message: 'Constraint violation',
      description: 'The operation violates a database constraint',
    },
  } as const,

  // SEO Analysis Errors (1300-1399)
  ANALYSIS: {
    ANALYSIS_FAILED: {
      code: 'SEO-1300',
      message: 'Analysis failed',
      description: 'The SEO analysis could not be completed',
    },
    NO_DATA: {
      code: 'SEO-1301',
      message: 'No data available',
      description: 'No data is available for analysis',
    },
    INSUFFICIENT_DATA: {
      code: 'SEO-1302',
      message: 'Insufficient data',
      description: 'The available data is insufficient for analysis',
    },
    DATA_CORRUPTED: {
      code: 'SEO-1303',
      message: 'Data corrupted',
      description: 'The data is corrupted and cannot be processed',
    },
    ANALYSIS_TIMEOUT: {
      code: 'SEO-1304',
      message: 'Analysis timeout',
      description: 'The analysis took too long and timed out',
    },
    PARSE_ERROR: {
      code: 'SEO-1305',
      message: 'Parse error',
      description: 'Failed to parse the data for analysis',
    },
  } as const,

  // Keyword Errors (1400-1499)
  KEYWORD: {
    KEYWORD_NOT_FOUND: {
      code: 'SEO-1400',
      message: 'Keyword not found',
      description: 'The specified keyword could not be found',
    },
    KEYWORD_ALREADY_EXISTS: {
      code: 'SEO-1401',
      message: 'Keyword already exists',
      description: 'A keyword with this name already exists',
    },
    KEYWORD_GROUP_NOT_FOUND: {
      code: 'SEO-1402',
      message: 'Keyword group not found',
      description: 'The specified keyword group could not be found',
    },
    INVALID_KEYWORD_GROUP: {
      code: 'SEO-1403',
      message: 'Invalid keyword group',
      description: 'The keyword group name is invalid',
    },
    KEYWORD_DATA_MISSING: {
      code: 'SEO-1404',
      message: 'Keyword data missing',
      description: 'Required keyword data is missing',
    },
  } as const,

  // Content Errors (1500-1599)
  CONTENT: {
    CONTENT_NOT_FOUND: {
      code: 'SEO-1500',
      message: 'Content not found',
      description: 'The specified content could not be found',
    },
    CONTENT_ALREADY_EXISTS: {
      code: 'SEO-1501',
      message: 'Content already exists',
      description: 'Content with this identifier already exists',
    },
    INVALID_CONTENT: {
      code: 'SEO-1502',
      message: 'Invalid content',
      description: 'The content is invalid or malformed',
    },
    CONTENT_TOO_SHORT: {
      code: 'SEO-1503',
      message: 'Content too short',
      description: 'The content is too short for SEO purposes',
    },
    CONTENT_TOO_LONG: {
      code: 'SEO-1504',
      message: 'Content too long',
      description: 'The content exceeds the maximum length limit',
    },
    DUPLICATE_CONTENT: {
      code: 'SEO-1505',
      message: 'Duplicate content',
      description: 'This content already exists in the database',
    },
  } as const,

  // Crawl Errors (1600-1699)
  CRAWL: {
    CRAWL_FAILED: {
      code: 'SEO-1600',
      message: 'Crawl failed',
      description: 'The crawl operation could not be completed',
    },
    CRAWL_TIMEOUT: {
      code: 'SEO-1601',
      message: 'Crawl timeout',
      description: 'The crawl operation timed out',
    },
    CRAWL_BLOCKED: {
      code: 'SEO-1602',
      message: 'Crawl blocked',
      description: 'The crawl was blocked by the target server',
    },
    ROBOTS_DISALLOWED: {
      code: 'SEO-1603',
      message: 'Robots disallowed',
      description: 'The robots.txt file disallows crawling',
    },
    INVALID_SITEMAP: {
      code: 'SEO-1604',
      message: 'Invalid sitemap',
      description: 'The sitemap is invalid or malformed',
    },
    SITEMAP_NOT_FOUND: {
      code: 'SEO-1605',
      message: 'Sitemap not found',
      description: 'The sitemap could not be found at the specified URL',
    },
  } as const,

  // Index Errors (1700-1799)
  INDEX: {
    INDEX_FAILED: {
      code: 'SEO-1700',
      message: 'Index failed',
      description: 'The indexing operation could not be completed',
    },
    INDEX_TIMEOUT: {
      code: 'SEO-1701',
      message: 'Index timeout',
      description: 'The indexing operation timed out',
    },
    INDEX_NOT_FOUND: {
      code: 'SEO-1702',
      message: 'Index not found',
      description: 'The specified index could not be found',
    },
    INDEX_ALREADY_EXISTS: {
      code: 'SEO-1703',
      message: 'Index already exists',
      description: 'An index with this name already exists',
    },
    REINDEX_FAILED: {
      code: 'SEO-1704',
      message: 'Reindex failed',
      description: 'The reindexing operation could not be completed',
    },
  } as const,

  // Backlink Errors (1800-1899)
  BACKLINK: {
    BACKLINK_NOT_FOUND: {
      code: 'SEO-1800',
      message: 'Backlink not found',
      description: 'The specified backlink could not be found',
    },
    INVALID_BACKLINK: {
      code: 'SEO-1801',
      message: 'Invalid backlink',
      description: 'The backlink data is invalid',
    },
    BACKLINK_VERIFICATION_FAILED: {
      code: 'SEO-1802',
      message: 'Backlink verification failed',
      description: 'Failed to verify the backlink existence',
    },
    BACKLINK_DATA_MISSING: {
      code: 'SEO-1803',
      message: 'Backlink data missing',
      description: 'Required backlink data is missing',
    },
  } as const,

  // Report Errors (1900-1999)
  REPORT: {
    REPORT_GENERATION_FAILED: {
      code: 'SEO-1900',
      message: 'Report generation failed',
      description: 'Failed to generate the report',
    },
    REPORT_NOT_FOUND: {
      code: 'SEO-1901',
      message: 'Report not found',
      description: 'The specified report could not be found',
    },
    REPORT_TEMPLATE_ERROR: {
      code: 'SEO-1902',
      message: 'Report template error',
      description: 'An error occurred with the report template',
    },
    REPORT_DELIVERY_FAILED: {
      code: 'SEO-1903',
      message: 'Report delivery failed',
      description: 'Failed to deliver the report',
    },
    REPORT_SCHEDULE_ERROR: {
      code: 'SEO-1904',
      message: 'Report schedule error',
      description: 'An error occurred with the report schedule',
    },
    REPORT_SIZE_LIMIT: {
      code: 'SEO-1905',
      message: 'Report size limit exceeded',
      description: 'The report exceeds the maximum size limit',
    },
  } as const,

  // API Errors (2000-2099)
  API: {
    API_CONNECTION_ERROR: {
      code: 'SEO-2000',
      message: 'API connection error',
      description: 'Failed to connect to the external API',
    },
    API_AUTH_ERROR: {
      code: 'SEO-2001',
      message: 'API authentication error',
      description: 'Authentication failed for the external API',
    },
    API_RESPONSE_ERROR: {
      code: 'SEO-2002',
      message: 'API response error',
      description: 'The API returned an error response',
    },
    API_RATE_LIMIT: {
      code: 'SEO-2003',
      message: 'API rate limit exceeded',
      description: 'The API rate limit has been exceeded',
    },
    API_TIMEOUT: {
      code: 'SEO-2004',
      message: 'API timeout',
      description: 'The API request timed out',
    },
    API_INVALID_RESPONSE: {
      code: 'SEO-2005',
      message: 'Invalid API response',
      description: 'The API response is invalid or malformed',
    },
  } as const,

  // Integration Errors (2100-2199)
  INTEGRATION: {
    INTEGRATION_ERROR: {
      code: 'SEO-2100',
      message: 'Integration error',
      description: 'An error occurred with the external integration',
    },
    GOOGLE_ANALYTICS_ERROR: {
      code: 'SEO-2101',
      message: 'Google Analytics error',
      description: 'An error occurred with Google Analytics integration',
    },
    GOOGLE_SEARCH_CONSOLE_ERROR: {
      code: 'SEO-2102',
      message: 'Google Search Console error',
      description: 'An error occurred with Google Search Console integration',
    },
    SEMRUSH_ERROR: {
      code: 'SEO-2103',
      message: 'SEMrush error',
      description: 'An error occurred with SEMrush integration',
    },
    AHREFS_ERROR: {
      code: 'SEO-2104',
      message: 'Ahrefs error',
      description: 'An error occurred with Ahrefs integration',
    },
    MOZ_ERROR: {
      code: 'SEO-2105',
      message: 'Moz error',
      description: 'An error occurred with Moz integration',
    },
  } as const,

  // File System Errors (2200-2299)
  FILESYSTEM: {
    FILE_NOT_FOUND: {
      code: 'SEO-2200',
      message: 'File not found',
      description: 'The specified file could not be found',
    },
    FILE_READ_ERROR: {
      code: 'SEO-2201',
      message: 'File read error',
      description: 'Failed to read the file',
    },
    FILE_WRITE_ERROR: {
      code: 'SEO-2202',
      message: 'File write error',
      description: 'Failed to write to the file',
    },
    FILE_DELETE_ERROR: {
      code: 'SEO-2203',
      message: 'File delete error',
      description: 'Failed to delete the file',
    },
    PERMISSION_DENIED: {
      code: 'SEO-2204',
      message: 'Permission denied',
      description: 'Permission denied for the file operation',
    },
    STORAGE_FULL: {
      code: 'SEO-2205',
      message: 'Storage full',
      description: 'The storage is full and cannot accept new files',
    },
  } as const,

  // Cache Errors (2300-2399)
  CACHE: {
    CACHE_WRITE_ERROR: {
      code: 'SEO-2300',
      message: 'Cache write error',
      description: 'Failed to write to the cache',
    },
    CACHE_READ_ERROR: {
      code: 'SEO-2301',
      message: 'Cache read error',
      description: 'Failed to read from the cache',
    },
    CACHE_DELETE_ERROR: {
      code: 'SEO-2302',
      message: 'Cache delete error',
      description: 'Failed to delete from the cache',
    },
    CACHE_EXPIRED: {
      code: 'SEO-2303',
      message: 'Cache expired',
      description: 'The cached data has expired',
    },
    CACHE_CORRUPTED: {
      code: 'SEO-2304',
      message: 'Cache corrupted',
      description: 'The cached data is corrupted',
    },
  } as const,
} as const;

// Error Types
export type SEOErrorCode =
  | (typeof SEO_ERROR.GENERAL)[keyof typeof SEO_ERROR.GENERAL]['code']
  | (typeof SEO_ERROR.VALIDATION)[keyof typeof SEO_ERROR.VALIDATION]['code']
  | (typeof SEO_ERROR.DATABASE)[keyof typeof SEO_ERROR.DATABASE]['code']
  | (typeof SEO_ERROR.ANALYSIS)[keyof typeof SEO_ERROR.ANALYSIS]['code']
  | (typeof SEO_ERROR.KEYWORD)[keyof typeof SEO_ERROR.KEYWORD]['code']
  | (typeof SEO_ERROR.CONTENT)[keyof typeof SEO_ERROR.CONTENT]['code']
  | (typeof SEO_ERROR.CRAWL)[keyof typeof SEO_ERROR.CRAWL]['code']
  | (typeof SEO_ERROR.INDEX)[keyof typeof SEO_ERROR.INDEX]['code']
  | (typeof SEO_ERROR.BACKLINK)[keyof typeof SEO_ERROR.BACKLINK]['code']
  | (typeof SEO_ERROR.REPORT)[keyof typeof SEO_ERROR.REPORT]['code']
  | (typeof SEO_ERROR.API)[keyof typeof SEO_ERROR.API]['code']
  | (typeof SEO_ERROR.INTEGRATION)[keyof typeof SEO_ERROR.INTEGRATION]['code']
  | (typeof SEO_ERROR.FILESYSTEM)[keyof typeof SEO_ERROR.FILESYSTEM]['code']
  | (typeof SEO_ERROR.CACHE)[keyof typeof SEO_ERROR.CACHE]['code'];

export type SEOErrorMessage = {
  code: string;
  message: string;
  description: string;
};

// Utility Functions
export function getSEOError(code: SEOErrorCode): SEOErrorMessage | null {
  const allErrors = {
    ...SEO_ERROR.GENERAL,
    ...SEO_ERROR.VALIDATION,
    ...SEO_ERROR.DATABASE,
    ...SEO_ERROR.ANALYSIS,
    ...SEO_ERROR.KEYWORD,
    ...SEO_ERROR.CONTENT,
    ...SEO_ERROR.CRAWL,
    ...SEO_ERROR.INDEX,
    ...SEO_ERROR.BACKLINK,
    ...SEO_ERROR.REPORT,
    ...SEO_ERROR.API,
    ...SEO_ERROR.INTEGRATION,
    ...SEO_ERROR.FILESYSTEM,
    ...SEO_ERROR.CACHE,
  };

  for (const key in allErrors) {
    const error = allErrors[key as keyof typeof allErrors];
    if (error.code === code) {
      return error;
    }
  }
  return null;
}

export function getSEOMessage(code: SEOErrorCode): string {
  const error = getSEOError(code);
  return error ? error.message : 'Unknown error occurred';
}

export function getSEODescription(code: SEOErrorCode): string {
  const error = getSEOError(code);
  return error ? error.description : 'No description available';
}

export function isSEOError(code: string): code is SEOErrorCode {
  const allCodes = {
    ...SEO_ERROR.GENERAL,
    ...SEO_ERROR.VALIDATION,
    ...SEO_ERROR.DATABASE,
    ...SEO_ERROR.ANALYSIS,
    ...SEO_ERROR.KEYWORD,
    ...SEO_ERROR.CONTENT,
    ...SEO_ERROR.CRAWL,
    ...SEO_ERROR.INDEX,
    ...SEO_ERROR.BACKLINK,
    ...SEO_ERROR.REPORT,
    ...SEO_ERROR.API,
    ...SEO_ERROR.INTEGRATION,
    ...SEO_ERROR.FILESYSTEM,
    ...SEO_ERROR.CACHE,
  };

  for (const key in allCodes) {
    const error = allCodes[key as keyof typeof allCodes];
    if (error.code === code) {
      return true;
    }
  }
  return false;
}

export function getSEOErrorCategory(code: SEOErrorCode): string {
  if (code.startsWith('SEO-10')) return 'General';
  if (code.startsWith('SEO-11')) return 'Validation';
  if (code.startsWith('SEO-12')) return 'Database';
  if (code.startsWith('SEO-13')) return 'Analysis';
  if (code.startsWith('SEO-14')) return 'Keyword';
  if (code.startsWith('SEO-15')) return 'Content';
  if (code.startsWith('SEO-16')) return 'Crawl';
  if (code.startsWith('SEO-17')) return 'Index';
  if (code.startsWith('SEO-18')) return 'Backlink';
  if (code.startsWith('SEO-19')) return 'Report';
  if (code.startsWith('SEO-20')) return 'API';
  if (code.startsWith('SEO-21')) return 'Integration';
  if (code.startsWith('SEO-22')) return 'Filesystem';
  if (code.startsWith('SEO-23')) return 'Cache';
  return 'Unknown';
}
