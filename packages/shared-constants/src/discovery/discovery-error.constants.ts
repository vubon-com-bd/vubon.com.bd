/**
 * Discovery Error Constants
 * Error definitions for discovery service
 */

export const DISCOVERY_ERROR = {
  // Discovery Error Types
  TYPES: {
    RECOMMENDATION: 'recommendation',
    PERSONALIZATION: 'personalization',
    TRENDING: 'trending',
    POPULAR: 'popular',
    RECENTLY_VIEWED: 'recently_viewed',
    FREQUENTLY_BOUGHT: 'frequently_bought',
    COMPLEMENTARY: 'complementary',
    SUBSTITUTE: 'substitute',
    UPSELLING: 'upselling',
    CROSS_SELLING: 'cross_selling',
    BUNDLE: 'bundle',
    TRENDING_NOW: 'trending_now',
    SEASONAL: 'seasonal',
    EDITORIAL: 'editorial',
    GENERAL: 'general',
  } as const,

  // Discovery Error Severity
  SEVERITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    INFO: 'info',
  } as const,

  // Discovery Error Codes
  CODES: {
    // Recommendation Errors
    RECOMMENDATION_GENERATION_FAILED: 'REC_001',
    RECOMMENDATION_REFRESH_FAILED: 'REC_002',
    RECOMMENDATION_NO_RESULTS: 'REC_003',

    // Personalization Errors
    PERSONALIZATION_FAILED: 'PER_001',
    PERSONALIZATION_INVALID_USER: 'PER_002',
    PERSONALIZATION_INVALID_CONTEXT: 'PER_003',

    // Trending Errors
    TRENDING_CALCULATION_FAILED: 'TRE_001',
    TRENDING_NO_DATA: 'TRE_002',

    // Popular Errors
    POPULAR_CALCULATION_FAILED: 'POP_001',
    POPULAR_NO_DATA: 'POP_002',

    // Recently Viewed Errors
    RECENTLY_VIEWED_TRACKING_FAILED: 'REV_001',
    RECENTLY_VIEWED_RETRIEVAL_FAILED: 'REV_002',

    // Frequently Bought Errors
    FREQUENTLY_BOUGHT_ANALYSIS_FAILED: 'FRB_001',
    FREQUENTLY_BOUGHT_NO_DATA: 'FRB_002',

    // Complementary Errors
    COMPLEMENTARY_ANALYSIS_FAILED: 'COM_001',
    COMPLEMENTARY_NO_ITEMS: 'COM_002',

    // Substitute Errors
    SUBSTITUTE_ANALYSIS_FAILED: 'SUB_001',
    SUBSTITUTE_NO_ITEMS: 'SUB_002',

    // Upselling Errors
    UPSELLING_ANALYSIS_FAILED: 'UPS_001',
    UPSELLING_NO_ITEMS: 'UPS_002',

    // Cross-Selling Errors
    CROSS_SELLING_ANALYSIS_FAILED: 'CRO_001',
    CROSS_SELLING_NO_ITEMS: 'CRO_002',

    // Bundle Errors
    BUNDLE_CREATION_FAILED: 'BUN_001',
    BUNDLE_INVALID_ITEMS: 'BUN_002',

    // Trending Now Errors
    TRENDING_NOW_UPDATE_FAILED: 'TRN_001',
    TRENDING_NOW_NO_DATA: 'TRN_002',

    // Seasonal Errors
    SEASONAL_INVALID_SEASON: 'SEA_001',
    SEASONAL_EXPIRED: 'SEA_002',

    // Editorial Errors
    EDITORIAL_PUBLISH_FAILED: 'EDI_001',
    EDITORIAL_INVALID_TYPE: 'EDI_002',

    // General Errors
    INVALID_CONFIG: 'GEN_001',
    INVALID_REQUEST: 'GEN_002',
    DATA_ERROR: 'GEN_003',
    CACHE_ERROR: 'GEN_004',
    TIMEOUT: 'GEN_005',
    PERMISSION_DENIED: 'GEN_006',
    RATE_LIMIT: 'GEN_007',
  } as const,

  // Discovery Error Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'general',
    DEFAULT_SEVERITY: 'medium',
    DEFAULT_CODE: 'GEN_001',
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_RETRY_DELAY: 1000,
    DEFAULT_TIMEOUT: 30000,
    MAX_RETRY_ATTEMPTS: 5,
    MAX_RETRY_DELAY: 5000,
  } as const,
} as const;

// Discovery Error Types
export type DiscoveryErrorType = (typeof DISCOVERY_ERROR.TYPES)[keyof typeof DISCOVERY_ERROR.TYPES];

