/**
 * Audit Service Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/audit.service.interface
 * 
 * @description
 * Service contract for audit logging operations.
 * Used for compliance, security monitoring, and debugging.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ No business logic
 * ✅ No database queries
 * ✅ Framework-free
 * ✅ Bangladesh specific - District, upazila, mobile operator tracking
 */

// ============================================================
// Audit Action Types (Extended for Bangladesh)
// ============================================================

export enum AuditAction {
  // Authentication
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  REGISTER_COMPLETED = 'REGISTER_COMPLETED',
  
  // Account Management
  ACCOUNT_UPDATED = 'ACCOUNT_UPDATED',
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',
  ACCOUNT_RESTORED = 'ACCOUNT_RESTORED',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_UNLOCKED = 'ACCOUNT_UNLOCKED',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  ACCOUNT_ACTIVATED = 'ACCOUNT_ACTIVATED',
  
  // Password
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  PASSWORD_RESET = 'PASSWORD_RESET',
  PASSWORD_RESET_REQUESTED = 'PASSWORD_RESET_REQUESTED',
  PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED',
  
  // Email/Phone
  EMAIL_UPDATED = 'EMAIL_UPDATED',
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',
  EMAIL_VERIFICATION_SENT = 'EMAIL_VERIFICATION_SENT',
  PHONE_UPDATED = 'PHONE_UPDATED',
  PHONE_VERIFIED = 'PHONE_VERIFIED',
  PHONE_VERIFICATION_SENT = 'PHONE_VERIFICATION_SENT',
  
  // MFA
  MFA_ENABLED = 'MFA_ENABLED',
  MFA_DISABLED = 'MFA_DISABLED',
  MFA_VERIFIED = 'MFA_VERIFIED',
  MFA_FAILED = 'MFA_FAILED',
  MFA_BACKUP_CODE_USED = 'MFA_BACKUP_CODE_USED',
  MFA_SETUP_INITIATED = 'MFA_SETUP_INITIATED',
  MFA_METHOD_ADDED = 'MFA_METHOD_ADDED',
  MFA_METHOD_REMOVED = 'MFA_METHOD_REMOVED',
  
  // Session
  SESSION_CREATED = 'SESSION_CREATED',
  SESSION_REVOKED = 'SESSION_REVOKED',
  SESSION_REVOKED_ALL = 'SESSION_REVOKED_ALL',
  SESSION_EXTENDED = 'SESSION_EXTENDED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  
  // Device
  DEVICE_REGISTERED = 'DEVICE_REGISTERED',
  DEVICE_TRUSTED = 'DEVICE_TRUSTED',
  DEVICE_UNTRUSTED = 'DEVICE_UNTRUSTED',
  DEVICE_REMOVED = 'DEVICE_REMOVED',
  
  // Social Auth
  SOCIAL_LOGIN = 'SOCIAL_LOGIN',
  SOCIAL_LOGIN_FAILED = 'SOCIAL_LOGIN_FAILED',
  SOCIAL_ACCOUNT_LINKED = 'SOCIAL_ACCOUNT_LINKED',
  SOCIAL_ACCOUNT_UNLINKED = 'SOCIAL_ACCOUNT_UNLINKED',
  
  // Bangladesh Specific - MFS Payments
  BKASH_PAYMENT_INITIATED = 'BKASH_PAYMENT_INITIATED',
  BKASH_PAYMENT_SUCCESS = 'BKASH_PAYMENT_SUCCESS',
  BKASH_PAYMENT_FAILED = 'BKASH_PAYMENT_FAILED',
  NAGAD_PAYMENT_INITIATED = 'NAGAD_PAYMENT_INITIATED',
  NAGAD_PAYMENT_SUCCESS = 'NAGAD_PAYMENT_SUCCESS',
  NAGAD_PAYMENT_FAILED = 'NAGAD_PAYMENT_FAILED',
  ROCKET_PAYMENT_INITIATED = 'ROCKET_PAYMENT_INITIATED',
  ROCKET_PAYMENT_SUCCESS = 'ROCKET_PAYMENT_SUCCESS',
  ROCKET_PAYMENT_FAILED = 'ROCKET_PAYMENT_FAILED',
  
  // Bangladesh Specific - Social Login
  WHATSAPP_LOGIN = 'WHATSAPP_LOGIN',
  WHATSAPP_LOGIN_FAILED = 'WHATSAPP_LOGIN_FAILED',
  IMO_LOGIN = 'IMO_LOGIN',
  IMO_LOGIN_FAILED = 'IMO_LOGIN_FAILED',
  TELEGRAM_LOGIN = 'TELEGRAM_LOGIN',
  TELEGRAM_LOGIN_FAILED = 'TELEGRAM_LOGIN_FAILED',
  
