/**
 * Password History Constants - Enterprise Grade
 * @module shared-constants/password-history.constants
 * 
 * @description
 * Centralized password history configuration for the entire enterprise.
 * Used for password reuse prevention, expiry policies, and security compliance.
 * 
 * Enterprise Rules:
 * ✅ SINGLE SOURCE OF TRUTH - All password history configurations
 * ✅ Bangladesh Bank compliance (90 days expiry)
 * ✅ Security-first defaults
 * ✅ Cross-service consistency
 * ✅ Type-safe exports with const assertions
 * ✅ Framework-free, no external dependencies
 * 
 * @example
 * import { PASSWORD_HISTORY_CONFIG } from '@vubon/shared-constants';
 * 
 * // Check if password is expired
 * const isExpired = passwordAge > PASSWORD_HISTORY_CONFIG.PASSWORD_EXPIRY_DAYS;
 */

// ============================================================
// Password History Configuration
// ============================================================
export const PASSWORD_HISTORY_CONFIG = {
  // ============================================================
  // History Management
  // ============================================================
  
  /** Maximum password history entries to keep per user (10 entries) */
  MAX_HISTORY_COUNT: 10,
  
  /** Number of previous passwords to prevent reuse (last 5) */
  PREVENT_REUSE_COUNT: 5,
  
  /** Number of previous passwords to check for similarity (3) */
  SIMILARITY_CHECK_COUNT: 3,
  
  /** Minimum similarity score to consider as reuse (80%) */
  SIMILARITY_THRESHOLD: 80,
  
  /** Minimum days between password changes (1 day) */
  MIN_DAYS_BETWEEN_CHANGES: 1,
  
  /** Maximum days between password changes (90 days) */
  MAX_DAYS_BETWEEN_CHANGES: 90,
  
  // ============================================================
  // Password Expiry Configuration
  // ============================================================
  
  /** Password expiry days (90 days - Bangladesh Bank guideline) */
  PASSWORD_EXPIRY_DAYS: 90,
  
  /** Expiry warning days (7 days before expiry) */
  EXPIRY_WARNING_DAYS: 7,
  
  /** Critical warning days (3 days before expiry) */
  EXPIRY_CRITICAL_DAYS: 3,
  
  /** Grace period days after expiry (7 days) */
  GRACE_PERIOD_DAYS: 7,
  
  /** Force password change after grace period */
  FORCE_CHANGE_AFTER_GRACE: true,
  
  /** Allow password change before expiry */
  ALLOW_EARLY_CHANGE: true,
  
  /** Require admin approval for early change */
  REQUIRE_ADMIN_APPROVAL_EARLY_CHANGE: false,
  
  // ============================================================
  // Password Strength Configuration
  // ============================================================
  
  /** Password strength minimum score (0-100) - 60 = medium strength */
  MIN_STRENGTH_SCORE: 60,
  
  /** Password strength recommended score (0-100) - 80 = strong */
  RECOMMENDED_STRENGTH_SCORE: 80,
  
  /** Password strength maximum score (0-100) - 100 = very strong */
  MAX_STRENGTH_SCORE: 100,
  
  /** Strength score thresholds */
  STRENGTH_THRESHOLDS: {
    /** Excellent: 90-100 */
    EXCELLENT: 90,
    /** Good: 70-89 */
    GOOD: 70,
    /** Fair: 50-69 */
    FAIR: 50,
    /** Poor: 30-49 */
    POOR: 30,
    /** Critical: 0-29 */
    CRITICAL: 0,
  } as const,
  
  // ============================================================
  // Breach Detection Configuration
  // ============================================================
  
  /** Breach detection enabled */
  BREACH_DETECTION_ENABLED: true,
  
  /** Breach check frequency in days (30 days) */
  BREACH_CHECK_FREQUENCY_DAYS: 30,
  
  /** Breach detection timeout in milliseconds (5000ms) */
  BREACH_DETECTION_TIMEOUT_MS: 5000,
  
  /** Breach detection retry count (3 attempts) */
  BREACH_DETECTION_RETRY_COUNT: 3,
  
  /** Breach severity levels */
  BREACH_SEVERITY: {
    CRITICAL: 'CRITICAL' as const,
    HIGH: 'HIGH' as const,
    MEDIUM: 'MEDIUM' as const,
    LOW: 'LOW' as const,
  } as const,
  
  /** Breach sources to check */
  BREACH_SOURCES: [
    'haveibeenpwned',
    'dehashed',
    'firefox_monitor',
    'google_password_checkup',
    'custom_breach_database',
  ] as const,
  
  /** Require password change on breach detection */
  REQUIRE_CHANGE_ON_BREACH: true,
  
  /** Notify user on breach detection */
  NOTIFY_USER_ON_BREACH: true,
  
  // ============================================================
  // Audit & Logging Configuration
  // ============================================================
  
  /** Audit logging enabled */
  AUDIT_LOGGING_ENABLED: true,
  
  /** Log all password changes */
  LOG_ALL_CHANGES: true,
  
  /** Log failed password change attempts */
  LOG_FAILED_ATTEMPTS: true,
  
  /** Log password reuse attempts */
  LOG_REUSE_ATTEMPTS: true,
  
  /** Log breach detections */
  LOG_BREACH_DETECTIONS: true,
  
  /** Log password expiry events */
  LOG_EXPIRY_EVENTS: true,
  
  /** Alert after failed change attempts (3 attempts) */
  ALERT_AFTER_FAILED_CHANGES: 3,
  
  /** Alert on breach detection */
  ALERT_ON_BREACH: true,
  
  /** Alert on repeated reuse attempts (2 attempts) */
  ALERT_ON_REPEATED_REUSE: 2,
  
  /** Email for security alerts */
  ALERT_EMAIL: 'security@vubon.com.bd',
  
  // ============================================================
  // Retention & Cleanup Configuration
  // ============================================================
  
  /** Retention days for history records (365 days = 1 year) */
  RETENTION_DAYS: 365,
  
  /** Archive enabled */
  ARCHIVE_ENABLED: true,
  
  /** Archive after days (90 days) */
  ARCHIVE_AFTER_DAYS: 90,
  
  /** Cleanup batch size (100 records per batch) */
  CLEANUP_BATCH_SIZE: 100,
  
  /** Cleanup interval hours (24 hours) */
  CLEANUP_INTERVAL_HOURS: 24,
  
  /** Purge archived entries after days (730 days = 2 years) */
  PURGE_ARCHIVED_AFTER_DAYS: 730,
  
  // ============================================================
  // Policy Configuration
  // ============================================================
  
  /** Automatic expiry enforcement */
  AUTO_EXPIRY_ENFORCEMENT: true,
  
  /** Require admin approval for password bypass */
  REQUIRE_ADMIN_APPROVAL_BYPASS: true,
  
  /** Allow emergency password reset */
  ALLOW_EMERGENCY_RESET: true,
  
  /** Emergency reset approval required */
  EMERGENCY_RESET_APPROVAL_REQUIRED: true,
  
  /** Emergency reset notification required */
  EMERGENCY_RESET_NOTIFICATION_REQUIRED: true,
  
  /** Password change notification required */
  PASSWORD_CHANGE_NOTIFICATION_REQUIRED: true,
  
  // ============================================================
  // Bangladesh Specific Configuration
  // ============================================================
  
  /** Enable Bangladesh Bank compliance */
  ENABLE_BD_BANK_COMPLIANCE: true,
  
  /** Bangladesh Bank password expiry (90 days) */
  BD_BANK_EXPIRY_DAYS: 90,
  
  /** Bangladesh Bank retention days (365 days) */
  BD_BANK_RETENTION_DAYS: 365,
  
  /** Bangladesh Bank audit log retention (365 days) */
  BD_BANK_AUDIT_RETENTION_DAYS: 365,
  
  /** Bangladesh Bank password history count (10 entries) */
  BD_BANK_HISTORY_COUNT: 10,
  
  /** Bangladesh Bank special characters required */
  BD_BANK_SPECIAL_CHARS_REQUIRED: true,
  
  /** Bangladesh Bank password complexity score */
  BD_BANK_MIN_COMPLEXITY_SCORE: 60,
  
  // ============================================================
  // User Segmentation Configuration
  // ============================================================
  
  /** Password expiry by user tier */
  TIER_EXPIRY_DAYS: {
    BRONZE: 90,
    SILVER: 90,
    GOLD: 60,
    PLATINUM: 60,
    DIAMOND: 45,
  } as const,
  
  /** Password expiry by user role */
  ROLE_EXPIRY_DAYS: {
    CUSTOMER: 90,
    PREMIUM_CUSTOMER: 90,
    SELLER: 60,
    VENDOR: 60,
    MODERATOR: 45,
    ADMIN: 30,
    SUPER_ADMIN: 30,
    SUPPORT: 60,
    DELIVERY_AGENT: 60,
  } as const,
  
  /** Password strength requirement by user tier */
  TIER_STRENGTH_REQUIREMENTS: {
    BRONZE: 50,
    SILVER: 55,
    GOLD: 65,
    PLATINUM: 75,
    DIAMOND: 85,
  } as const,
  
  /** Password strength requirement by user role */
  ROLE_STRENGTH_REQUIREMENTS: {
    CUSTOMER: 50,
    PREMIUM_CUSTOMER: 55,
    SELLER: 65,
    VENDOR: 65,
    MODERATOR: 75,
    ADMIN: 80,
    SUPER_ADMIN: 90,
    SUPPORT: 65,
    DELIVERY_AGENT: 55,
  } as const,
  
  /** Users who need stricter password policy */
  STRICT_POLICY_ROLES: ['ADMIN', 'SUPER_ADMIN', 'VENDOR'] as const,
  
  // ============================================================
  // Notification Configuration
  // ============================================================
  
  /** Send expiry warning email */
  SEND_EXPIRY_WARNING_EMAIL: true,
  
  /** Send expiry warning SMS */
  SEND_EXPIRY_WARNING_SMS: false,
  
  /** Send expiry warning WhatsApp (Bangladesh specific) */
  SEND_EXPIRY_WARNING_WHATSAPP: true,
  
  /** Send breach notification email */
  SEND_BREACH_NOTIFICATION_EMAIL: true,
  
  /** Send breach notification SMS */
  SEND_BREACH_NOTIFICATION_SMS: true,
  
  /** Send password change confirmation email */
  SEND_CHANGE_CONFIRMATION_EMAIL: true,
  
  /** Send password change notification email (for admin changes) */
  SEND_ADMIN_CHANGE_NOTIFICATION_EMAIL: true,
  
  /** Notification language preferences */
  NOTIFICATION_LANGUAGES: ['en', 'bn'] as const,
  
  /** Default notification language (Bangladesh) */
  DEFAULT_NOTIFICATION_LANGUAGE: 'bn',
  
  // ============================================================
  // Compliance Configuration
  // ============================================================
  
  /** Compliance check enabled */
  COMPLIANCE_CHECK_ENABLED: true,
  
  /** Compliance check frequency in days (30 days) */
  COMPLIANCE_CHECK_FREQUENCY_DAYS: 30,
  
  /** Generate compliance report */
  GENERATE_COMPLIANCE_REPORT: true,
  
  /** Compliance report format */
  COMPLIANCE_REPORT_FORMAT: 'pdf' as const,
  
  /** Compliance report recipients */
  COMPLIANCE_REPORT_RECIPIENTS: ['compliance@vubon.com.bd'],
  
  /** Export compliance data */
  EXPORT_COMPLIANCE_DATA: true,
  
  /** Compliance data export format */
  COMPLIANCE_EXPORT_FORMAT: 'csv' as const,
} as const;

