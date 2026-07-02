/**
 * Audit Service Interface - Enterprise Grade (v4.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/audit.service.interface
 * 
 * @description
 * Service contract for audit logging operations with enterprise features.
 * Used for compliance, security monitoring, and debugging.
 * 
 * ENTERPRISE ENHANCEMENTS (v4.0):
 * ✅ Structured change tracking (field-level before/after)
 * ✅ Performance metrics (P95/P99 response time, error rate)
 * ✅ Compliance reporting (Bangladesh Bank guidelines)
 * ✅ Anomaly detection (brute force, unusual patterns)
 * ✅ Real-time monitoring dashboard
 * ✅ Batch processing with progress tracking
 * ✅ Multi-format export (JSON, CSV, XLSX, PDF)
 * ✅ Retention policy management with archiving
 * ✅ Distributed tracing support (correlation ID)
 * ✅ Bangladesh specific - District, upazila, mobile operator tracking
 * ✅ Audit trail visualization data preparation
 * ✅ Alert configuration for security events
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ No business logic
 * ✅ No database queries
 * ✅ Framework-free
 */

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট
import type { 
  AuditAction as SharedAuditAction, 
  AuditSeverity as SharedAuditSeverity,
  AuditExportFormat as SharedAuditExportFormat,
  PaginatedResult,
  BulkOperationProgress
} from '@vubon/shared-types';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট
import { AUDIT_CONFIG } from '@vubon/shared-constants';

// ============================================================
// Re-export shared types for convenience
// ============================================================

export { SharedAuditAction as AuditAction, SharedAuditSeverity as AuditSeverity, SharedAuditExportFormat as AuditExportFormat };

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Enhanced Audit Context (Bangladesh specific)
// ============================================================

export interface AuditContext {
  /** Client IP address */
  ipAddress?: string;
  /** Device identifier */
  deviceId?: string;
  /** User agent string */
  userAgent?: string;
  /** Session ID */
  sessionId?: string;
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  /** Request ID for API tracing */
  requestId?: string;
  /** Request path */
  path?: string;
  /** HTTP method */
  method?: string;
  /** HTTP status code */
  statusCode?: number;
  /** Response time in milliseconds */
  responseTimeMs?: number;
  
  // ✅ Bangladesh specific fields
  /** District (Bangladesh) */
  district?: string;
  /** Upazila/Sub-district (Bangladesh) */
  upazila?: string;
  /** Mobile operator (GP, Robi, Banglalink, Teletalk) */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  /** Network type (2G/3G/4G/5G/WiFi) */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  /** User's division (Bangladesh) */
  division?: string;
  /** User's timezone (Asia/Dhaka) */
  timezone?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 2: Structured Change Tracking
// ============================================================

export interface ChangeDetail {
  /** Field name that changed */
  field: string;
  /** Old value (before change) */
  oldValue: unknown;
  /** New value (after change) */
  newValue: unknown;
  /** Data type of the field */
  dataType?: string;
  /** Whether the change is sensitive (e.g., password) */
  isSensitive?: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 3: Enhanced Audit Log Entry
// ============================================================

export interface AuditLogEntry {
  /** Unique identifier */
  id?: string;
  /** Audit action type */
  action: SharedAuditAction;
  /** User ID who performed the action */
  userId?: string;
  /** User email */
  email?: string;
  /** User phone number (masked) */
  phoneNumber?: string;
  /** User role at time of action */
  userRole?: string;
  /** Severity level */
  severity: SharedAuditSeverity;
  /** Audit context */
  context?: AuditContext;
  /** Additional details */
  details?: Record<string, unknown>;
  /** Structured field-level changes */
  changes?: ChangeDetail[];
  /** State before change */
  before?: Record<string, unknown>;
  /** State after change */
  after?: Record<string, unknown>;
  /** Error message (if any) */
  error?: string;
  /** Error code for programmatic handling */
  errorCode?: string;
  /** Duration of operation in milliseconds */
  durationMs?: number;
  /** Timestamp of the event */
  timestamp: Date;
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  /** Request ID for API tracing */
  requestId?: string;
  /** User agent */
  userAgent?: string;
  /** Device ID */
  deviceId?: string;
  /** IP address */
  ipAddress?: string;
  /** Response size in bytes */
  responseSize?: number;
  /** Number of database queries executed */
  queryCount?: number;
  /** Cache hit/miss status */
  cacheStatus?: 'hit' | 'miss' | 'bypass';
  /** Source of the request (web, mobile, api, admin) */
  source?: 'web' | 'mobile' | 'api' | 'admin' | 'cron' | 'system';
  