  // Admin Actions
  ADMIN_ACTION = 'ADMIN_ACTION',
  USER_ROLE_CHANGED = 'USER_ROLE_CHANGED',
  USER_IMPERSONATED = 'USER_IMPERSONATED',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_LOGOUT = 'ADMIN_LOGOUT',
  
  // Security
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  IP_BLOCKED = 'IP_BLOCKED',
  IP_UNBLOCKED = 'IP_UNBLOCKED',
  DEVICE_BLOCKED = 'DEVICE_BLOCKED',
  DEVICE_UNBLOCKED = 'DEVICE_UNBLOCKED',
  TOKEN_COMPROMISED = 'TOKEN_COMPROMISED',
  
  // Data Access
  DATA_EXPORTED = 'DATA_EXPORTED',
  DATA_IMPORTED = 'DATA_IMPORTED',
  SENSITIVE_DATA_ACCESSED = 'SENSITIVE_DATA_ACCESSED',
  REPORT_GENERATED = 'REPORT_GENERATED',
  
  // User Profile
  PROFILE_UPDATED = 'PROFILE_UPDATED',
  AVATAR_UPLOADED = 'AVATAR_UPLOADED',
  AVATAR_DELETED = 'AVATAR_DELETED',
  
  // Location (Bangladesh specific)
  DISTRICT_CHANGED = 'DISTRICT_CHANGED',
  UPAZILA_CHANGED = 'UPAZILA_CHANGED',
  ADDRESS_ADDED = 'ADDRESS_ADDED',
  ADDRESS_UPDATED = 'ADDRESS_UPDATED',
  ADDRESS_DELETED = 'ADDRESS_DELETED',
}

// ============================================================
// Audit Severity Levels
// ============================================================

export enum AuditSeverity {
  DEBUG = 'DEBUG',       // Development/debugging
  INFO = 'INFO',         // Normal operations
  WARNING = 'WARNING',   // Suspicious but not critical
  ERROR = 'ERROR',       // Error occurred
  CRITICAL = 'CRITICAL', // Security incident
  SECURITY = 'SECURITY', // Security-related event (login, MFA, etc.)
}

// ============================================================
// Audit Context (Bangladesh specific)
// ============================================================

export interface AuditContext {
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  sessionId?: string;
  correlationId?: string;
  requestId?: string;
  // Bangladesh specific
  district?: string;
  upazila?: string;
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
}

// ============================================================
// Audit Log Entry Interface
// ============================================================

export interface AuditLogEntry {
  id?: string;
  action: AuditAction;
  userId?: string;
  email?: string;
  phoneNumber?: string;
  severity: AuditSeverity;
  context?: AuditContext;
  details?: Record<string, unknown>;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  error?: string;
  errorCode?: string;
  durationMs?: number;
  timestamp: Date;
  // For correlation
  correlationId?: string;
  requestId?: string;
  // User agent info
  userAgent?: string;
  deviceId?: string;
  // IP info
  ipAddress?: string;
  // Location info (Bangladesh specific)
  district?: string;
  upazila?: string;
  mobileOperator?: string;
}

// ============================================================
// Audit Query Filters
// ============================================================

export interface AuditQueryFilters {
  userId?: string;
  email?: string;
  action?: AuditAction;
  actionList?: AuditAction[];
  severity?: AuditSeverity;
  severityList?: AuditSeverity[];
  fromDate?: Date;
  toDate?: Date;
  ipAddress?: string;
  deviceId?: string;
  correlationId?: string;
  requestId?: string;
  district?: string;
  mobileOperator?: string;
  hasError?: boolean;
  search?: string;  // Search in details, error
}

// ============================================================
// Paginated Audit Result
// ============================================================

export interface PaginatedAuditResult {
  items: AuditLogEntry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ============================================================
// Audit Statistics
// ============================================================

export interface AuditStatistics {
  totalEvents: number;
  byAction: Record<AuditAction, number>;
  bySeverity: Record<AuditSeverity, number>;
  eventsLast24h: number;
  eventsLast7d: number;
  eventsLast30d: number;
  uniqueUsers: number;
  topActions: Array<{ action: AuditAction; count: number }>;
  topUsers: Array<{ userId: string; email: string; count: number }>;
  // Bangladesh specific
  eventsByDistrict?: Array<{ district: string; count: number }>;
  eventsByMobileOperator?: Array<{ operator: string; count: number }>;
  eventsByHour?: Array<{ hour: number; count: number }>;
}

// ============================================================
// Audit Export Format
// ============================================================

export type AuditExportFormat = 'json' | 'csv' | 'xlsx';

export interface AuditExportOptions {
  format: AuditExportFormat;
  filters: AuditQueryFilters;
  includeDetails?: boolean;
  includeBeforeAfter?: boolean;
}

// ============================================================
// Audit Service Configuration
// ============================================================

export interface AuditServiceConfig {
  enabled: boolean;
  retentionDays: number;
  asyncLogging: boolean;
  logSensitiveData: boolean;
  logRequestBody: boolean;
  logResponseBody: boolean;
  excludedActions?: AuditAction[];
  excludedPaths?: string[];
  // Batch processing
  batchSize?: number;
  flushIntervalMs?: number;
  // Storage
  storageType?: 'database' | 'file' | 'elasticsearch' | 'cloudwatch';
  // Bangladesh specific
  logDistrictInfo?: boolean;
  logMobileOperator?: boolean;
  logNetworkType?: boolean;
}

// ============================================================
// Audit Service Interface
// ============================================================

export interface AuditService {
  /**
   * Log an audit entry
   * @param entry - Audit log entry
   */
  log(entry: Omit<AuditLogEntry, 'timestamp'>): Promise<void>;
  