// ============================================================
// Type Exports
// ============================================================

/**
 * Type-safe PasswordHistoryConfig type
 */
export type PasswordHistoryConfig = typeof PASSWORD_HISTORY_CONFIG;

/**
 * Password history configuration keys
 */
export type PasswordHistoryConfigKey = keyof PasswordHistoryConfig;

/**
 * Breach severity type
 */
export type BreachSeverity = typeof PASSWORD_HISTORY_CONFIG.BREACH_SEVERITY[keyof typeof PASSWORD_HISTORY_CONFIG.BREACH_SEVERITY];

/**
 * User tier type for password policies
 */
export type UserPasswordTier = keyof typeof PASSWORD_HISTORY_CONFIG.TIER_EXPIRY_DAYS;

/**
 * User role type for password policies
 */
export type AuthUserRole = keyof typeof PASSWORD_HISTORY_CONFIG.ROLE_EXPIRY_DAYS;

// ============================================================
// Utility Types
// ============================================================

/**
 * Password history configuration options
 */
export interface PasswordHistoryOptions {
  /** Number of history entries to keep */
  maxHistoryCount?: number;
  
  /** Number of passwords to prevent reuse */
  preventReuseCount?: number;
  
  /** Password expiry in days */
  expiryDays?: number;
  
  /** Enable breach detection */
  breachDetectionEnabled?: boolean;
  
