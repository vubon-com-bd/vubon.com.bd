/**
 * Marketing Error Constants
 * Error definitions for marketing modules
 */

export const MARKETINGERROR = {
  // Error Types
  TYPES: {
    // General Errors
    INTERNAL_ERROR: 'internal_error',
    VALIDATION_ERROR: 'validation_error',
    PERMISSION_DENIED: 'permission_denied',
    NOT_FOUND: 'not_found',
    DUPLICATE: 'duplicate',
    CONFLICT: 'conflict',
    RATE_LIMIT: 'rate_limit',
    TIMEOUT: 'timeout',
    UNAVAILABLE: 'unavailable',
    AUTHENTICATION: 'authentication',

    // Campaign Errors
    CAMPAIGN_NOT_FOUND: 'campaign_not_found',
    CAMPAIGN_EXPIRED: 'campaign_expired',
    CAMPAIGN_INACTIVE: 'campaign_inactive',
    CAMPAIGN_BUDGET_EXCEEDED: 'campaign_budget_exceeded',
    CAMPAIGN_SCHEDULE_CONFLICT: 'campaign_schedule_conflict',
    CAMPAIGN_DUPLICATE: 'campaign_duplicate',

    // Promotion Errors
    PROMOTION_NOT_FOUND: 'promotion_not_found',
    PROMOTION_EXPIRED: 'promotion_expired',
    PROMOTION_INACTIVE: 'promotion_inactive',
    PROMOTION_STACKING_NOT_ALLOWED: 'promotion_stacking_not_allowed',
    PROMOTION_LIMIT_EXCEEDED: 'promotion_limit_exceeded',

    // Email Errors
    EMAIL_SEND_FAILED: 'email_send_failed',
    EMAIL_TEMPLATE_NOT_FOUND: 'email_template_not_found',
    EMAIL_INVALID_RECIPIENT: 'email_invalid_recipient',
    EMAIL_RATE_LIMIT: 'email_rate_limit',
    EMAIL_BOUNCE: 'email_bounce',
    EMAIL_SPAM: 'email_spam',

    // SMS Errors
    SMS_SEND_FAILED: 'sms_send_failed',
    SMS_INVALID_NUMBER: 'sms_invalid_number',
    SMS_RATE_LIMIT: 'sms_rate_limit',
    SMS_BLOCKED: 'sms_blocked',
    SMS_OPT_OUT: 'sms_opt_out',

    // Social Media Errors
    SOCIAL_POST_FAILED: 'social_post_failed',
    SOCIAL_API_ERROR: 'social_api_error',
    SOCIAL_AUTH_FAILED: 'social_auth_failed',
    SOCIAL_RATE_LIMIT: 'social_rate_limit',
    SOCIAL_CONTENT_REJECTED: 'social_content_rejected',

    // Analytics Errors
    ANALYTICS_DATA_NOT_FOUND: 'analytics_data_not_found',
    ANALYTICS_QUERY_FAILED: 'analytics_query_failed',
    ANALYTICS_EXPORT_FAILED: 'analytics_export_failed',
    ANALYTICS_INVALID_DATE_RANGE: 'analytics_invalid_date_range',

    // Automation Errors
    AUTOMATION_EXECUTION_FAILED: 'automation_execution_failed',
    AUTOMATION_TRIGGER_FAILED: 'automation_trigger_failed',
    AUTOMATION_ACTION_FAILED: 'automation_action_failed',
    AUTOMATION_TIMEOUT: 'automation_timeout',
    AUTOMATION_DEPENDENCY_FAILED: 'automation_dependency_failed',

    // Lead Generation Errors
    LEAD_ALREADY_EXISTS: 'lead_already_exists',
    LEAD_INVALID_DATA: 'lead_invalid_data',
    LEAD_SCORING_FAILED: 'lead_scoring_failed',
    LEAD_DUPLICATE: 'lead_duplicate',

    // Affiliate Errors
    AFFILIATE_NOT_FOUND: 'affiliate_not_found',
    AFFILIATE_INACTIVE: 'affiliate_inactive',
    AFFILIATE_COMMISSION_FAILED: 'affiliate_commission_failed',
    AFFILIATE_PAYOUT_FAILED: 'affiliate_payout_failed',

    // Referral Errors
    REFERRAL_NOT_FOUND: 'referral_not_found',
    REFERRAL_EXPIRED: 'referral_expired',
    REFERRAL_INVALID: 'referral_invalid',
    REFERRAL_DUPLICATE: 'referral_duplicate',

    // Loyalty Errors
    LOYALTY_POINTS_INSUFFICIENT: 'loyalty_points_insufficient',
    LOYALTY_TIER_NOT_FOUND: 'loyalty_tier_not_found',
    LOYALTY_REWARD_NOT_FOUND: 'loyalty_reward_not_found',
    LOYALTY_REDEMPTION_FAILED: 'loyalty_redemption_failed',

    // Integration Errors
    INTEGRATION_NOT_FOUND: 'integration_not_found',
    INTEGRATION_AUTH_FAILED: 'integration_auth_failed',
    INTEGRATION_API_ERROR: 'integration_api_error',
    INTEGRATION_WEBHOOK_FAILED: 'integration_webhook_failed',
    INTEGRATION_SYNC_FAILED: 'integration_sync_failed',

    // Content Errors
    CONTENT_NOT_FOUND: 'content_not_found',
    CONTENT_INVALID: 'content_invalid',
    CONTENT_PUBLISH_FAILED: 'content_publish_failed',
    CONTENT_APPROVAL_FAILED: 'content_approval_failed',

    // SEO Errors
    SEO_KEYWORD_NOT_FOUND: 'seo_keyword_not_found',
    SEO_SITEMAP_FAILED: 'seo_sitemap_failed',
    SEO_INDEXING_FAILED: 'seo_indexing_failed',
    SEO_ANALYSIS_FAILED: 'seo_analysis_failed',
  } as const,

  // Error Severities
  SEVERITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Error Categories
  CATEGORIES: {
    SYSTEM: 'system',
    BUSINESS: 'business',
    VALIDATION: 'validation',
    INTEGRATION: 'integration',
    PERMISSION: 'permission',
    DATA: 'data',
    NETWORK: 'network',
  } as const,

  // Error Status Codes
  STATUS_CODES: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  } as const,

  // Error Recovery Actions
  RECOVERY_ACTIONS: {
    RETRY: 'retry',
    CANCEL: 'cancel',
    IGNORE: 'ignore',
    ESCALATE: 'escalate',
    NOTIFY: 'notify',
    MANUAL_INTERVENTION: 'manual_intervention',
    AUTO_FIX: 'auto_fix',
  } as const,

  // Error Defaults
  DEFAULTS: {
    DEFAULT_SEVERITY: 'medium',
    DEFAULT_CATEGORY: 'system',
    DEFAULT_STATUS_CODE: 500,
    DEFAULT_RECOVERY_ACTION: 'retry',
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 5000, // milliseconds
    ERROR_HISTORY_LIMIT: 100,
    DEFAULT_PAGE_SIZE: 50,
    MAX_PAGE_SIZE: 500,
    ERROR_LOG_RETENTION_DAYS: 30,
  } as const,
} as const;