  /**
   * Log with INFO severity (convenience method)
   * @param action - Audit action
   * @param userId - User ID (optional)
   * @param details - Additional details (optional)
   * @param context - Audit context (optional)
   */
  info(
    action: AuditAction, 
    userId?: string, 
    details?: Record<string, unknown>,
    context?: AuditContext
  ): Promise<void>;
  
  /**
   * Log with WARNING severity
   * @param action - Audit action
   * @param userId - User ID (optional)
   * @param details - Additional details (optional)
   * @param context - Audit context (optional)
   */
  warn(
    action: AuditAction, 
    userId?: string, 
    details?: Record<string, unknown>,
    context?: AuditContext
  ): Promise<void>;
  
  /**
   * Log with ERROR severity
   * @param action - Audit action
   * @param userId - User ID (optional)
   * @param error - Error message
   * @param details - Additional details (optional)
   * @param context - Audit context (optional)
   */
  error(
    action: AuditAction, 
    userId: string | undefined, 
    error: string, 
    details?: Record<string, unknown>,
    context?: AuditContext
  ): Promise<void>;
  
  /**
   * Log with CRITICAL severity (security incident)
   * @param action - Audit action
   * @param userId - User ID (optional)
   * @param details - Additional details (optional)
   * @param context - Audit context (optional)
   */
  critical(
    action: AuditAction, 
    userId?: string, 
    details?: Record<string, unknown>,
    context?: AuditContext
  ): Promise<void>;
  
  /**
   * Log with SECURITY severity (authentication, MFA, etc.)
   * @param action - Audit action
   * @param userId - User ID (optional)
   * @param details - Additional details (optional)
   * @param context - Audit context (optional)
   */
  security(
    action: AuditAction, 
    userId?: string, 
    details?: Record<string, unknown>,
    context?: AuditContext
  ): Promise<void>;
  
  /**
   * Log a state change (before/after)
   * @param action - Audit action
   * @param userId - User ID
   * @param before - Before state
   * @param after - After state
   * @param context - Audit context (optional)
   */
  logChange(
    action: AuditAction,
    userId: string,
    before: Record<string, unknown>,
    after: Record<string, unknown>,
    context?: AuditContext
  ): Promise<void>;
  
  /**
   * Query audit logs with filters
   * @param filters - Query filters
   * @param page - Page number
   * @param limit - Items per page
   * @returns Paginated audit results
   */
  query(filters: AuditQueryFilters, page: number, limit: number): Promise<PaginatedAuditResult>;
  
  /**
   * Get audit statistics
   * @param days - Number of days to analyze
   * @returns Audit statistics
   */
  getStatistics(days?: number): Promise<AuditStatistics>;
  
  /**
   * Export audit logs for compliance
   * @param options - Export options
   * @returns Export data (string for CSV/JSON, Buffer for XLSX)
   */
  export(options: AuditExportOptions): Promise<string | Buffer>;
  
  /**
   * Clean up old audit logs (retention policy)
   * @param retentionDays - Days to retain
   * @returns Number of deleted entries
   */
  cleanup(retentionDays: number): Promise<number>;
  
  /**
   * Get a single audit entry by ID
   * @param id - Audit entry ID
   * @returns Audit entry or null
   */
  findById(id: string): Promise<AuditLogEntry | null>;
  
  /**
   * Get audit trail for a specific user
   * @param userId - User ID
   * @param limit - Maximum number of entries
   * @returns Array of audit entries
   */
  getUserAuditTrail(userId: string, limit?: number): Promise<AuditLogEntry[]>;
  
  /**
   * Check if audit logging is enabled
   */
  isEnabled(): boolean;
}

// ============================================================
// Type Exports
// ============================================================

export type { AuditContext as AuditContextType, AuditExportOptions as AuditExportOptionsType };
