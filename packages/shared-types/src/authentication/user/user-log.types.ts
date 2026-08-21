/**
 * User Log Types Module
 * User logging and audit trail types for the e-commerce platform
 * Handles system logs, user activity logs, and audit trails
 */

import { UserId, Timestamp } from '../auth/core-primitives.types';

/**
 * Log Level
 * Severity levels for logs
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

/**
 * Log Category
 * Categories of logs
 */
export type LogCategory =
  | 'auth'
  | 'user'
  | 'order'
  | 'payment'
  | 'product'
  | 'inventory'
  | 'shipping'
  | 'system'
  | 'security'
  | 'admin'
  | 'api'
  | 'database'
  | 'cache'
  | 'queue'
  | 'cron';

/**
 * Log Status
 * Status of a log entry
 */
export type LogStatus = 'pending' | 'processed' | 'failed' | 'archived';

/**
 * Log Entry
 * System log entry
 */
export interface LogEntry {
  id: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  timestamp: Timestamp;
  userId?: UserId;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  sessionId?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
  stackTrace?: string;
  source?: string;
  status: LogStatus;
}

/**
 * Audit Log
 * Audit trail entry
 */
export interface AuditLog {
  id: string;
  userId: UserId;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: Record<string, unknown>;
  timestamp: Timestamp;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
  status: LogStatus;
}

/**
 * Log Create Request
 * Request to create log entry
 */
export interface LogCreateRequest {
  level: LogLevel;
  category: LogCategory;
  message: string;
  userId?: UserId;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  sessionId?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
  stackTrace?: string;
  source?: string;
}

/**
 * Log Create Response
 * Response after log creation
 */
export interface LogCreateResponse {
  success: boolean;
  data?: {
    logId: string;
    level: LogLevel;
    timestamp: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Audit Log Create Request
 * Request to create audit log
 */
export interface AuditLogCreateRequest {
  userId: UserId;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Audit Log Create Response
 * Response after audit log creation
 */
export interface AuditLogCreateResponse {
  success: boolean;
  data?: {
    auditId: string;
    userId: UserId;
    action: string;
    timestamp: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Log List Request
 * Request to list logs
 */
export interface LogListRequest {
  level?: LogLevel[];
  category?: LogCategory[];
  userId?: UserId;
  startDate?: Timestamp;
  endDate?: Timestamp;
  limit?: number;
  offset?: number;
  search?: string;
  sortBy?: 'timestamp' | 'level' | 'category';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Log List Response
 * Response after listing logs
 */
export interface LogListResponse {
  success: boolean;
  data?: {
    logs: LogEntry[];
    total: number;
    limit: number;
    offset: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Audit Log List Request
 * Request to list audit logs
 */
export interface AuditLogListRequest {
  userId?: UserId[];
  action?: string[];
  resource?: string[];
  startDate?: Timestamp;
  endDate?: Timestamp;
  limit?: number;
  offset?: number;
  sortBy?: 'timestamp' | 'action' | 'resource';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Audit Log List Response
 * Response after listing audit logs
 */
export interface AuditLogListResponse {
  success: boolean;
  data?: {
    logs: AuditLog[];
    total: number;
    limit: number;
    offset: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Log Filter
 * Filter criteria for log queries
 */
export interface LogFilter {
  level?: LogLevel[];
  category?: LogCategory[];
  userId?: UserId[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  ipAddress?: string[];
  search?: string;
  status?: LogStatus[];
}

/**
 * Log Statistics
 * Statistical data about logs
 */
export interface LogStatistics {
  totalLogs: number;
  byLevel: Record<LogLevel, number>;
  byCategory: Record<LogCategory, number>;
  byStatus: Record<LogStatus, number>;
  errorCount: number;
  warningCount: number;
  infoCount: number;
  debugCount: number;
  criticalCount: number;
  averageResponseTime: number;
  timestamp: Timestamp;
}

/**
 * Log Response Builder
 * Helper for building log responses
 */
export interface LogResponseBuilder {
  createSuccess(response: LogCreateResponse): LogCreateResponse;
  listSuccess(response: LogListResponse): LogListResponse;
  auditCreateSuccess(response: AuditLogCreateResponse): AuditLogCreateResponse;
  auditListSuccess(response: AuditLogListResponse): AuditLogListResponse;
  error(code: string, message: string, details?: Record<string, unknown>): LogErrorResponse;
}

/**
 * Log Error Response
 * Error response for log operations
 */
export interface LogErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Log Constants
 * Log-related constants
 */
export const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  CRITICAL: 'critical',
} as const;

export const LOG_CATEGORIES = {
  AUTH: 'auth',
  USER: 'user',
  ORDER: 'order',
  PAYMENT: 'payment',
  PRODUCT: 'product',
  INVENTORY: 'inventory',
  SHIPPING: 'shipping',
  SYSTEM: 'system',
  SECURITY: 'security',
  ADMIN: 'admin',
  API: 'api',
  DATABASE: 'database',
  CACHE: 'cache',
  QUEUE: 'queue',
  CRON: 'cron',
} as const;

export const LOG_STATUS = {
  PENDING: 'pending',
  PROCESSED: 'processed',
  FAILED: 'failed',
  ARCHIVED: 'archived',
} as const;

/**
 * Default Log Configuration
 */
export const DEFAULT_LOG_CONFIG = {
  retentionDays: 90,
  batchSize: 1000,
  enableAuditTrail: true,
  enableStackTrace: true,
  logRequestPayload: true,
  logResponsePayload: false,
  enableConsoleLogging: true,
  enableFileLogging: true,
  enableDatabaseLogging: true,
  minLogLevel: 'info' as LogLevel,
} as const;

/**
 * Log Archive
 * Archived log data
 */
export interface LogArchive {
  id: string;
  date: Timestamp;
  size: number;
  entries: number;
  filePath: string;
  checksum: string;
  createdAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Log Retention Policy
 * Log retention configuration
 */
export interface LogRetentionPolicy {
  maxAgeDays: number;
  maxSizeGB: number;
  archiveAfterDays: number;
  deleteAfterArchiveDays: number;
  compressArchives: boolean;
  encryptArchives: boolean;
  archivePath: string;
}