// Error Types
export type MarketingErrorType = (typeof MARKETINGERROR.TYPES)[keyof typeof MARKETINGERROR.TYPES];

// Error Severities
export type MarketingErrorSeverity =
  (typeof MARKETINGERROR.SEVERITIES)[keyof typeof MARKETINGERROR.SEVERITIES];

// Error Categories
export type MarketingErrorCategory =
  (typeof MARKETINGERROR.CATEGORIES)[keyof typeof MARKETINGERROR.CATEGORIES];

// Error Status Codes
export type MarketingErrorStatusCode =
  (typeof MARKETINGERROR.STATUS_CODES)[keyof typeof MARKETINGERROR.STATUS_CODES];

// Error Recovery Actions
export type MarketingErrorRecoveryAction =
  (typeof MARKETINGERROR.RECOVERY_ACTIONS)[keyof typeof MARKETINGERROR.RECOVERY_ACTIONS];

// Error Defaults
export type MarketingErrorDefault =
  (typeof MARKETINGERROR.DEFAULTS)[keyof typeof MARKETINGERROR.DEFAULTS];

// Utility Functions
export function marketingerrorGetTypeLabel(errorType: MarketingErrorType): string {
  const labels: Record<MarketingErrorType, string> = {
    // General Errors
    [MARKETINGERROR.TYPES.INTERNAL_ERROR]: 'Internal Error',
    [MARKETINGERROR.TYPES.VALIDATION_ERROR]: 'Validation Error',
    [MARKETINGERROR.TYPES.PERMISSION_DENIED]: 'Permission Denied',
    [MARKETINGERROR.TYPES.NOT_FOUND]: 'Not Found',
    [MARKETINGERROR.TYPES.DUPLICATE]: 'Duplicate',
    [MARKETINGERROR.TYPES.CONFLICT]: 'Conflict',
    [MARKETINGERROR.TYPES.RATE_LIMIT]: 'Rate Limit',
    [MARKETINGERROR.TYPES.TIMEOUT]: 'Timeout',
    [MARKETINGERROR.TYPES.UNAVAILABLE]: 'Service Unavailable',
    [MARKETINGERROR.TYPES.AUTHENTICATION]: 'Authentication Error',

    // Campaign Errors
    [MARKETINGERROR.TYPES.CAMPAIGN_NOT_FOUND]: 'Campaign Not Found',
    [MARKETINGERROR.TYPES.CAMPAIGN_EXPIRED]: 'Campaign Expired',
    [MARKETINGERROR.TYPES.CAMPAIGN_INACTIVE]: 'Campaign Inactive',
    [MARKETINGERROR.TYPES.CAMPAIGN_BUDGET_EXCEEDED]: 'Campaign Budget Exceeded',
    [MARKETINGERROR.TYPES.CAMPAIGN_SCHEDULE_CONFLICT]: 'Campaign Schedule Conflict',
    [MARKETINGERROR.TYPES.CAMPAIGN_DUPLICATE]: 'Campaign Duplicate',

    // Promotion Errors
    [MARKETINGERROR.TYPES.PROMOTION_NOT_FOUND]: 'Promotion Not Found',
    [MARKETINGERROR.TYPES.PROMOTION_EXPIRED]: 'Promotion Expired',
    [MARKETINGERROR.TYPES.PROMOTION_INACTIVE]: 'Promotion Inactive',
    [MARKETINGERROR.TYPES.PROMOTION_STACKING_NOT_ALLOWED]: 'Promotion Stacking Not Allowed',
    [MARKETINGERROR.TYPES.PROMOTION_LIMIT_EXCEEDED]: 'Promotion Limit Exceeded',

    // Email Errors
    [MARKETINGERROR.TYPES.EMAIL_SEND_FAILED]: 'Email Send Failed',
    [MARKETINGERROR.TYPES.EMAIL_TEMPLATE_NOT_FOUND]: 'Email Template Not Found',
    [MARKETINGERROR.TYPES.EMAIL_INVALID_RECIPIENT]: 'Email Invalid Recipient',
    [MARKETINGERROR.TYPES.EMAIL_RATE_LIMIT]: 'Email Rate Limit',
    [MARKETINGERROR.TYPES.EMAIL_BOUNCE]: 'Email Bounce',
    [MARKETINGERROR.TYPES.EMAIL_SPAM]: 'Email Spam',

    // SMS Errors
    [MARKETINGERROR.TYPES.SMS_SEND_FAILED]: 'SMS Send Failed',
    [MARKETINGERROR.TYPES.SMS_INVALID_NUMBER]: 'SMS Invalid Number',
    [MARKETINGERROR.TYPES.SMS_RATE_LIMIT]: 'SMS Rate Limit',
    [MARKETINGERROR.TYPES.SMS_BLOCKED]: 'SMS Blocked',
    [MARKETINGERROR.TYPES.SMS_OPT_OUT]: 'SMS Opt Out',

    // Social Media Errors
    [MARKETINGERROR.TYPES.SOCIAL_POST_FAILED]: 'Social Post Failed',
    [MARKETINGERROR.TYPES.SOCIAL_API_ERROR]: 'Social API Error',
    [MARKETINGERROR.TYPES.SOCIAL_AUTH_FAILED]: 'Social Auth Failed',
    [MARKETINGERROR.TYPES.SOCIAL_RATE_LIMIT]: 'Social Rate Limit',
    [MARKETINGERROR.TYPES.SOCIAL_CONTENT_REJECTED]: 'Social Content Rejected',

    // Analytics Errors
    [MARKETINGERROR.TYPES.ANALYTICS_DATA_NOT_FOUND]: 'Analytics Data Not Found',
    [MARKETINGERROR.TYPES.ANALYTICS_QUERY_FAILED]: 'Analytics Query Failed',
    [MARKETINGERROR.TYPES.ANALYTICS_EXPORT_FAILED]: 'Analytics Export Failed',
    [MARKETINGERROR.TYPES.ANALYTICS_INVALID_DATE_RANGE]: 'Analytics Invalid Date Range',

    // Automation Errors
    [MARKETINGERROR.TYPES.AUTOMATION_EXECUTION_FAILED]: 'Automation Execution Failed',
    [MARKETINGERROR.TYPES.AUTOMATION_TRIGGER_FAILED]: 'Automation Trigger Failed',
    [MARKETINGERROR.TYPES.AUTOMATION_ACTION_FAILED]: 'Automation Action Failed',
    [MARKETINGERROR.TYPES.AUTOMATION_TIMEOUT]: 'Automation Timeout',
    [MARKETINGERROR.TYPES.AUTOMATION_DEPENDENCY_FAILED]: 'Automation Dependency Failed',

    // Lead Generation Errors
    [MARKETINGERROR.TYPES.LEAD_ALREADY_EXISTS]: 'Lead Already Exists',
    [MARKETINGERROR.TYPES.LEAD_INVALID_DATA]: 'Lead Invalid Data',
    [MARKETINGERROR.TYPES.LEAD_SCORING_FAILED]: 'Lead Scoring Failed',
    [MARKETINGERROR.TYPES.LEAD_DUPLICATE]: 'Lead Duplicate',

    // Affiliate Errors
    [MARKETINGERROR.TYPES.AFFILIATE_NOT_FOUND]: 'Affiliate Not Found',
    [MARKETINGERROR.TYPES.AFFILIATE_INACTIVE]: 'Affiliate Inactive',
    [MARKETINGERROR.TYPES.AFFILIATE_COMMISSION_FAILED]: 'Affiliate Commission Failed',
    [MARKETINGERROR.TYPES.AFFILIATE_PAYOUT_FAILED]: 'Affiliate Payout Failed',

    // Referral Errors
    [MARKETINGERROR.TYPES.REFERRAL_NOT_FOUND]: 'Referral Not Found',
    [MARKETINGERROR.TYPES.REFERRAL_EXPIRED]: 'Referral Expired',
    [MARKETINGERROR.TYPES.REFERRAL_INVALID]: 'Referral Invalid',
    [MARKETINGERROR.TYPES.REFERRAL_DUPLICATE]: 'Referral Duplicate',

    // Loyalty Errors
    [MARKETINGERROR.TYPES.LOYALTY_POINTS_INSUFFICIENT]: 'Insufficient Loyalty Points',
    [MARKETINGERROR.TYPES.LOYALTY_TIER_NOT_FOUND]: 'Loyalty Tier Not Found',
    [MARKETINGERROR.TYPES.LOYALTY_REWARD_NOT_FOUND]: 'Loyalty Reward Not Found',
    [MARKETINGERROR.TYPES.LOYALTY_REDEMPTION_FAILED]: 'Loyalty Redemption Failed',

    // Integration Errors
    [MARKETINGERROR.TYPES.INTEGRATION_NOT_FOUND]: 'Integration Not Found',
    [MARKETINGERROR.TYPES.INTEGRATION_AUTH_FAILED]: 'Integration Auth Failed',
    [MARKETINGERROR.TYPES.INTEGRATION_API_ERROR]: 'Integration API Error',
    [MARKETINGERROR.TYPES.INTEGRATION_WEBHOOK_FAILED]: 'Integration Webhook Failed',
    [MARKETINGERROR.TYPES.INTEGRATION_SYNC_FAILED]: 'Integration Sync Failed',

    // Content Errors
    [MARKETINGERROR.TYPES.CONTENT_NOT_FOUND]: 'Content Not Found',
    [MARKETINGERROR.TYPES.CONTENT_INVALID]: 'Content Invalid',
    [MARKETINGERROR.TYPES.CONTENT_PUBLISH_FAILED]: 'Content Publish Failed',
    [MARKETINGERROR.TYPES.CONTENT_APPROVAL_FAILED]: 'Content Approval Failed',

    // SEO Errors
    [MARKETINGERROR.TYPES.SEO_KEYWORD_NOT_FOUND]: 'SEO Keyword Not Found',
    [MARKETINGERROR.TYPES.SEO_SITEMAP_FAILED]: 'SEO Sitemap Failed',
    [MARKETINGERROR.TYPES.SEO_INDEXING_FAILED]: 'SEO Indexing Failed',
    [MARKETINGERROR.TYPES.SEO_ANALYSIS_FAILED]: 'SEO Analysis Failed',
  };
  return labels[errorType] || 'Unknown Error';
}

