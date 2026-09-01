/**
 * User Log Schema
 * Zod schemas for user log management, tracking, and analysis
 */

import { z } from 'zod';
import {
  USER_LOG_TYPE,
  USER_LOG_LEVEL,
  USER_LOG_STATUS,
  USER_LOG_CATEGORY,
  USER_LOG_SOURCE,
  USER_LOG_RETENTION,
  USER_LOG_TYPE_LABELS,
  USER_LOG_LEVEL_LABELS,
  USER_LOG_STATUS_LABELS,
  USER_LOG_CATEGORY_LABELS,
  USER_LOG_SOURCE_LABELS,
  USER_LOG_RETENTION_LABELS,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// USER LOG RETENTION TYPE (using constants directly)
// ============================================================

/**
 * User log retention type from constants
 */
export type UserLogRetention = (typeof USER_LOG_RETENTION)[keyof typeof USER_LOG_RETENTION];

// ============================================================
// USER LOG TYPE SCHEMAS
// ============================================================

/**
 * User log type schema
 */
export const userLogTypeSchema = z.enum([
  USER_LOG_TYPE.AUTHENTICATION,
  USER_LOG_TYPE.ACCESS,
  USER_LOG_TYPE.ACTIVITY,
  USER_LOG_TYPE.ERROR,
  USER_LOG_TYPE.SECURITY,
  USER_LOG_TYPE.AUDIT,
  USER_LOG_TYPE.SYSTEM,
  USER_LOG_TYPE.PERFORMANCE,
  USER_LOG_TYPE.DEBUG,
  USER_LOG_TYPE.TRANSACTION,
  USER_LOG_TYPE.NOTIFICATION,
  USER_LOG_TYPE.PAYMENT,
  USER_LOG_TYPE.API,
  USER_LOG_TYPE.WEBHOOK,
]);

/**
 * User log level schema
 */
export const userLogLevelSchema = z.enum([
  USER_LOG_LEVEL.DEBUG,
  USER_LOG_LEVEL.INFO,
  USER_LOG_LEVEL.WARNING,
  USER_LOG_LEVEL.ERROR,
  USER_LOG_LEVEL.CRITICAL,
  USER_LOG_LEVEL.FATAL,
]);

/**
 * User log status schema
 */
export const userLogStatusSchema = z.enum([
  USER_LOG_STATUS.ACTIVE,
  USER_LOG_STATUS.ARCHIVED,
  USER_LOG_STATUS.DELETED,
  USER_LOG_STATUS.PENDING,
  USER_LOG_STATUS.PROCESSED,
  USER_LOG_STATUS.FAILED,
]);

/**
 * User log category schema
 */
export const userLogCategorySchema = z.enum([
  USER_LOG_CATEGORY.SYSTEM,
  USER_LOG_CATEGORY.USER,
  USER_LOG_CATEGORY.SECURITY,
  USER_LOG_CATEGORY.BUSINESS,
  USER_LOG_CATEGORY.TECHNICAL,
]);

/**
 * User log source schema
 */
export const userLogSourceSchema = z.enum([
  USER_LOG_SOURCE.WEB,
  USER_LOG_SOURCE.MOBILE,
  USER_LOG_SOURCE.API,
  USER_LOG_SOURCE.JOB,
  USER_LOG_SOURCE.CRON,
  USER_LOG_SOURCE.QUEUE,
  USER_LOG_SOURCE.WEBHOOK,
  USER_LOG_SOURCE.CLI,
  USER_LOG_SOURCE.THIRD_PARTY,
]);

/**
 * User log retention schema - using z.number() directly
 */
export const userLogRetentionSchema = z.number();

// ============================================================
// USER LOG RECORD SCHEMA
// ============================================================

/**
 * User log record schema
 */
export const userLogRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  type: userLogTypeSchema,
  level: userLogLevelSchema,
  status: userLogStatusSchema,
  category: userLogCategorySchema,
  source: userLogSourceSchema,
  message: z.string().min(1),
  data: jsonObjectSchema.optional(),
  error: z
    .object({
      code: z.string().optional(),
      message: z.string().optional(),
      stack: z.string().optional(),
    })
    .optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  sessionId: idSchema.optional(),
  deviceId: idSchema.optional(),
  requestId: z.string().optional(),
  retentionDays: userLogRetentionSchema,
  createdAt: timestampSchema,
  expiresAt: timestampSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER LOG FILTER SCHEMA
// ============================================================

/**
 * User log filter schema
 */
export const userLogFilterSchema = z.object({
  userId: idSchema.optional(),
  type: z.union([userLogTypeSchema, z.array(userLogTypeSchema)]).optional(),
  level: z.union([userLogLevelSchema, z.array(userLogLevelSchema)]).optional(),
  status: z.union([userLogStatusSchema, z.array(userLogStatusSchema)]).optional(),
  category: z.union([userLogCategorySchema, z.array(userLogCategorySchema)]).optional(),
  source: z.union([userLogSourceSchema, z.array(userLogSourceSchema)]).optional(),
  sessionId: idSchema.optional(),
  deviceId: idSchema.optional(),
  requestId: z.string().optional(),
  dateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
  search: z.string().optional(),
  minLevel: userLogLevelSchema.optional(),
});

// ============================================================
// USER LOG SUMMARY SCHEMA
// ============================================================

/**
 * User log summary schema
 */
export const userLogSummarySchema = z.object({
  totalLogs: z.number().int().min(0),
  logsByType: z.record(userLogTypeSchema, z.number().int().min(0)),
  logsByLevel: z.record(userLogLevelSchema, z.number().int().min(0)),
  logsByStatus: z.record(userLogStatusSchema, z.number().int().min(0)),
  logsByCategory: z.record(userLogCategorySchema, z.number().int().min(0)),
  logsBySource: z.record(userLogSourceSchema, z.number().int().min(0)),
  latestLog: userLogRecordSchema.optional(),
  period: z.object({
    start: z.date(),
    end: z.date(),
  }),
});

// ============================================================
// USER LOG STATISTICS SCHEMA
// ============================================================

/**
 * User log statistics schema
 */
export const userLogStatisticsSchema = z.object({
  total: z.number().int().min(0),
  averagePerDay: z.number().min(0),
  peakHour: z.number().int().min(0).max(23),
  errorRate: z.number().min(0).max(1),
  mostActiveUser: z
    .object({
      userId: idSchema,
      logCount: z.number().int().min(0),
    })
    .optional(),
  mostCommonType: userLogTypeSchema.optional(),
  mostCommonSource: userLogSourceSchema.optional(),
});

// ============================================================
// USER LOG CONFIG SCHEMA
// ============================================================

/**
 * User log configuration schema
 */
export const userLogConfigSchema = z.object({
  defaultRetention: userLogRetentionSchema,
  retentionByType: z.record(userLogTypeSchema, userLogRetentionSchema),
  minLogLevel: userLogLevelSchema,
  storeRequestDetails: z.boolean(),
  storeErrorStacks: z.boolean(),
  maxMessageLength: z.number().int().positive(),
  maxDataSize: z.number().int().positive(),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserLogType = z.infer<typeof userLogTypeSchema>;
export type UserLogLevel = z.infer<typeof userLogLevelSchema>;
export type UserLogStatus = z.infer<typeof userLogStatusSchema>;
export type UserLogCategory = z.infer<typeof userLogCategorySchema>;
export type UserLogSource = z.infer<typeof userLogSourceSchema>;
export type UserLogRecord = z.infer<typeof userLogRecordSchema>;
export type UserLogFilter = z.infer<typeof userLogFilterSchema>;
export type UserLogSummary = z.infer<typeof userLogSummarySchema>;
export type UserLogStatistics = z.infer<typeof userLogStatisticsSchema>;
export type UserLogConfig = z.infer<typeof userLogConfigSchema>;

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
 * Get user log retention label
 */
export function getUserLogRetentionLabel(retention: UserLogRetention): string {
  return USER_LOG_RETENTION_LABELS[retention] || `${retention} Days`;
}

/**
 * Get user log level severity score (local map)
 */
export function getUserLogLevelScore(level: UserLogLevel): number {
  const scores: Record<UserLogLevel, number> = {
    debug: 10,
    info: 20,
    warning: 30,
    error: 40,
    critical: 50,
    fatal: 60,
  };
  return scores[level] || 0;
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
 * Get all user log retentions
 */
export function getAllUserLogRetentions(): UserLogRetention[] {
  return Object.values(USER_LOG_RETENTION);
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
 * Get user log category from type (local map)
 */
export function getUserLogCategoryFromType(type: UserLogType): UserLogCategory {
  const map: Record<UserLogType, UserLogCategory> = {
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
  return map[type] || 'system';
}

/**
 * Get user log retention from type (local map)
 */
export function getUserLogRetentionFromType(type: UserLogType): UserLogRetention {
  const map: Record<UserLogType, UserLogRetention> = {
    authentication: 90,
    access: 30,
    activity: 90,
    error: 180,
    security: 365,
    audit: 365,
    system: 30,
    performance: 30,
    debug: 7,
    transaction: 180,
    notification: 30,
    payment: 365,
    api: 90,
    webhook: 90,
  };
  return map[type] || 30;
}

/**
 * Create default log config
 */
export function getDefaultUserLogConfig(): UserLogConfig {
  return {
    defaultRetention: 30,
    retentionByType: {
      authentication: 90,
      access: 30,
      activity: 90,
      error: 180,
      security: 365,
      audit: 365,
      system: 30,
      performance: 30,
      debug: 7,
      transaction: 180,
      notification: 30,
      payment: 365,
      api: 90,
      webhook: 90,
    },
    minLogLevel: 'info',
    storeRequestDetails: true,
    storeErrorStacks: true,
    maxMessageLength: 10000,
    maxDataSize: 1024 * 1024, // 1MB
  };
}