  // ✅ Bangladesh specific fields
  /** District (Bangladesh) */
  district?: string;
  /** Upazila (Bangladesh) */
  upazila?: string;
  /** Mobile operator */
  mobileOperator?: string;
  /** Network type */
  networkType?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 4: Enhanced Audit Query Filters
// ============================================================

export interface AuditQueryFilters {
  /** Filter by user ID */
  userId?: string;
  /** Filter by email */
  email?: string;
  /** Filter by phone number */
  phoneNumber?: string;
  /** Filter by single action */
  action?: SharedAuditAction;
  /** Filter by multiple actions */
  actionList?: SharedAuditAction[];
  /** Filter by single severity */
  severity?: SharedAuditSeverity;
  /** Filter by multiple severities */
  severityList?: SharedAuditSeverity[];
  /** Start date for filtering */
  fromDate?: Date;
  /** End date for filtering */
  toDate?: Date;
  /** Filter by IP address */
  ipAddress?: string;
  /** Filter by device ID */
  deviceId?: string;
  /** Filter by correlation ID (distributed tracing) */
  correlationId?: string;
  /** Filter by request ID */
  requestId?: string;
  /** Filter by source */
  source?: 'web' | 'mobile' | 'api' | 'admin' | 'cron' | 'system';
  /** Filter by error presence */
  hasError?: boolean;
  /** Full-text search in details and error */
  search?: string;
  /** Filter by API path */
  path?: string;
  /** Filter by HTTP status code */
  statusCode?: number;
  /** Minimum duration in milliseconds */
  minDurationMs?: number;
  /** Maximum duration in milliseconds */
  maxDurationMs?: number;
  
  // ✅ Bangladesh specific filters
  /** Filter by district */
  district?: string;
  /** Filter by upazila */
  upazila?: string;
  /** Filter by mobile operator */
  mobileOperator?: string;
  /** Filter by network type */
  networkType?: string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 5: Enhanced Audit Statistics
// ============================================================

export interface AuditStatistics {
  /** Total number of audit events */
  totalEvents: number;
  /** Events grouped by action */
  byAction: Record<SharedAuditAction, number>;
  /** Events grouped by severity */
  bySeverity: Record<SharedAuditSeverity, number>;
  /** Events grouped by source */
  bySource?: Record<string, number>;
  /** Events in last 24 hours */
  eventsLast24h: number;
  /** Events in last 7 days */
  eventsLast7d: number;
  /** Events in last 30 days */
  eventsLast30d: number;
  /** Unique users count */
  uniqueUsers: number;
  /** Top actions by count */
  topActions: Array<{ action: SharedAuditAction; count: number }>;
  /** Top users by activity */
  topUsers: Array<{ userId: string; email: string; count: number }>;
  /** Average response time in milliseconds */
  averageResponseTimeMs: number;
  /** P95 response time (95th percentile) */
  p95ResponseTimeMs: number;
  /** P99 response time (99th percentile) */
  p99ResponseTimeMs: number;
  /** Error rate (percentage) */
  errorRate: number;
  