export function marketingerrorGetSeverityLabel(severity: MarketingErrorSeverity): string {
  const labels: Record<MarketingErrorSeverity, string> = {
    [MARKETINGERROR.SEVERITIES.LOW]: 'Low',
    [MARKETINGERROR.SEVERITIES.MEDIUM]: 'Medium',
    [MARKETINGERROR.SEVERITIES.HIGH]: 'High',
    [MARKETINGERROR.SEVERITIES.CRITICAL]: 'Critical',
  };
  return labels[severity] || 'Unknown Severity';
}

export function marketingerrorGetCategoryLabel(category: MarketingErrorCategory): string {
  const labels: Record<MarketingErrorCategory, string> = {
    [MARKETINGERROR.CATEGORIES.SYSTEM]: 'System',
    [MARKETINGERROR.CATEGORIES.BUSINESS]: 'Business',
    [MARKETINGERROR.CATEGORIES.VALIDATION]: 'Validation',
    [MARKETINGERROR.CATEGORIES.INTEGRATION]: 'Integration',
    [MARKETINGERROR.CATEGORIES.PERMISSION]: 'Permission',
    [MARKETINGERROR.CATEGORIES.DATA]: 'Data',
    [MARKETINGERROR.CATEGORIES.NETWORK]: 'Network',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingerrorGetRecoveryActionLabel(action: MarketingErrorRecoveryAction): string {
  const labels: Record<MarketingErrorRecoveryAction, string> = {
    [MARKETINGERROR.RECOVERY_ACTIONS.RETRY]: 'Retry',
    [MARKETINGERROR.RECOVERY_ACTIONS.CANCEL]: 'Cancel',
    [MARKETINGERROR.RECOVERY_ACTIONS.IGNORE]: 'Ignore',
    [MARKETINGERROR.RECOVERY_ACTIONS.ESCALATE]: 'Escalate',
    [MARKETINGERROR.RECOVERY_ACTIONS.NOTIFY]: 'Notify',
    [MARKETINGERROR.RECOVERY_ACTIONS.MANUAL_INTERVENTION]: 'Manual Intervention',
    [MARKETINGERROR.RECOVERY_ACTIONS.AUTO_FIX]: 'Auto Fix',
  };
  return labels[action] || 'Unknown Recovery Action';
}

export function marketingerrorGetStatusCode(
  errorType: MarketingErrorType
): MarketingErrorStatusCode {
  const statusCodes: Partial<Record<MarketingErrorType, MarketingErrorStatusCode>> = {
    [MARKETINGERROR.TYPES.VALIDATION_ERROR]: MARKETINGERROR.STATUS_CODES.UNPROCESSABLE_ENTITY,
    [MARKETINGERROR.TYPES.PERMISSION_DENIED]: MARKETINGERROR.STATUS_CODES.FORBIDDEN,
    [MARKETINGERROR.TYPES.NOT_FOUND]: MARKETINGERROR.STATUS_CODES.NOT_FOUND,
    [MARKETINGERROR.TYPES.DUPLICATE]: MARKETINGERROR.STATUS_CODES.CONFLICT,
    [MARKETINGERROR.TYPES.CONFLICT]: MARKETINGERROR.STATUS_CODES.CONFLICT,
    [MARKETINGERROR.TYPES.RATE_LIMIT]: MARKETINGERROR.STATUS_CODES.TOO_MANY_REQUESTS,
    [MARKETINGERROR.TYPES.TIMEOUT]: MARKETINGERROR.STATUS_CODES.GATEWAY_TIMEOUT,
    [MARKETINGERROR.TYPES.UNAVAILABLE]: MARKETINGERROR.STATUS_CODES.SERVICE_UNAVAILABLE,
    [MARKETINGERROR.TYPES.AUTHENTICATION]: MARKETINGERROR.STATUS_CODES.UNAUTHORIZED,
  };
  return statusCodes[errorType] || MARKETINGERROR.STATUS_CODES.INTERNAL_SERVER_ERROR;
}

export function marketingerrorIsRetryable(errorType: MarketingErrorType): boolean {
  const retryableErrors: MarketingErrorType[] = [
    MARKETINGERROR.TYPES.TIMEOUT,
    MARKETINGERROR.TYPES.RATE_LIMIT,
    MARKETINGERROR.TYPES.UNAVAILABLE,
    MARKETINGERROR.TYPES.EMAIL_SEND_FAILED,
    MARKETINGERROR.TYPES.SMS_SEND_FAILED,
    MARKETINGERROR.TYPES.SOCIAL_API_ERROR,
    MARKETINGERROR.TYPES.ANALYTICS_QUERY_FAILED,
    MARKETINGERROR.TYPES.AUTOMATION_EXECUTION_FAILED,
    MARKETINGERROR.TYPES.INTEGRATION_API_ERROR,
    MARKETINGERROR.TYPES.INTEGRATION_WEBHOOK_FAILED,
  ];
  return retryableErrors.includes(errorType);
}

export function marketingerrorIsCritical(errorType: MarketingErrorType): boolean {
  const criticalErrors: MarketingErrorType[] = [
    MARKETINGERROR.TYPES.INTERNAL_ERROR,
    MARKETINGERROR.TYPES.AUTHENTICATION,
    MARKETINGERROR.TYPES.EMAIL_BOUNCE,
    MARKETINGERROR.TYPES.SMS_BLOCKED,
    MARKETINGERROR.TYPES.SOCIAL_AUTH_FAILED,
    MARKETINGERROR.TYPES.AUTOMATION_TIMEOUT,
    MARKETINGERROR.TYPES.INTEGRATION_SYNC_FAILED,
  ];
  return criticalErrors.includes(errorType);
}

export function marketingerrorGetDefaultSeverity(): MarketingErrorSeverity {
  return MARKETINGERROR.DEFAULTS.DEFAULT_SEVERITY;
}

export function marketingerrorGetDefaultRetryAttempts(): number {
  return MARKETINGERROR.DEFAULTS.MAX_RETRY_ATTEMPTS;
}

export function marketingerrorGetDefaultRetryDelay(): number {
  return MARKETINGERROR.DEFAULTS.RETRY_DELAY;
}
