/**
 * Admin Session Schema
 * Zod schemas for admin session management definitions
 */

import { z } from 'zod';
import { SESSION_DURATION } from '@vubon/shared-constants';
import {
  idSchema,
  timestampSchema,
  jsonObjectSchema,
  nullable,
  numberWithRange,
} from '../common/core-primitives.schema';
import { adminRoleSchema } from './admin-role.schema';
import { adminPermissionStringSchema } from './admin-permission.schema';

/**
 * Admin session status enum schema (from constants)
 */
export const adminSessionStatusSchema = z.enum([
  'active',
  'expired',
  'revoked',
  'terminated',
  'suspended',
  'pending',
  'validating',
]);

/**
 * Admin session type enum schema (from constants)
 */
export const adminSessionTypeSchema = z.enum([
  'web',
  'mobile',
  'api',
  'admin',
  'service',
  'system',
  'token',
  'refresh',
]);

/**
 * Admin session security level schema (0-3)
 */
export const adminSessionSecurityLevelSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);

/**
 * Admin session location schema
 */
export const adminSessionLocationSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

/**
 * Admin session schema
 */
export const adminSessionSchema = z.object({
  id: idSchema,
  adminId: idSchema,
  type: adminSessionTypeSchema,
  status: adminSessionStatusSchema,
  securityLevel: adminSessionSecurityLevelSchema,
  tokenHash: z.string(),
  refreshTokenHash: nullable(z.string()),
  duration: numberWithRange(1, SESSION_DURATION.MONTH),
  role: adminRoleSchema,
  permissions: z.array(adminPermissionStringSchema),
  ipAddress: z.string(),
  userAgent: z.string(),
  deviceId: nullable(z.string()),
  location: nullable(adminSessionLocationSchema),
  lastActivityAt: timestampSchema,
  expiresAt: timestampSchema,
  metadata: nullable(jsonObjectSchema),
  isValidated: z.boolean().default(false),
  validatedAt: nullable(timestampSchema),
  isRevoked: z.boolean().default(false),
  revocationReason: nullable(z.string()),
  isTerminated: z.boolean().default(false),
  terminationReason: nullable(z.string()),
  isSuspended: z.boolean().default(false),
  suspensionReason: nullable(z.string()),
  suspensionExpiry: nullable(timestampSchema),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  deletedAt: nullable(timestampSchema).default(null),
});

/**
 * Admin session create data schema
 */