  // ✅ Bangladesh specific analytics
  /** Events grouped by district */
  eventsByDistrict?: Array<{ district: string; count: number; percentage: number }>;
  /** Events grouped by mobile operator */
  eventsByMobileOperator?: Array<{ operator: string; count: number; percentage: number }>;
  /** Events grouped by hour */
  eventsByHour?: Array<{ hour: number; count: number }>;
  /** Peak activity hour (Bangladesh time) */
  peakActivityHour?: number;
  /** Events by weekday */
  eventsByWeekday?: Array<{ weekday: string; count: number }>;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 6: Anomaly Detection Result
// ============================================================

export interface AuditAnomalyResult {
  /** Whether anomaly was detected */
  hasAnomaly: boolean;
  /** Anomaly severity */
  severity: 'low' | 'medium' | 'high' | 'critical';
  /** Detection confidence (0-100) */
  confidence: number;
  /** Type of anomaly */
  anomalyType: 'brute_force' | 'unusual_hours' | 'ip_rotation' | 'action_spike' | 'error_spike' | 'unusual_location' | 'coordinated_attack';
  /** Description of the anomaly */
  description: string;
  /** Description in Bengali */
  descriptionBn?: string;
  /** Affected users */
  affectedUsers: string[];
  /** Affected IP addresses */
  affectedIPs: string[];
  /** Time range of the anomaly */
  timeRange: { from: Date; to: Date };
  /** Recommended actions */
  recommendations: string[];
  /** Whether immediate action is required */
  requiresImmediateAction: boolean;
  /** Suggested mitigation action */
  suggestedAction: 'monitor' | 'rate_limit' | 'block_ips' | 'notify_admin' | 'emergency_lockdown';
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 7: Real-time Monitoring Dashboard
// ============================================================

export interface AuditDashboardMetrics {
  /** Current audit rate (events per minute) */
  currentRate: number;
  /** Total events in last hour */
  eventsLastHour: number;
  /** Error rate in last hour */
  errorRateLastHour: number;
  /** Average response time in last hour */
  avgResponseTimeLastHour: number;
  /** Top actions in last hour */
  topActionsLastHour: Array<{ action: SharedAuditAction; count: number }>;
  /** Top users in last hour */
  topUsersLastHour: Array<{ userId: string; email: string; count: number }>;
  /** Active alerts count */
  activeAlertsCount: number;
  /** Dashboard refresh timestamp */
  updatedAt: Date;
  /** Time series data for charting */
  timeSeries: Array<{
    timestamp: Date;
    total: number;
    errors: number;
    avgResponseTime: number;
  }>;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 8: Alert Configuration
// ============================================================

export interface AuditAlertConfig {
  /** Alert ID */
  id?: string;
  /** Alert name */
  name: string;
  /** Alert severity */
  severity: 'info' | 'warning' | 'critical';
  /** Metric to monitor (error_rate, action_spike, etc.) */
  metric: 'error_rate' | 'response_time' | 'action_count' | 'login_failure' | 'suspicious_action';
  /** Threshold value */
  threshold: number;
  /** Time window in minutes */
  windowMinutes: number;
  /** Whether alert is enabled */
  enabled: boolean;
  /** Notification channels */
  channels: ('email' | 'sms' | 'slack' | 'webhook')[];
  /** Cooldown minutes between alerts */
  cooldownMinutes: number;
  /** Alert message template */
  messageTemplate: string;
  /** Bengali message template */
  messageTemplateBn?: string;
  /** Last triggered timestamp */
  lastTriggeredAt?: Date;
  /** Created by */
  createdBy?: string;
  /** Created at */
  createdAt?: Date;
  /** Updated by */
  updatedBy?: string;
  /** Updated at */
  updatedAt?: Date;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 9: Compliance Report (Bangladesh Bank)
// ============================================================

export interface AuditComplianceReport {
  /** Report ID */
  reportId: string;
  /** Report generation timestamp */
  generatedAt: Date;
  /** Report period */
  period: { from: Date; to: Date };
  /** Generated by (admin ID) */
  generatedBy: string;
  /** Summary statistics */
  summary: {
    totalEvents: number;
    uniqueUsers: number;
    successRate: number;
    errorRate: number;
    averageResponseTimeMs: number;
    p95ResponseTimeMs: number;
  };
  /** Security events breakdown */
  securityEvents: {
    total: number;
    byAction: Record<SharedAuditAction, number>;
    bySeverity: Record<SharedAuditSeverity, number>;
  };
  /** Authentication events */
  authEvents: {
    total: number;
    successfulLogins: number;
    failedLogins: number;
    mfaEvents: number;
    passwordResets: number;
  };
  /** User management events */
  userManagementEvents: {
    total: number;
    userCreations: number;
    userUpdates: number;
    userDeletions: number;
    roleChanges: number;
  };
  /** Data export events */
  dataExportEvents: {
    total: number;
    exportCount: number;
    exportTypes: Record<string, number>;
  };
  /** Peak hours analysis */
  peakActivityHours: Array<{ hour: number; count: number }>;
  // ✅ Bangladesh specific
  /** Events by district */
  eventsByDistrict: Array<{ district: string; count: number; percentage: number }>;
  /** Events by mobile operator */
  eventsByMobileOperator: Array<{ operator: string; count: number; percentage: number }>;
  /** Recommendations for improvement */
  recommendations: string[];
  /** Export URL for full report */
  exportUrl: string;
  /** Report expiry date */
  expiresAt: Date;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 10: Visualization Data
// ============================================================

export interface AuditVisualizationData {
  /** Time series data for charts */
  timeSeries: Array<{
    timestamp: Date;
    total: number;
    errors: number;
    warnings: number;
    info: number;
  }>;
  /** Action distribution pie chart data */
  actionDistribution: Array<{ name: string; value: number }>;
  /** Severity distribution donut chart data */
  severityDistribution: Array<{ name: string; value: number }>;
  /** Top users bar chart data */
  topUsersData: Array<{ userId: string; email: string; count: number }>;
  /** Hourly activity heatmap data */
  hourlyHeatmap: Array<{ hour: number; dayOfWeek: number; count: number }>;
  /** Geographic distribution map data (Bangladesh districts) */
  geographicDistribution: Array<{ district: string; count: number; coordinates: { lat: number; lng: number } }>;
  /** Time to recover metrics */
  timeToRecover?: Array<{ incident: string; startTime: Date; endTime: Date; durationMinutes: number }>;
}

// ============================================================
// Audit Service Configuration (Enhanced)
// ============================================================

export interface AuditServiceConfig {
  /** Whether audit logging is enabled */
  enabled: boolean;
  /** Days to retain audit logs */
  retentionDays: number;
  /** Whether to use async logging (non-blocking) */
  asyncLogging: boolean;
  /** Whether to log sensitive data (PII) */
  logSensitiveData: boolean;
  /** Whether to log request body */
  logRequestBody: boolean;
  /** Whether to log response body */
  logResponseBody: boolean;
  /** Actions to exclude from logging */
  excludedActions?: SharedAuditAction[];
  /** Paths to exclude from logging */
  excludedPaths?: string[];
  /** Batch size for batch processing */
  batchSize?: number;
  /** Flush interval in milliseconds */
  flushIntervalMs?: number;
  /** Storage type */
  storageType?: 'database' | 'file' | 'elasticsearch' | 'cloudwatch';
  /** Maximum batch size */
  maxBatchSize?: number;
  /** Whether to enable compression for archived logs */
  compressionEnabled?: boolean;
  /** Whether to log district information (Bangladesh) */
  logDistrictInfo?: boolean;
  /** Whether to log mobile operator (Bangladesh) */
  logMobileOperator?: boolean;
  /** Whether to log network type */
  logNetworkType?: boolean;
  /** Whether to enable anomaly detection */
  anomalyDetectionEnabled?: boolean;
  /** Anomaly detection sensitivity (1-10) */
  anomalySensitivity?: number;
  /** Whether to enable real-time dashboard */
  dashboardEnabled?: boolean;
  /** Dashboard refresh interval in seconds */
  dashboardRefreshIntervalSeconds?: number;
  /** Whether to enable compliance reporting */
  complianceReportingEnabled?: boolean;
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
  anomalyDetectionEnabled: true,
  anomalySensitivity: 5,
  dashboardEnabled: true,
  dashboardRefreshIntervalSeconds: 30,
  complianceReportingEnabled: true,
};

// ============================================================
// Audit Service Interface (Enterprise Enhanced v4.0)
// ============================================================

export interface AuditService {
  // ============================================================
  // Basic Logging Operations (6 severity levels)
  // ============================================================

