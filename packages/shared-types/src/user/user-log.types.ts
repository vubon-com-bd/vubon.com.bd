/**
 * User Log Types
 * Types for user log management, tracking, and analysis
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
import {
  USER_LOG_TYPE,
  USER_LOG_LEVEL,
  USER_LOG_STATUS,
  USER_LOG_CATEGORY,
  USER_LOG_SOURCE,
  USER_LOG_TYPE_LABELS,
  USER_LOG_LEVEL_LABELS,
  USER_LOG_STATUS_LABELS,
  USER_LOG_CATEGORY_LABELS,
  USER_LOG_SOURCE_LABELS,
  USER_LOG_TYPE_RETENTION_MAP,
  USER_LOG_RETENTION,
} from '@vubon/shared-constants';

// ============================================================
// USER LOG TYPES
// ============================================================

/**
 * User log type
 */
export type UserLogType = (typeof USER_LOG_TYPE)[keyof typeof USER_LOG_TYPE];

/**
 * User log level
 */
export type UserLogLevel = (typeof USER_LOG_LEVEL)[keyof typeof USER_LOG_LEVEL];

/**
 * User log status
 */
export type UserLogStatus = (typeof USER_LOG_STATUS)[keyof typeof USER_LOG_STATUS];

/**
 * User log category
 */
export type UserLogCategory = (typeof USER_LOG_CATEGORY)[keyof typeof USER_LOG_CATEGORY];

/**
 * User log source
 */
export type UserLogSource = (typeof USER_LOG_SOURCE)[keyof typeof USER_LOG_SOURCE];

/**
 * User log retention
 */
export type UserLogRetention = (typeof USER_LOG_RETENTION)[keyof typeof USER_LOG_RETENTION];

// ============================================================
// USER LOG LEVEL SCORE MAP (Local definition)
// ============================================================

/**
 * User log level severity scores
 */
export const USER_LOG_LEVEL_SCORE: Record<UserLogLevel, number> = {
  debug: 10,
  info: 20,
  warning: 30,
  error: 40,
  critical: 50,
  fatal: 60,
};

// ============================================================
// USER LOG CATEGORY MAP (Local definition)
// ============================================================

/**
 * User log category from type map
 */
export const USER_LOG_TYPE_CATEGORY_MAP: Record<UserLogType, UserLogCategory> = {
  authentication: 'security',
  access: 'system',
  activity: 'user',
  error: 'technical',
  security: 'security',
  audit: 'security',
  system: 'system',
  performance: 'technical',
  debug: 'technical',
  transaction: 'business',
  notification: 'user',
  payment: 'business',
  api: 'technical',
  webhook: 'technical',
};

// ============================================================
// USER LOG RECORD
// ============================================================

/**
 * User log record
 */
export interface UserLogRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Log type */
  type: UserLogType;
  /** Log level */
  level: UserLogLevel;
  /** Log status */
  status: UserLogStatus;
  /** Log category */
  category: UserLogCategory;
  /** Log source */
  source: UserLogSource;
  /** Log message */
  message: string;
  /** Detailed log data */
  data?: JsonObject;
  /** Error details (if any) */
  error?: {
    code?: string;
    message?: string;
    stack?: string;
  };
  /** IP address of the request */
  ipAddress?: string;
  /** User agent of the request */
  userAgent?: string;
  /** Session ID */
  sessionId?: ID;
  /** Device ID */
  deviceId?: ID;
  /** Request ID for tracing */
  requestId?: string;
  /** Retention period in days */
  retentionDays: UserLogRetention;
  /** When the log was created */
  createdAt: Timestamp;
  /** When the log expires (based on retention) */
  expiresAt?: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER LOG FILTER
// ============================================================

/**
 * User log filter
 */
export interface UserLogFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by log type */
  type?: UserLogType | UserLogType[];
  /** Filter by log level */
  level?: UserLogLevel | UserLogLevel[];
  /** Filter by log status */
  status?: UserLogStatus | UserLogStatus[];
  /** Filter by log category */
  category?: UserLogCategory | UserLogCategory[];
  /** Filter by log source */
  source?: UserLogSource | UserLogSource[];
  /** Filter by session ID */
  sessionId?: ID;
  /** Filter by device ID */
  deviceId?: ID;
  /** Filter by request ID */
  requestId?: string;
  /** Filter by date range */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Search by message or data */
  search?: string;
  /** Filter by severity (minimum level) */
  minLevel?: UserLogLevel;
}