export const adminSessionCreateDataSchema = z.object({
  adminId: idSchema,
  type: adminSessionTypeSchema,
  duration: numberWithRange(1, SESSION_DURATION.MONTH),
  role: adminRoleSchema,
  permissions: z.array(adminPermissionStringSchema),
  ipAddress: z.string(),
  userAgent: z.string(),
  deviceId: z.string().optional(),
  location: adminSessionLocationSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * Admin session update data schema
 */
export const adminSessionUpdateDataSchema = z.object({
  status: adminSessionStatusSchema.optional(),
  securityLevel: adminSessionSecurityLevelSchema.optional(),
  lastActivityAt: timestampSchema.optional(),
  expiresAt: timestampSchema.optional(),
  isValidated: z.boolean().optional(),
  isRevoked: z.boolean().optional(),
  revocationReason: z.string().optional(),
  isTerminated: z.boolean().optional(),
  terminationReason: z.string().optional(),
  isSuspended: z.boolean().optional(),
  suspensionReason: z.string().optional(),
  suspensionExpiry: timestampSchema.optional(),
});

/**
 * Admin session filter parameters schema
 */
export const adminSessionFilterParamsSchema = z.object({
  adminId: idSchema.optional(),
  type: z.union([adminSessionTypeSchema, z.array(adminSessionTypeSchema)]).optional(),
  status: z.union([adminSessionStatusSchema, z.array(adminSessionStatusSchema)]).optional(),
  securityLevel: z
    .union([adminSessionSecurityLevelSchema, z.array(adminSessionSecurityLevelSchema)])
    .optional(),
  deviceId: z.string().optional(),
  ipAddress: z.string().optional(),
  isValidated: z.boolean().optional(),
  isRevoked: z.boolean().optional(),
  isTerminated: z.boolean().optional(),
  isSuspended: z.boolean().optional(),
  createdAfter: timestampSchema.optional(),
  createdBefore: timestampSchema.optional(),
  expiresAfter: timestampSchema.optional(),
  expiresBefore: timestampSchema.optional(),
  activeAfter: timestampSchema.optional(),
  activeBefore: timestampSchema.optional(),
});

/**
 * Admin session statistics schema
 */
export const adminSessionStatisticsSchema = z.object({
  totalSessions: z.number().int().min(0),
  typeCounts: z.record(z.string(), z.number().int().min(0)),
  statusCounts: z.record(z.string(), z.number().int().min(0)),
  securityLevelCounts: z.record(z.string(), z.number().int().min(0)),
  activeSessions: z.number().int().min(0),
  expiredSessions: z.number().int().min(0),
  revokedSessions: z.number().int().min(0),
  terminatedSessions: z.number().int().min(0),
  suspendedSessions: z.number().int().min(0),
  averageDuration: z.number().min(0),
  maxConcurrentSessions: z.number().int().min(0),
});

/**
 * Admin session validation result schema
 */
export const adminSessionValidationResultSchema = z.object({
  isValid: z.boolean(),
  session: adminSessionSchema.optional(),
  errorCode: z.string().optional(),
  errorMessage: z.string().optional(),
  needsRenewal: z.boolean().optional(),
  timeUntilRenewal: z.number().optional(),
});

/**
 * Type inference from schemas
 */
export type AdminSessionStatusSchema = z.infer<typeof adminSessionStatusSchema>;
export type AdminSessionTypeSchema = z.infer<typeof adminSessionTypeSchema>;
export type AdminSessionSecurityLevelSchema = z.infer<typeof adminSessionSecurityLevelSchema>;
export type AdminSessionLocationSchema = z.infer<typeof adminSessionLocationSchema>;
export type AdminSessionSchema = z.infer<typeof adminSessionSchema>;
export type AdminSessionCreateDataSchema = z.infer<typeof adminSessionCreateDataSchema>;
export type AdminSessionUpdateDataSchema = z.infer<typeof adminSessionUpdateDataSchema>;
export type AdminSessionFilterParamsSchema = z.infer<typeof adminSessionFilterParamsSchema>;
export type AdminSessionStatisticsSchema = z.infer<typeof adminSessionStatisticsSchema>;
export type AdminSessionValidationResultSchema = z.infer<typeof adminSessionValidationResultSchema>;

/**
 * Helper function to get session duration label
 */
export function getAdminSessionDurationLabelFromDuration(duration: number): string {
  const labelMap: Record<number, string> = {
    300: 'OTP Session',
    900: 'Short Session',
    1800: 'Medium Session',
    3600: 'Standard Session',
    14400: 'Extended Session',
    28800: 'Work Session',
    43200: 'Long Session',
    86400: 'Day Session',
    604800: 'Week Session',
    2592000: 'Month Session',
  };
  return labelMap[duration] || 'Custom Session';
}

/**
 * Helper function to check if session is active
 */
export function isAdminSessionActiveFromStatus(status: AdminSessionStatusSchema): boolean {
  return status === 'active' || status === 'validating';
}

/**
 * Helper function to check if session is invalid
 */
export function isAdminSessionInvalidFromStatus(status: AdminSessionStatusSchema): boolean {
  return (
    status === 'expired' ||
    status === 'revoked' ||
    status === 'terminated' ||
    status === 'suspended'
  );
}

/**
 * Helper function to get session status color
 */
export function getAdminSessionStatusColorFromStatus(status: AdminSessionStatusSchema): string {
  const colorMap: Record<AdminSessionStatusSchema, string> = {
    active: 'success',
    expired: 'default',
    revoked: 'error',
    terminated: 'error',
    suspended: 'warning',
    pending: 'warning',
    validating: 'info',
  };
  return colorMap[status] || 'default';
}

/**
 * Helper function to get session status label
 */
export function getAdminSessionStatusLabelFromStatus(status: AdminSessionStatusSchema): string {
  const labelMap: Record<AdminSessionStatusSchema, string> = {
    active: 'Active',
    expired: 'Expired',
    revoked: 'Revoked',
    terminated: 'Terminated',
    suspended: 'Suspended',
    pending: 'Pending',
    validating: 'Validating',
  };
  return labelMap[status] || status;
}

/**
 * Helper function to get session expiry time from duration
 */
export function getAdminSessionExpiryTimeFromDuration(duration: number): Date {
  return new Date(Date.now() + duration * 1000);
}

/**
 * Helper function to check if session needs renewal
 */
export function adminSessionNeedsRenewalFromDate(createdAt: Date, duration: number): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  const renewalThreshold = 300; // 5 minutes
  return age > duration - renewalThreshold;
}

/**
 * Helper function to check if session is idle
 */
export function isAdminSessionIdleFromDate(lastActivityAt: Date): boolean {
  const idleTime = (Date.now() - lastActivityAt.getTime()) / 1000;
  const maxIdleTime = 3600; // 1 hour
  return idleTime > maxIdleTime;
}

/**
 * Helper function to validate session duration
 */
export function isValidAdminSessionDurationFromDuration(duration: number): boolean {
  const maxDuration = 2592000; // 30 days
  return duration > 0 && duration <= maxDuration;
}

/**
 * Helper function to create session statistics from array
 */
export function createAdminSessionStatisticsFromArray(
  sessions: AdminSessionSchema[]
): AdminSessionStatisticsSchema {
  const stats: AdminSessionStatisticsSchema = {
    totalSessions: sessions.length,
    typeCounts: {},
    statusCounts: {},
    securityLevelCounts: {},
    activeSessions: 0,
    expiredSessions: 0,
    revokedSessions: 0,
    terminatedSessions: 0,
    suspendedSessions: 0,
    averageDuration: 0,
    maxConcurrentSessions: 0,
  };

  let totalDuration = 0;
  let durationCount = 0;
  const adminSessionCounts: Record<string, number> = {};

  sessions.forEach((session) => {
    const type = session.type as AdminSessionTypeSchema;
    const status = session.status as AdminSessionStatusSchema;
    const securityLevel = session.securityLevel as AdminSessionSecurityLevelSchema;

    stats.typeCounts[type] = (stats.typeCounts[type] || 0) + 1;
    stats.statusCounts[status] = (stats.statusCounts[status] || 0) + 1;
    stats.securityLevelCounts[String(securityLevel)] =
      (stats.securityLevelCounts[String(securityLevel)] || 0) + 1;

    if (isAdminSessionActiveFromStatus(status)) {
      stats.activeSessions++;
    }
    if (status === 'expired') stats.expiredSessions++;
    if (session.isRevoked) stats.revokedSessions++;
    if (session.isTerminated) stats.terminatedSessions++;
    if (session.isSuspended) stats.suspendedSessions++;

    if (session.duration) {
      totalDuration += session.duration;
      durationCount++;
    }

    if (session.adminId) {
      adminSessionCounts[session.adminId] = (adminSessionCounts[session.adminId] || 0) + 1;
    }
  });

  stats.averageDuration = durationCount > 0 ? totalDuration / durationCount : 0;

  let maxConcurrent = 0;
  for (const count of Object.values(adminSessionCounts)) {
    if (count > maxConcurrent) {
      maxConcurrent = count;
    }
  }
  stats.maxConcurrentSessions = maxConcurrent;

  return stats;
}

/**
 * Export schemas as an object for convenient access
 */
export const adminSessionSchemas = {
  session: adminSessionSchema,
  status: adminSessionStatusSchema,
  type: adminSessionTypeSchema,
  securityLevel: adminSessionSecurityLevelSchema,
  location: adminSessionLocationSchema,
  createData: adminSessionCreateDataSchema,
  updateData: adminSessionUpdateDataSchema,
  filter: adminSessionFilterParamsSchema,
  statistics: adminSessionStatisticsSchema,
  validationResult: adminSessionValidationResultSchema,
  getDurationLabel: getAdminSessionDurationLabelFromDuration,
  isActive: isAdminSessionActiveFromStatus,
  isInvalid: isAdminSessionInvalidFromStatus,
  getStatusColor: getAdminSessionStatusColorFromStatus,
  getStatusLabel: getAdminSessionStatusLabelFromStatus,
  getExpiryTime: getAdminSessionExpiryTimeFromDuration,
  needsRenewal: adminSessionNeedsRenewalFromDate,
  isIdle: isAdminSessionIdleFromDate,
  isValidDuration: isValidAdminSessionDurationFromDuration,
  createStatistics: createAdminSessionStatisticsFromArray,
};

export default adminSessionSchemas;