  /** Enable audit logging */
  auditLoggingEnabled?: boolean;
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get expiry days for a user tier
 * @param tier - User tier
 * @returns Expiry days for the tier
 */
export const getExpiryDaysForTier = (tier: UserPasswordTier): number => {
  return PASSWORD_HISTORY_CONFIG.TIER_EXPIRY_DAYS[tier] || PASSWORD_HISTORY_CONFIG.PASSWORD_EXPIRY_DAYS;
};

/**
 * Get expiry days for a user role
 * @param role - User role
 * @returns Expiry days for the role
 */
export const getExpiryDaysForRole = (role: AuthUserRole): number => {
  return PASSWORD_HISTORY_CONFIG.ROLE_EXPIRY_DAYS[role] || PASSWORD_HISTORY_CONFIG.PASSWORD_EXPIRY_DAYS;
};

/**
 * Get minimum strength requirement for a user tier
 * @param tier - User tier
 * @returns Minimum strength score
 */
export const getStrengthRequirementForTier = (tier: UserPasswordTier): number => {
  return PASSWORD_HISTORY_CONFIG.TIER_STRENGTH_REQUIREMENTS[tier] || PASSWORD_HISTORY_CONFIG.MIN_STRENGTH_SCORE;
};

/**
 * Get minimum strength requirement for a user role
 * @param role - User role
 * @returns Minimum strength score
 */
export const getStrengthRequirementForRole = (role: AuthUserRole): number => {
  return PASSWORD_HISTORY_CONFIG.ROLE_STRENGTH_REQUIREMENTS[role] || PASSWORD_HISTORY_CONFIG.MIN_STRENGTH_SCORE;
};

/**
 * Check if a role requires strict password policy
 * @param role - User role
 * @returns True if strict policy is required
 */
export const requiresStrictPolicy = (role: AuthUserRole): boolean => {
  return PASSWORD_HISTORY_CONFIG.STRICT_POLICY_ROLES.includes(role as any);
};

/**
 * Get breach severity description
 * @param severity - Breach severity
 * @returns Description of the severity
 */
export const getBreachSeverityDescription = (severity: BreachSeverity): string => {
  const descriptions: Record<BreachSeverity, string> = {
    CRITICAL: 'Immediate action required - password compromised in active breach',
    HIGH: 'High risk - password found in recent breach',
    MEDIUM: 'Medium risk - password found in older breach',
    LOW: 'Low risk - potential breach detected',
  };
  return descriptions[severity] || 'Unknown severity';
};

/**
 * Get password age category
 * @param ageInDays - Password age in days
 * @returns Age category
 */
export const getPasswordAgeCategory = (ageInDays: number): string => {
  if (ageInDays < 7) return 'NEW';
  if (ageInDays < 30) return 'RECENT';
  if (ageInDays < 60) return 'MODERATE';
  if (ageInDays < PASSWORD_HISTORY_CONFIG.PASSWORD_EXPIRY_DAYS) return 'OLD';
  return 'EXPIRING';
};

/**
 * Check if password is expired
 * @param ageInDays - Password age in days
 * @param expiryDays - Custom expiry days (optional)
 * @returns True if password is expired
 */
export const isPasswordExpired = (ageInDays: number, expiryDays?: number): boolean => {
  const days = expiryDays || PASSWORD_HISTORY_CONFIG.PASSWORD_EXPIRY_DAYS;
  return ageInDays >= days;
};

/**
 * Check if password needs warning
 * @param ageInDays - Password age in days
 * @param warningDays - Custom warning days (optional)
 * @returns True if warning is needed
 */
export const needsExpiryWarning = (ageInDays: number, warningDays?: number): boolean => {
  const days = warningDays || PASSWORD_HISTORY_CONFIG.EXPIRY_WARNING_DAYS;
  const expiryDays = PASSWORD_HISTORY_CONFIG.PASSWORD_EXPIRY_DAYS;
  const daysUntilExpiry = expiryDays - ageInDays;
  return daysUntilExpiry <= days && daysUntilExpiry > 0;
};

/**
 * Check if password needs critical warning
 * @param ageInDays - Password age in days
 * @param criticalDays - Custom critical days (optional)
 * @returns True if critical warning is needed
 */
export const needsCriticalWarning = (ageInDays: number, criticalDays?: number): boolean => {
  const days = criticalDays || PASSWORD_HISTORY_CONFIG.EXPIRY_CRITICAL_DAYS;
  const expiryDays = PASSWORD_HISTORY_CONFIG.PASSWORD_EXPIRY_DAYS;
  const daysUntilExpiry = expiryDays - ageInDays;
  return daysUntilExpiry <= days && daysUntilExpiry > 0;
};

// ============================================================
// Default Export
// ============================================================

export default {
  PASSWORD_HISTORY_CONFIG,
  getExpiryDaysForTier,
  getExpiryDaysForRole,
  getStrengthRequirementForTier,
  getStrengthRequirementForRole,
  requiresStrictPolicy,
  getBreachSeverityDescription,
  getPasswordAgeCategory,
  isPasswordExpired,
  needsExpiryWarning,
  needsCriticalWarning,
};
