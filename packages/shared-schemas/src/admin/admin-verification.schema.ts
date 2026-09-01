/**
 * Admin Verification Schema
 * Zod schemas for admin verification definitions
 */

import { z } from 'zod';
import {
  idSchema,
  timestampSchema,
  jsonObjectSchema,
  nullable,
  stringWithLength,
  numberWithRange,
} from '../common/core-primitives.schema';

/**
 * Admin verification type enum schema (from constants)
 */
export const adminVerificationTypeSchema = z.enum([
  'email',
  'phone',
  'identity',
  'address',
  'payment',
  'two_fa',
  'device',
  'bio',
  'security',
  'compliance',
  'admin',
  'role',
  'permission',
]);

/**
 * Admin verification status enum schema (from constants)
 */
export const adminVerificationStatusSchema = z.enum([
  'pending',
  'verified',
  'rejected',
  'expired',
  'revoked',
  'failed',
  'in_progress',
  'waiting',
]);

/**
 * Admin verification method enum schema (from constants)
 */
export const adminVerificationMethodSchema = z.enum([
  'otp',
  'email',
  'sms',
  'whatsapp',
  'call',
  'qr',
  'biometric',
  'facial',
  'fingerprint',
  'iris',
  'voice',
  'document',
  'knowledge',
  'device',
  'location',
]);

/**
 * Admin OTP type enum schema (from constants)
 */
export const adminOtpTypeSchema = z.enum([
  'login',
  'register',
  'password_reset',
  'email_verification',
  'phone_verification',
  'two_fa',
  'transaction',
  'withdrawal',
  'security',
  'admin_action',
]);

/**
 * Admin verification error code enum schema (from constants)
 */
export const adminVerificationErrorCodeSchema = z.enum([
  'ERR_VERIFY_001',
  'ERR_VERIFY_002',
  'ERR_VERIFY_003',
  'ERR_VERIFY_004',
  'ERR_VERIFY_005',
  'ERR_VERIFY_006',
  'ERR_VERIFY_007',
  'ERR_VERIFY_008',
  'ERR_VERIFY_009',
]);

/**
 * Admin verification schema
 */
export const adminVerificationSchema = z.object({
  id: idSchema,
  adminId: idSchema,
  type: adminVerificationTypeSchema,
  status: adminVerificationStatusSchema,
  method: adminVerificationMethodSchema,
  codeHash: nullable(z.string()),
  target: z.string(),
  otpType: nullable(adminOtpTypeSchema),
  duration: numberWithRange(1, 2592000),
  expiresAt: timestampSchema,
  attempts: numberWithRange(0),
  maxAttempts: numberWithRange(1, 10),
  metadata: nullable(jsonObjectSchema),
  verifiedAt: nullable(timestampSchema),
  verifiedBy: nullable(idSchema),
  rejectionReason: nullable(z.string()),
  isComplete: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  deletedAt: nullable(timestampSchema).default(null),
});

/**
 * Admin verification request data schema
 */