// ============================================================
// USER LOG SUMMARY
// ============================================================

/**
 * User log summary
 */
export interface UserLogSummary {
  /** Total number of logs */
  totalLogs: number;
  /** Number of logs by type */
  logsByType: Record<UserLogType, number>;
  /** Number of logs by level */
  logsByLevel: Record<UserLogLevel, number>;
  /** Number of logs by status */
  logsByStatus: Record<UserLogStatus, number>;
  /** Number of logs by category */
  logsByCategory: Record<UserLogCategory, number>;
  /** Number of logs by source */
  logsBySource: Record<UserLogSource, number>;
  /** Most recent log */
  latestLog?: UserLogRecord;
  /** Time period covered */
  period: {
    start: Date;
    end: Date;
  };
}

// ============================================================
// USER LOG STATISTICS
// ============================================================

/**
 * User log statistics
 */
export interface UserLogStatistics {
  /** Total logs in period */
  total: number;
  /** Average logs per day */
  averagePerDay: number;
  /** Peak log time (hour of day) */
  peakHour: number;
  /** Error rate (error + fatal logs / total) */
  errorRate: number;
  /** Most active user */
  mostActiveUser?: {
    userId: ID;
    logCount: number;
  };
  /** Most common log type */
  mostCommonType?: UserLogType;
  /** Most common log source */
  mostCommonSource?: UserLogSource;
}

// ============================================================
// USER LOG CONFIG
// ============================================================

/**
 * User log configuration
 */