// Discovery Error Severity
export type DiscoveryErrorSeverity =
  (typeof DISCOVERY_ERROR.SEVERITY)[keyof typeof DISCOVERY_ERROR.SEVERITY];

// Discovery Error Codes
export type DiscoveryErrorCode = (typeof DISCOVERY_ERROR.CODES)[keyof typeof DISCOVERY_ERROR.CODES];

// Discovery Error Defaults
export type DiscoveryErrorDefault =
  (typeof DISCOVERY_ERROR.DEFAULTS)[keyof typeof DISCOVERY_ERROR.DEFAULTS];

// Utility Functions
export function discoveryErrorGetTypeLabel(type: DiscoveryErrorType): string {
  const labels: Record<DiscoveryErrorType, string> = {
    [DISCOVERY_ERROR.TYPES.RECOMMENDATION]: 'Recommendation',
    [DISCOVERY_ERROR.TYPES.PERSONALIZATION]: 'Personalization',
    [DISCOVERY_ERROR.TYPES.TRENDING]: 'Trending',
    [DISCOVERY_ERROR.TYPES.POPULAR]: 'Popular',
    [DISCOVERY_ERROR.TYPES.RECENTLY_VIEWED]: 'Recently Viewed',
    [DISCOVERY_ERROR.TYPES.FREQUENTLY_BOUGHT]: 'Frequently Bought',
    [DISCOVERY_ERROR.TYPES.COMPLEMENTARY]: 'Complementary',
    [DISCOVERY_ERROR.TYPES.SUBSTITUTE]: 'Substitute',
    [DISCOVERY_ERROR.TYPES.UPSELLING]: 'Upselling',
    [DISCOVERY_ERROR.TYPES.CROSS_SELLING]: 'Cross-Selling',
    [DISCOVERY_ERROR.TYPES.BUNDLE]: 'Bundle',
    [DISCOVERY_ERROR.TYPES.TRENDING_NOW]: 'Trending Now',
    [DISCOVERY_ERROR.TYPES.SEASONAL]: 'Seasonal',
    [DISCOVERY_ERROR.TYPES.EDITORIAL]: 'Editorial',
    [DISCOVERY_ERROR.TYPES.GENERAL]: 'General',
  };
  return labels[type] || 'Unknown Error Type';
}

export function discoveryErrorGetSeverityLabel(severity: DiscoveryErrorSeverity): string {
  const labels: Record<DiscoveryErrorSeverity, string> = {
    [DISCOVERY_ERROR.SEVERITY.CRITICAL]: 'Critical',
    [DISCOVERY_ERROR.SEVERITY.HIGH]: 'High',
    [DISCOVERY_ERROR.SEVERITY.MEDIUM]: 'Medium',
    [DISCOVERY_ERROR.SEVERITY.LOW]: 'Low',
    [DISCOVERY_ERROR.SEVERITY.INFO]: 'Info',
  };
  return labels[severity] || 'Unknown Severity';
}

