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

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট
import type { 
  AuditAction as SharedAuditAction, 
  AuditSeverity as SharedAuditSeverity,
  AuditExportFormat as SharedAuditExportFormat
} from '@vubon/shared-types';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট
import { AUDIT_CONFIG } from '@vubon/shared-constants';

// ============================================================
// Audit Action Types (Extended for Bangladesh)
// Using shared-types for consistency
// ============================================================

// লোকাল এনামের বদলে শেয়ার্ড টাইপ ব্যবহার করুন
export { SharedAuditAction as AuditAction, SharedAuditSeverity as AuditSeverity };

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
  // Request tracking
  path?: string;
  method?: string;
  statusCode?: number;
}

// ============================================================
// Change Detail for State Tracking
// ============================================================

export interface ChangeDetail {
  field: string;
  oldValue: unknown;
  newValue: unknown;
  dataType?: string;
}

// ============================================================
// Audit Log Entry Interface
// ============================================================

export interface AuditLogEntry {
  id?: string;
  action: SharedAuditAction;
  userId?: string;
  email?: string;
  phoneNumber?: string;
  severity: SharedAuditSeverity;
  context?: AuditContext;
  details?: Record<string, unknown>;
  changes?: ChangeDetail[];  // ✅ Added for structured change tracking
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
  // Performance tracking
  responseSize?: number;
  queryCount?: number;
}

// ============================================================
// Audit Query Filters
// ============================================================

export interface AuditQueryFilters {
  userId?: string;
  email?: string;
  action?: SharedAuditAction;
  actionList?: SharedAuditAction[];
  severity?: SharedAuditSeverity;
  severityList?: SharedAuditSeverity[];
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
  path?: string;     // ✅ Added for endpoint filtering
  statusCode?: number; // ✅ Added for HTTP status filtering
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
  byAction: Record<SharedAuditAction, number>;
  bySeverity: Record<SharedAuditSeverity, number>;
  eventsLast24h: number;
  eventsLast7d: number;
  eventsLast30d: number;
  uniqueUsers: number;
  topActions: Array<{ action: SharedAuditAction; count: number }>;
  topUsers: Array<{ userId: string; email: string; count: number }>;
  averageResponseTimeMs: number;  // ✅ Added for performance monitoring
  errorRate: number;               // ✅ Added for error tracking
  // Bangladesh specific
  eventsByDistrict?: Array<{ district: string; count: number }>;
  eventsByMobileOperator?: Array<{ operator: string; count: number }>;
  eventsByHour?: Array<{ hour: number; count: number }>;
}

// ============================================================
// Audit Export Format (Using shared-types)
// ============================================================

export { SharedAuditExportFormat as AuditExportFormat };
export type AuditExportFormat = SharedAuditExportFormat;

export interface AuditExportOptions {
  format: AuditExportFormat;
  filters: AuditQueryFilters;
  includeDetails?: boolean;
  includeBeforeAfter?: boolean;
  includeChanges?: boolean;  // ✅ Added for structured change export
  dateRange?: {
    from: Date;
    to: Date;
  };
}

// ============================================================
// Audit Service Configuration (Enhanced)
// ============================================================

export interface AuditServiceConfig {
  enabled: boolean;
  retentionDays: number;
  asyncLogging: boolean;
  logSensitiveData: boolean;
  logRequestBody: boolean;
  logResponseBody: boolean;
  excludedActions?: SharedAuditAction[];
  excludedPaths?: string[];
  // Batch processing
  batchSize?: number;
  flushIntervalMs?: number;
  // Storage
  storageType?: 'database' | 'file' | 'elasticsearch' | 'cloudwatch';
  // ✅ Enhanced with defaults from constants
  maxBatchSize?: number;
  compressionEnabled?: boolean;
  // Bangladesh specific
  logDistrictInfo?: boolean;
  logMobileOperator?: boolean;
  logNetworkType?: boolean;
}

// ============================================================
// Default Configuration (from shared-constants)
// ============================================================