export interface UserLogConfig {
  /** Default retention period in days */
  defaultRetention: UserLogRetention;
  /** Retention period by log type */
  retentionByType: Record<UserLogType, UserLogRetention>;
  /** Minimum log level to store */
  minLogLevel: UserLogLevel;
  /** Whether to store request details */
  storeRequestDetails: boolean;
  /** Whether to store error stacks */
  storeErrorStacks: boolean;
  /** Maximum log message length */
  maxMessageLength: number;
  /** Maximum log data size in bytes */
  maxDataSize: number;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user log type is valid
 */
export function isValidUserLogType(type: string): type is UserLogType {
  return Object.values(USER_LOG_TYPE).includes(type as UserLogType);
}

/**
 * Check if user log level is valid
 */
export function isValidUserLogLevel(level: string): level is UserLogLevel {
  return Object.values(USER_LOG_LEVEL).includes(level as UserLogLevel);
}

/**
 * Check if user log status is valid
 */
export function isValidUserLogStatus(status: string): status is UserLogStatus {
  return Object.values(USER_LOG_STATUS).includes(status as UserLogStatus);
}

/**
 * Check if user log category is valid
 */
export function isValidUserLogCategory(category: string): category is UserLogCategory {
  return Object.values(USER_LOG_CATEGORY).includes(category as UserLogCategory);
}

/**
 * Check if user log source is valid
 */
export function isValidUserLogSource(source: string): source is UserLogSource {
  return Object.values(USER_LOG_SOURCE).includes(source as UserLogSource);
}

/**
 * Check if user log retention is valid
 */
export function isValidUserLogRetention(days: number): days is UserLogRetention {
  return Object.values(USER_LOG_RETENTION).includes(days as UserLogRetention);
}

/**
 * Get user log type display name
 */
export function getUserLogTypeDisplayName(type: UserLogType): string {
  return USER_LOG_TYPE_LABELS[type] || type;
}

/**
 * Get user log level display name
 */
export function getUserLogLevelDisplayName(level: UserLogLevel): string {
  return USER_LOG_LEVEL_LABELS[level] || level;
}

/**
 * Get user log status display name
 */
export function getUserLogStatusDisplayName(status: UserLogStatus): string {
  return USER_LOG_STATUS_LABELS[status] || status;
}

/**
 * Get user log category display name
 */
export function getUserLogCategoryDisplayName(category: UserLogCategory): string {
  return USER_LOG_CATEGORY_LABELS[category] || category;
}

/**
 * Get user log source display name
 */
export function getUserLogSourceDisplayName(source: UserLogSource): string {
  return USER_LOG_SOURCE_LABELS[source] || source;
}

/**
 * Get user log category from type
 */
export function getUserLogCategoryFromType(type: UserLogType): UserLogCategory {
  return USER_LOG_TYPE_CATEGORY_MAP[type] || USER_LOG_CATEGORY.SYSTEM;
}

/**
 * Get user log level score (severity)
 */
export function getUserLogLevelScore(level: UserLogLevel): number {
  return USER_LOG_LEVEL_SCORE[level] || 0;
}

/**
 * Get user log retention from type
 */
export function getUserLogRetentionFromType(type: UserLogType): UserLogRetention {
  return (USER_LOG_TYPE_RETENTION_MAP[type] || USER_LOG_RETENTION.THIRTY_DAYS) as UserLogRetention;
}

/**
 * Check if user log level is severe (error, critical, fatal)
 */
export function isUserLogLevelSevere(level: UserLogLevel): boolean {
  const severeLevels: UserLogLevel[] = ['error', 'critical', 'fatal'];
  return severeLevels.includes(level);
}

/**
 * Check if user log level is warning or above
 */
export function isUserLogLevelWarningOrAbove(level: UserLogLevel): boolean {
  const warningAndAbove: UserLogLevel[] = ['warning', 'error', 'critical', 'fatal'];
  return warningAndAbove.includes(level);
}

/**
 * Check if user log level is info or below
 */
export function isUserLogLevelInfoOrBelow(level: UserLogLevel): boolean {
  const infoAndBelow: UserLogLevel[] = ['debug', 'info'];
  return infoAndBelow.includes(level);
}

/**
 * Get all user log types
 */
export function getAllUserLogTypes(): UserLogType[] {
  return Object.values(USER_LOG_TYPE);
}

/**
 * Get all user log levels
 */
export function getAllUserLogLevels(): UserLogLevel[] {
  return Object.values(USER_LOG_LEVEL);
}

/**
 * Get all user log statuses
 */
export function getAllUserLogStatuses(): UserLogStatus[] {
  return Object.values(USER_LOG_STATUS);
}

/**
 * Get all user log categories
 */
export function getAllUserLogCategories(): UserLogCategory[] {
  return Object.values(USER_LOG_CATEGORY);
}

/**
 * Get all user log sources
 */
export function getAllUserLogSources(): UserLogSource[] {
  return Object.values(USER_LOG_SOURCE);
}

/**
 * Get user security log types
 */
export function getUserSecurityLogTypes(): UserLogType[] {
  return ['authentication', 'security', 'audit'];
}

/**
 * Get user system log types
 */
export function getUserSystemLogTypes(): UserLogType[] {
  return ['access', 'system', 'performance'];
}

/**
 * Get user business log types
 */
export function getUserBusinessLogTypes(): UserLogType[] {
  return ['transaction', 'payment'];
}

/**
 * Get user technical log types
 */
export function getUserTechnicalLogTypes(): UserLogType[] {
  return ['error', 'debug', 'api', 'webhook'];
}

/**
 * Create user log record
 */
export function createUserLogRecord(
  userId: ID,
  type: UserLogType,
  level: UserLogLevel,
  message: string,
  data?: JsonObject
): Omit<UserLogRecord, 'id' | 'createdAt'> {
  const category = getUserLogCategoryFromType(type);
  const retentionDays = getUserLogRetentionFromType(type);
  const now = new Date();
  const expiresAt =
    retentionDays > 0 ? new Date(now.getTime() + retentionDays * 24 * 60 * 60 * 1000) : undefined;

  return {
    userId,
    type,
    level,
    status: 'active',
    category,
    source: 'api',
    message,
    data,
    retentionDays,
    expiresAt,
  };
}

/**
 * Check if log is expired based on retention
 */
export function isUserLogExpired(createdAt: Date, retentionDays: UserLogRetention): boolean {
  if (retentionDays === -1) return false; // Forever
  const now = Date.now();
  const age = (now - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= retentionDays;
}

/**
 * Get log retention label
 */
export function getUserLogRetentionLabel(retention: UserLogRetention): string {
  const labels: Record<number, string> = {
    [USER_LOG_RETENTION.SEVEN_DAYS]: '7 Days',
    [USER_LOG_RETENTION.THIRTY_DAYS]: '30 Days',
    [USER_LOG_RETENTION.NINETY_DAYS]: '90 Days',
    [USER_LOG_RETENTION.ONE_EIGHTY_DAYS]: '180 Days',
    [USER_LOG_RETENTION.ONE_YEAR]: '1 Year',
    [USER_LOG_RETENTION.FOREVER]: 'Forever',
  };
  return labels[retention] || `${retention} Days`;
}