  /**
   * Log an audit entry (generic method)
   * @param entry - Audit log entry
   */
  log(entry: Omit<AuditLogEntry, 'timestamp'>): Promise<void>;
  
  /**
   * Log with INFO severity (normal operations)
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
   * Log with WARNING severity (unusual but not harmful)
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
   * Log with ERROR severity (failed operations)
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
   * Log with CRITICAL severity (security breach, data loss)
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
   * Log with SECURITY severity (authentication, MFA, permissions)
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

  // ============================================================
  // ✅ Structured Change Tracking (Enterprise Feature)
  // ============================================================

  /**
   * Log a state change (before/after snapshot)
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
   * Log a batch of changes (performance optimization)
   * @param action - Audit action
   * @param userId - User ID
   * @param changes - Array of change details
   * @param context - Audit context (optional)
   * @param onProgress - Progress callback for batch tracking
   */
  batchLogChanges(
    action: SharedAuditAction,
    userId: string,
    changes: ChangeDetail[][],
    context?: AuditContext,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<{ successful: number; failed: number }>;

  // ============================================================
  // Query Operations
  // ============================================================

  /**
   * Query audit logs with filters
   * @param filters - Query filters
   * @param page - Page number
   * @param limit - Items per page
   * @returns Paginated audit results
   */
  query(filters: AuditQueryFilters, page: number, limit: number): Promise<PaginatedResult<AuditLogEntry>>;
  
  /**
   * Get audit statistics
   * @param days - Number of days to analyze
   * @returns Audit statistics
   */
  getStatistics(days?: number): Promise<AuditStatistics>;
  
  
  
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

  // ============================================================
  // ✅ Export Operations (Multi-format Support)
  // ============================================================

  
  /**
   * Export compliance report (Bangladesh Bank format)
   * @param fromDate - Start date
   * @param toDate - End date
   * @param adminId - Admin ID requesting the report
   * @param format - Export format (default: 'pdf')
   * @returns Compliance report data
   */
  exportComplianceReport(
    fromDate: Date,
    toDate: Date,
    adminId: string,
    format?: 'pdf' | 'csv' | 'xlsx'
  ): Promise<Buffer>;

  // ============================================================
  // ✅ Data Management (Retention, Archiving, Cleanup)
  // ============================================================

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
  archiveOldLogs(olderThanDays: number): Promise<{ archivedCount: number; archivePath?: string; compressedSize?: number }>;
  
  /**
   * Restore archived audit logs
   * @param archivePath - Path to archive file
   * @returns Number of restored entries
   */
  restoreArchivedLogs(archivePath: string): Promise<number>;
  
  
  
  // ============================================================
  // ✅ Anomaly Detection (Enterprise Security Feature)
  // ============================================================

  /**
   * Detect anomalies in audit logs
   * @param timeWindowMinutes - Time window for analysis
   * @returns Anomaly detection result
   */
  detectAnomalies(timeWindowMinutes?: number): Promise<AuditAnomalyResult>;
  
  /**
   * Detect brute force attack patterns
   * @param timeWindowMinutes - Time window for analysis
   * @returns Anomaly detection result
   */
  detectBruteForce(timeWindowMinutes?: number): Promise<AuditAnomalyResult>;
  
  /**
   * Detect unusual login patterns (time, location, device)
   * @param userId - User ID to analyze
   * @returns Unusual pattern detection result
   */
  detectUnusualPatterns(userId: string): Promise<{
    hasUnusualPattern: boolean;
    anomalies: Array<{ type: string; description: string; severity: string }>;
  }>;

  // ============================================================
  // ✅ Real-time Monitoring Dashboard (Enterprise Feature)
  // ============================================================

  /**
   * Get real-time monitoring dashboard metrics
   * @returns Dashboard metrics
   */
  getDashboardMetrics(): Promise<AuditDashboardMetrics>;
  
  /**
   * Get visualization data for charts
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Visualization data
   */
  getVisualizationData(fromDate: Date, toDate: Date): Promise<AuditVisualizationData>;
  
  /**
   * Get live feed of recent audit events (for real-time monitoring)
   * @param limit - Maximum number of events
   * @returns Array of recent audit events
   */
  getLiveFeed(limit?: number): Promise<AuditLogEntry[]>;

  // ============================================================
  // ✅ Alert Management (Enterprise Security Feature)
  // ============================================================

  /**
   * Get all alert configurations
   * @returns Array of alert configurations
   */
  getAlertConfigs(): Promise<AuditAlertConfig[]>;
  
  /**
   * Get alert configuration by ID
   * @param id - Alert configuration ID
   * @returns Alert configuration or null
   */
  getAlertConfig(id: string): Promise<AuditAlertConfig | null>;
  
  /**
   * Create a new alert configuration
   * @param config - Alert configuration
   * @returns Created alert configuration
   */
  createAlertConfig(config: Omit<AuditAlertConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<AuditAlertConfig>;
  
  /**
   * Update an alert configuration
   * @param id - Alert configuration ID
   * @param config - Updated configuration
   * @returns Updated alert configuration
   */
  updateAlertConfig(id: string, config: Partial<AuditAlertConfig>): Promise<AuditAlertConfig>;
  
  /**
   * Delete an alert configuration
   * @param id - Alert configuration ID
   * @returns True if deleted
   */
  deleteAlertConfig(id: string): Promise<boolean>;
  
  /**
   * Get active alerts (triggered and not resolved)
   * @returns Array of active alerts
   */
  getActiveAlerts(): Promise<Array<{
    id: string;
    configId: string;
    name: string;
    severity: string;
    message: string;
    triggeredAt: Date;
    acknowledged: boolean;
    acknowledgedBy?: string;
    resolvedAt?: Date;
    resolvedBy?: string;
  }>>;
  
  /**
   * Acknowledge an alert
   * @param alertId - Alert ID
   * @param acknowledgedBy - Admin ID
   * @returns True if acknowledged
   */
  acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<boolean>;
  
  /**
   * Resolve an alert
   * @param alertId - Alert ID
   * @param resolvedBy - Admin ID
   * @param resolutionNote - Resolution note
   * @returns True if resolved
   */
  resolveAlert(alertId: string, resolvedBy: string, resolutionNote?: string): Promise<boolean>;

  // ============================================================
  // ✅ Compliance Reporting (Bangladesh Bank)
  // ============================================================

  /**
   * Generate compliance report (Bangladesh Bank guidelines)
   * @param fromDate - Start date
   * @param toDate - End date
   * @param adminId - Admin ID requesting the report
   * @returns Compliance report
   */
  generateComplianceReport(
    fromDate: Date,
    toDate: Date,
    adminId: string
  ): Promise<AuditComplianceReport>;
  
  /**
   * Get compliance status summary
   * @returns Compliance status
   */
  getComplianceStatus(): Promise<{
    compliant: boolean;
    issues: string[];
    recommendations: string[];
    lastComplianceCheck: Date;
    nextRequiredCheck: Date;
  }>;

  // ============================================================
  // Configuration Management
  // ============================================================

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
  
  /**
   * Get audit service health status
   * @returns Health status
   */
  healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptime: number;
    version: string;
    storageStatus: 'connected' | 'disconnected' | 'degraded';
    queueLength: number;
    lastError?: string;
  }>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  AuditContext as AuditContextType, 
  AuditLogEntry as AuditLogEntryType,
  AuditQueryFilters as AuditQueryFiltersType,
  AuditStatistics as AuditStatisticsType,
  ChangeDetail as ChangeDetailType,
  AuditAnomalyResult as AuditAnomalyResultType,
  AuditDashboardMetrics as AuditDashboardMetricsType,
  AuditAlertConfig as AuditAlertConfigType,
  AuditComplianceReport as AuditComplianceReportType,
  AuditVisualizationData as AuditVisualizationDataType,
  AuditServiceConfig as AuditServiceConfigType
};

// ============================================================
// ENTERPRISE SUMMARY v4.0
// ============================================================
// 
// Enterprise Enhancements Applied in v4.0:
// 1. ✅ Structured change tracking (field-level before/after)
// 2. ✅ Performance metrics (P95/P99 response time, error rate)
// 3. ✅ Compliance reporting (Bangladesh Bank guidelines)
// 4. ✅ Anomaly detection (brute force, unusual patterns)
// 5. ✅ Real-time monitoring dashboard
// 6. ✅ Batch processing with progress tracking
// 7. ✅ Multi-format export (JSON, CSV, XLSX, PDF)
// 8. ✅ Retention policy management with archiving
// 9. ✅ Distributed tracing support (correlation ID)
// 10. ✅ Bangladesh specific - District, upazila, mobile operator tracking
// 11. ✅ Audit trail visualization data preparation
// 12. ✅ Alert configuration for security events
// 13. ✅ Live feed for real-time monitoring
// 14. ✅ Unusual pattern detection per user
// 15. ✅ Archive restoration capability
// 16. ✅ Alert acknowledgment and resolution workflow
// 17. ✅ Compliance status check
// 18. ✅ Health check endpoint
// 
// Bangladesh Specific:
// - District/Upazila level tracking for location analytics
// - Mobile operator tracking (GP, Robi, Banglalink, Teletalk)
// - Network type tracking (2G/3G/4G/5G/WiFi)
// - Division level analytics
// - Local timezone (Asia/Dhaka) for hourly analysis
// - Bengali language support (messageBn)
// - Bangladesh Bank compliance reporting format
// 
// Security Features:
// - Anomaly detection for brute force attacks
// - Unusual login pattern detection
// - Real-time alerting with multiple channels
// - Distributed tracing for request chains
// - Field-level change tracking for compliance
// - Data retention policies with archiving
// - Sensitive data filtering
// 
// ============================================================