export const DEFAULT_AUDIT_CONFIG: AuditServiceConfig = {
  enabled: true,
  retentionDays: AUDIT_CONFIG.RETENTION_DAYS,
  asyncLogging: true,
  logSensitiveData: false,
  logRequestBody: false,
  logResponseBody: false,
  batchSize: AUDIT_CONFIG.BATCH_SIZE,
  flushIntervalMs: AUDIT_CONFIG.FLUSH_INTERVAL_MS,
  storageType: 'database',
  maxBatchSize: AUDIT_CONFIG.MAX_BATCH_SIZE,
  compressionEnabled: false,
  logDistrictInfo: true,
  logMobileOperator: true,
  logNetworkType: false,
};

// ============================================================
// Audit Summary Report
// ============================================================

export interface AuditSummaryReport {
  period: {
    from: Date;
    to: Date;
  };
  totalEvents: number;
  uniqueUsers: number;
  uniqueActions: number;
  successRate: number;
  errorRate: number;
  topActions: Array<{ action: SharedAuditAction; count: number }>;
  topUsers: Array<{ userId: string; email: string; count: number }>;
  // Performance metrics
  averageResponseTimeMs: number;
  p95ResponseTimeMs: number;
  p99ResponseTimeMs: number;
  // Bangladesh specific
  topDistricts?: Array<{ district: string; count: number }>;
  topMobileOperators?: Array<{ operator: string; count: number }>;
  peakActivityHour?: number;
  generatedAt: Date;
}

// ============================================================
// Audit Retention Policy
// ============================================================

export interface AuditRetentionPolicy {
  retentionDays: number;
  archiveAfterDays: number;
  deleteAfterDays: number;
  archiveLocation?: string;
  compressionEnabled: boolean;
  excludeSeverity?: SharedAuditSeverity[];
}

// ============================================================
// Audit Service Interface (Enhanced)
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
    action: SharedAuditAction, 
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
    action: SharedAuditAction, 
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
    action: SharedAuditAction, 
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
    action: SharedAuditAction, 
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
    action: SharedAuditAction, 
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
    action: SharedAuditAction,
    userId: string,
    before: Record<string, unknown>,
    after: Record<string, unknown>,
    context?: AuditContext
  ): Promise<void>;
  
  /**
   * Log structured changes with field-level tracking
   * @param action - Audit action
   * @param userId - User ID
   * @param changes - Array of field changes
   * @param context - Audit context (optional)
   */
  logStructuredChange(
    action: SharedAuditAction,
    userId: string,
    changes: ChangeDetail[],
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
   * Generate audit summary report
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Audit summary report
   */
  generateSummaryReport(fromDate: Date, toDate: Date): Promise<AuditSummaryReport>;
  
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
   * Archive old audit logs
   * @param olderThanDays - Archive logs older than N days
   * @returns Archive result with file path
   */
  archiveOldLogs(olderThanDays: number): Promise<{ archivedCount: number; archivePath?: string }>;
  
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
   * Get audit trail for a specific request (distributed tracing)
   * @param correlationId - Correlation ID
   * @returns Array of audit entries for the request chain
   */
  getRequestAuditTrail(correlationId: string): Promise<AuditLogEntry[]>;
  
  /**
   * Check if audit logging is enabled
   */
  isEnabled(): boolean;
  
  /**
   * Get current audit configuration
   */
  getConfig(): AuditServiceConfig;
  
  /**
   * Update audit configuration (dynamic)
   * @param config - Partial configuration update
   */
  updateConfig(config: Partial<AuditServiceConfig>): Promise<void>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  AuditContext as AuditContextType, 
  AuditExportOptions as AuditExportOptionsType,
  AuditLogEntry as AuditLogEntryType,
  AuditQueryFilters as AuditQueryFiltersType,
  AuditStatistics as AuditStatisticsType,
  AuditSummaryReport as AuditSummaryReportType,
  AuditRetentionPolicy as AuditRetentionPolicyType,
  ChangeDetail as ChangeDetailType
};