export const adminVerificationRequestDataSchema = z.object({
  adminId: idSchema,
  type: adminVerificationTypeSchema,
  method: adminVerificationMethodSchema,
  target: z.string(),
  otpType: adminOtpTypeSchema.optional(),
  duration: numberWithRange(1, 2592000).optional(),
  maxAttempts: numberWithRange(1, 10).optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * Admin verification verify data schema
 */
export const adminVerificationVerifyDataSchema = z.object({
  verificationId: idSchema,
  code: stringWithLength(1, 20),
  verifiedBy: idSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * Admin verification filter parameters schema
 */
export const adminVerificationFilterParamsSchema = z.object({
  adminId: idSchema.optional(),
  type: z.union([adminVerificationTypeSchema, z.array(adminVerificationTypeSchema)]).optional(),
  status: z
    .union([adminVerificationStatusSchema, z.array(adminVerificationStatusSchema)])
    .optional(),
  method: z
    .union([adminVerificationMethodSchema, z.array(adminVerificationMethodSchema)])
    .optional(),
  target: z.string().optional(),
  otpType: z.union([adminOtpTypeSchema, z.array(adminOtpTypeSchema)]).optional(),
  isComplete: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  dateRange: z
    .object({
      start: timestampSchema.optional(),
      end: timestampSchema.optional(),
    })
    .optional(),
  search: z.string().optional(),
});

/**
 * Admin verification statistics schema
 */
export const adminVerificationStatisticsSchema = z.object({
  totalVerifications: z.number().int().min(0),
  typeCounts: z.record(z.string(), z.number().int().min(0)),
  statusCounts: z.record(z.string(), z.number().int().min(0)),
  methodCounts: z.record(z.string(), z.number().int().min(0)),
  completedCount: z.number().int().min(0),
  pendingCount: z.number().int().min(0),
  failedCount: z.number().int().min(0),
  averageAttempts: z.number().min(0),
  successRate: z.number().min(0).max(100),
});

/**
 * Admin verification result schema
 */
export const adminVerificationResultSchema = z.object({
  success: z.boolean(),
  verification: adminVerificationSchema.optional(),
  errorCode: adminVerificationErrorCodeSchema.optional(),
  errorMessage: z.string().optional(),
  isComplete: z.boolean().optional(),
});

/**
 * Type inference from schemas
 */
export type AdminVerificationTypeSchema = z.infer<typeof adminVerificationTypeSchema>;
export type AdminVerificationStatusSchema = z.infer<typeof adminVerificationStatusSchema>;
export type AdminVerificationMethodSchema = z.infer<typeof adminVerificationMethodSchema>;
export type AdminOtpTypeSchema = z.infer<typeof adminOtpTypeSchema>;
export type AdminVerificationErrorCodeSchema = z.infer<typeof adminVerificationErrorCodeSchema>;
export type AdminVerificationSchema = z.infer<typeof adminVerificationSchema>;
export type AdminVerificationRequestDataSchema = z.infer<typeof adminVerificationRequestDataSchema>;
export type AdminVerificationVerifyDataSchema = z.infer<typeof adminVerificationVerifyDataSchema>;
export type AdminVerificationFilterParamsSchema = z.infer<
  typeof adminVerificationFilterParamsSchema
>;
export type AdminVerificationStatisticsSchema = z.infer<typeof adminVerificationStatisticsSchema>;
export type AdminVerificationResultSchema = z.infer<typeof adminVerificationResultSchema>;

/**
 * Helper function to get verification status label
 */
export function getAdminVerificationStatusLabelFromStatus(
  status: AdminVerificationStatusSchema
): string {
  const labelMap: Record<AdminVerificationStatusSchema, string> = {
    pending: 'Pending Verification',
    verified: 'Verified',
    rejected: 'Rejected',
    expired: 'Expired',
    revoked: 'Revoked',
    failed: 'Failed',
    in_progress: 'In Progress',
    waiting: 'Waiting',
  };
  return labelMap[status] || status;
}

/**
 * Helper function to get verification status color
 */
export function getAdminVerificationStatusColorFromStatus(
  status: AdminVerificationStatusSchema
): string {
  const colorMap: Record<AdminVerificationStatusSchema, string> = {
    pending: 'warning',
    verified: 'success',
    rejected: 'error',
    expired: 'default',
    revoked: 'error',
    failed: 'error',
    in_progress: 'info',
    waiting: 'warning',
  };
  return colorMap[status] || 'default';
}

/**
 * Helper function to get OTP type label
 */
export function getAdminOtpTypeLabelFromType(type: AdminOtpTypeSchema): string {
  const labelMap: Record<AdminOtpTypeSchema, string> = {
    login: 'Login OTP',
    register: 'Registration OTP',
    password_reset: 'Password Reset OTP',
    email_verification: 'Email Verification OTP',
    phone_verification: 'Phone Verification OTP',
    two_fa: '2FA OTP',
    transaction: 'Transaction OTP',
    withdrawal: 'Withdrawal OTP',
    security: 'Security OTP',
    admin_action: 'Admin Action OTP',
  };
  return labelMap[type] || type;
}

/**
 * Helper function to get verification duration for type
 */
export function getAdminVerificationDurationForType(type: AdminVerificationTypeSchema): number {
  const durationMap: Record<AdminVerificationTypeSchema, number> = {
    email: 86400,
    phone: 86400,
    identity: 604800,
    address: 604800,
    payment: 86400,
    two_fa: 300,
    device: 3600,
    bio: 86400,
    security: 3600,
    compliance: 2592000,
    admin: 86400,
    role: 86400,
    permission: 86400,
  };
  return durationMap[type] || 3600;
}

/**
 * Helper function to check if verification is complete
 */
export function isAdminVerificationCompleteFromStatus(
  status: AdminVerificationStatusSchema
): boolean {
  return status === 'verified';
}

/**
 * Helper function to check if verification is in progress
 */
export function isAdminVerificationInProgressFromStatus(
  status: AdminVerificationStatusSchema
): boolean {
  return status === 'pending' || status === 'in_progress' || status === 'waiting';
}

/**
 * Helper function to check if verification has failed
 */
export function isAdminVerificationFailedFromStatus(
  status: AdminVerificationStatusSchema
): boolean {
  return status === 'rejected' || status === 'failed' || status === 'revoked';
}

/**
 * Helper function to get verification expiry time
 */
export function getAdminVerificationExpiryTimeFromType(type: AdminVerificationTypeSchema): Date {
  const duration = getAdminVerificationDurationForType(type);
  return new Date(Date.now() + duration * 1000);
}

/**
 * Helper function to check if verification is expired
 */
export function isAdminVerificationExpiredFromDate(
  createdAt: Date,
  type: AdminVerificationTypeSchema
): boolean {
  const duration = getAdminVerificationDurationForType(type);
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age > duration;
}

/**
 * Helper function to create verification statistics from array
 */
export function createAdminVerificationStatisticsFromArray(
  verifications: AdminVerificationSchema[]
): AdminVerificationStatisticsSchema {
  const stats: AdminVerificationStatisticsSchema = {
    totalVerifications: verifications.length,
    typeCounts: {},
    statusCounts: {},
    methodCounts: {},
    completedCount: 0,
    pendingCount: 0,
    failedCount: 0,
    averageAttempts: 0,
    successRate: 0,
  };

  let totalAttempts = 0;

  verifications.forEach((verification) => {
    const type = verification.type as AdminVerificationTypeSchema;
    const status = verification.status as AdminVerificationStatusSchema;
    const method = verification.method as AdminVerificationMethodSchema;

    stats.typeCounts[type] = (stats.typeCounts[type] || 0) + 1;
    stats.statusCounts[status] = (stats.statusCounts[status] || 0) + 1;
    stats.methodCounts[method] = (stats.methodCounts[method] || 0) + 1;

    if (isAdminVerificationCompleteFromStatus(status)) {
      stats.completedCount++;
    }
    if (isAdminVerificationInProgressFromStatus(status)) {
      stats.pendingCount++;
    }
    if (isAdminVerificationFailedFromStatus(status)) {
      stats.failedCount++;
    }

    totalAttempts += verification.attempts;
  });

  stats.averageAttempts = verifications.length > 0 ? totalAttempts / verifications.length : 0;
  stats.successRate =
    verifications.length > 0 ? (stats.completedCount / verifications.length) * 100 : 0;

  return stats;
}

/**
 * Export schemas as an object for convenient access
 */
export const adminVerificationSchemas = {
  verification: adminVerificationSchema,
  type: adminVerificationTypeSchema,
  status: adminVerificationStatusSchema,
  method: adminVerificationMethodSchema,
  otpType: adminOtpTypeSchema,
  errorCode: adminVerificationErrorCodeSchema,
  requestData: adminVerificationRequestDataSchema,
  verifyData: adminVerificationVerifyDataSchema,
  filter: adminVerificationFilterParamsSchema,
  statistics: adminVerificationStatisticsSchema,
  result: adminVerificationResultSchema,
  getStatusLabel: getAdminVerificationStatusLabelFromStatus,
  getStatusColor: getAdminVerificationStatusColorFromStatus,
  getOtpTypeLabel: getAdminOtpTypeLabelFromType,
  getDuration: getAdminVerificationDurationForType,
  isComplete: isAdminVerificationCompleteFromStatus,
  isInProgress: isAdminVerificationInProgressFromStatus,
  isFailed: isAdminVerificationFailedFromStatus,
  getExpiryTime: getAdminVerificationExpiryTimeFromType,
  isExpired: isAdminVerificationExpiredFromDate,
  createStatistics: createAdminVerificationStatisticsFromArray,
};

export default adminVerificationSchemas;