export function discoveryErrorGetCodeLabel(code: DiscoveryErrorCode): string {
  const labels: Record<DiscoveryErrorCode, string> = {
    // Recommendation
    [DISCOVERY_ERROR.CODES.RECOMMENDATION_GENERATION_FAILED]: 'Recommendation Generation Failed',
    [DISCOVERY_ERROR.CODES.RECOMMENDATION_REFRESH_FAILED]: 'Recommendation Refresh Failed',
    [DISCOVERY_ERROR.CODES.RECOMMENDATION_NO_RESULTS]: 'No Recommendations',

    // Personalization
    [DISCOVERY_ERROR.CODES.PERSONALIZATION_FAILED]: 'Personalization Failed',
    [DISCOVERY_ERROR.CODES.PERSONALIZATION_INVALID_USER]: 'Invalid User',
    [DISCOVERY_ERROR.CODES.PERSONALIZATION_INVALID_CONTEXT]: 'Invalid Context',

    // Trending
    [DISCOVERY_ERROR.CODES.TRENDING_CALCULATION_FAILED]: 'Trending Calculation Failed',
    [DISCOVERY_ERROR.CODES.TRENDING_NO_DATA]: 'No Trending Data',

    // Popular
    [DISCOVERY_ERROR.CODES.POPULAR_CALCULATION_FAILED]: 'Popular Calculation Failed',
    [DISCOVERY_ERROR.CODES.POPULAR_NO_DATA]: 'No Popular Data',

    // Recently Viewed
    [DISCOVERY_ERROR.CODES.RECENTLY_VIEWED_TRACKING_FAILED]: 'Tracking Failed',
    [DISCOVERY_ERROR.CODES.RECENTLY_VIEWED_RETRIEVAL_FAILED]: 'Retrieval Failed',

    // Frequently Bought
    [DISCOVERY_ERROR.CODES.FREQUENTLY_BOUGHT_ANALYSIS_FAILED]: 'Analysis Failed',
    [DISCOVERY_ERROR.CODES.FREQUENTLY_BOUGHT_NO_DATA]: 'No Data',

    // Complementary
    [DISCOVERY_ERROR.CODES.COMPLEMENTARY_ANALYSIS_FAILED]: 'Analysis Failed',
    [DISCOVERY_ERROR.CODES.COMPLEMENTARY_NO_ITEMS]: 'No Complementary Items',

    // Substitute
    [DISCOVERY_ERROR.CODES.SUBSTITUTE_ANALYSIS_FAILED]: 'Analysis Failed',
    [DISCOVERY_ERROR.CODES.SUBSTITUTE_NO_ITEMS]: 'No Substitutes',

    // Upselling
    [DISCOVERY_ERROR.CODES.UPSELLING_ANALYSIS_FAILED]: 'Analysis Failed',
    [DISCOVERY_ERROR.CODES.UPSELLING_NO_ITEMS]: 'No Upsell Items',

    // Cross-Selling
    [DISCOVERY_ERROR.CODES.CROSS_SELLING_ANALYSIS_FAILED]: 'Analysis Failed',
    [DISCOVERY_ERROR.CODES.CROSS_SELLING_NO_ITEMS]: 'No Cross-Sell Items',

    // Bundle
    [DISCOVERY_ERROR.CODES.BUNDLE_CREATION_FAILED]: 'Bundle Creation Failed',
    [DISCOVERY_ERROR.CODES.BUNDLE_INVALID_ITEMS]: 'Invalid Items',

    // Trending Now
    [DISCOVERY_ERROR.CODES.TRENDING_NOW_UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_ERROR.CODES.TRENDING_NOW_NO_DATA]: 'No Data',

    // Seasonal
    [DISCOVERY_ERROR.CODES.SEASONAL_INVALID_SEASON]: 'Invalid Season',
    [DISCOVERY_ERROR.CODES.SEASONAL_EXPIRED]: 'Season Expired',

    // Editorial
    [DISCOVERY_ERROR.CODES.EDITORIAL_PUBLISH_FAILED]: 'Publish Failed',
    [DISCOVERY_ERROR.CODES.EDITORIAL_INVALID_TYPE]: 'Invalid Type',

    // General
    [DISCOVERY_ERROR.CODES.INVALID_CONFIG]: 'Invalid Config',
    [DISCOVERY_ERROR.CODES.INVALID_REQUEST]: 'Invalid Request',
    [DISCOVERY_ERROR.CODES.DATA_ERROR]: 'Data Error',
    [DISCOVERY_ERROR.CODES.CACHE_ERROR]: 'Cache Error',
    [DISCOVERY_ERROR.CODES.TIMEOUT]: 'Timeout',
    [DISCOVERY_ERROR.CODES.PERMISSION_DENIED]: 'Permission Denied',
    [DISCOVERY_ERROR.CODES.RATE_LIMIT]: 'Rate Limit Exceeded',
  };
  return labels[code] || 'Unknown Error Code';
}

export function discoveryErrorIsRetryable(code: DiscoveryErrorCode): boolean {
  const retryableCodes: DiscoveryErrorCode[] = [
    DISCOVERY_ERROR.CODES.TIMEOUT,
    DISCOVERY_ERROR.CODES.RATE_LIMIT,
    DISCOVERY_ERROR.CODES.CACHE_ERROR,
    DISCOVERY_ERROR.CODES.RECOMMENDATION_REFRESH_FAILED,
    DISCOVERY_ERROR.CODES.TRENDING_CALCULATION_FAILED,
    DISCOVERY_ERROR.CODES.POPULAR_CALCULATION_FAILED,
    DISCOVERY_ERROR.CODES.TRENDING_NOW_UPDATE_FAILED,
  ];
  return retryableCodes.includes(code);
}

export function discoveryErrorGetDefaultRetryAttempts(): number {
  return DISCOVERY_ERROR.DEFAULTS.DEFAULT_RETRY_ATTEMPTS;
}

export function discoveryErrorGetDefaultTimeout(): number {
  return DISCOVERY_ERROR.DEFAULTS.DEFAULT_TIMEOUT;
}
