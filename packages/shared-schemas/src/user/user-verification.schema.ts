/**
 * User Verification Schema
 * Zod schemas for user verification management
 */

import { z } from 'zod';
import {
  USER_VERIFICATION_TYPE,
  USER_VERIFICATION_STATUS,
  USER_VERIFICATION_METHOD,
  USER_VERIFICATION_LEVEL,
  USER_VERIFICATION_DOCUMENT_TYPE,
  USER_VERIFICATION_TYPE_LABELS,
  USER_VERIFICATION_STATUS_LABELS,
  USER_VERIFICATION_METHOD_LABELS,
  USER_VERIFICATION_LEVEL_LABELS,
  USER_VERIFICATION_DOCUMENT_TYPE_LABELS,
  USER_VERIFICATION_CONFIG,
} from '@vubon/shared-constants';
import {
  idSchema,
  timestampSchema,
  jsonObjectSchema,
  urlSchema,
} from '../common/core-primitives.schema';

// ============================================================
// USER VERIFICATION TYPE SCHEMAS
// ============================================================

/**
 * User verification type schema
 */
export const userVerificationTypeSchema = z.enum([
  USER_VERIFICATION_TYPE.EMAIL,
  USER_VERIFICATION_TYPE.PHONE,
  USER_VERIFICATION_TYPE.IDENTITY,
  USER_VERIFICATION_TYPE.ADDRESS,
  USER_VERIFICATION_TYPE.AGE,
  USER_VERIFICATION_TYPE.DOCUMENT,
  USER_VERIFICATION_TYPE.BUSINESS,
  USER_VERIFICATION_TYPE.TAX_ID,
  USER_VERIFICATION_TYPE.BANK_ACCOUNT,
  USER_VERIFICATION_TYPE.SOCIAL,
  USER_VERIFICATION_TYPE.DEVICE,
  USER_VERIFICATION_TYPE.TWO_FA,
  USER_VERIFICATION_TYPE.BIOMETRIC,
]);

/**
 * User verification status schema
 */
export const userVerificationStatusSchema = z.enum([
  USER_VERIFICATION_STATUS.NOT_STARTED,
  USER_VERIFICATION_STATUS.PENDING,
  USER_VERIFICATION_STATUS.IN_PROGRESS,
  USER_VERIFICATION_STATUS.VERIFIED,
  USER_VERIFICATION_STATUS.FAILED,
  USER_VERIFICATION_STATUS.EXPIRED,
  USER_VERIFICATION_STATUS.REQUIRES_REVIEW,
  USER_VERIFICATION_STATUS.SKIPPED,
  USER_VERIFICATION_STATUS.CANCELLED,
  USER_VERIFICATION_STATUS.ON_HOLD,
]);

/**
 * User verification method schema
 */
export const userVerificationMethodSchema = z.enum([
  USER_VERIFICATION_METHOD.SMS_OTP,
  USER_VERIFICATION_METHOD.EMAIL_OTP,
  USER_VERIFICATION_METHOD.MAGIC_LINK,
  USER_VERIFICATION_METHOD.QR_CODE,
  USER_VERIFICATION_METHOD.BIOMETRIC,
  USER_VERIFICATION_METHOD.DOCUMENT_UPLOAD,
  USER_VERIFICATION_METHOD.THIRD_PARTY,
  USER_VERIFICATION_METHOD.MANUAL,
  USER_VERIFICATION_METHOD.SELFIE,
  USER_VERIFICATION_METHOD.VIDEO,
  USER_VERIFICATION_METHOD.LIVE,
  USER_VERIFICATION_METHOD.AI,
]);

/**
 * User verification level schema
 */
export const userVerificationLevelSchema = z.enum([
  USER_VERIFICATION_LEVEL.LEVEL_0,
  USER_VERIFICATION_LEVEL.LEVEL_1,
  USER_VERIFICATION_LEVEL.LEVEL_2,
  USER_VERIFICATION_LEVEL.LEVEL_3,
  USER_VERIFICATION_LEVEL.LEVEL_4,
  USER_VERIFICATION_LEVEL.LEVEL_5,
]);

/**
 * User verification document type schema
 */
export const userVerificationDocumentTypeSchema = z.enum([
  USER_VERIFICATION_DOCUMENT_TYPE.NATIONAL_ID,
  USER_VERIFICATION_DOCUMENT_TYPE.PASSPORT,
  USER_VERIFICATION_DOCUMENT_TYPE.DRIVERS_LICENSE,
  USER_VERIFICATION_DOCUMENT_TYPE.VOTER_ID,
  USER_VERIFICATION_DOCUMENT_TYPE.BIRTH_CERTIFICATE,
  USER_VERIFICATION_DOCUMENT_TYPE.UTILITY_BILL,
  USER_VERIFICATION_DOCUMENT_TYPE.BANK_STATEMENT,
  USER_VERIFICATION_DOCUMENT_TYPE.TAX_ID,
  USER_VERIFICATION_DOCUMENT_TYPE.BUSINESS_REGISTRATION,
  USER_VERIFICATION_DOCUMENT_TYPE.TRADE_LICENSE,
  USER_VERIFICATION_DOCUMENT_TYPE.TIN_CERTIFICATE,
  USER_VERIFICATION_DOCUMENT_TYPE.COMPANY_PROFILE,
  USER_VERIFICATION_DOCUMENT_TYPE.FINANCIAL_STATEMENT,
]);

// ============================================================
// USER VERIFICATION RECORD SCHEMA
// ============================================================

/**
 * User verification record schema
 */
export const userVerificationRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  type: userVerificationTypeSchema,
  status: userVerificationStatusSchema,
  method: userVerificationMethodSchema,
  level: userVerificationLevelSchema,
  target: z.string().min(1),
  codeHash: z.string().optional(),
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().min(1).default(USER_VERIFICATION_CONFIG.MAX_ATTEMPTS),
  initiatedAt: timestampSchema,
  completedAt: timestampSchema.optional(),
  expiresAt: timestampSchema,
  lastAttemptAt: timestampSchema.optional(),
  data: jsonObjectSchema.optional(),
  isActive: z.boolean().default(true),
});

// ============================================================
// USER VERIFICATION DOCUMENT SCHEMA
// ============================================================

/**
 * User verification document schema
 */
export const userVerificationDocumentSchema = z.object({
  id: idSchema,
  userId: idSchema,
  documentType: userVerificationDocumentTypeSchema,
  fileUrl: urlSchema,
  fileName: z.string().min(1),
  fileSize: z.number().int().min(0),
  mimeType: z.string().min(1),
  notes: z.string().optional(),
  reviewedBy: idSchema.optional(),
  uploadedAt: timestampSchema,
  reviewedAt: timestampSchema.optional(),
  expiresAt: timestampSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER VERIFICATION REQUEST SCHEMAS
// ============================================================

/**
 * User verification request schema
 */
export const userVerificationRequestSchema = z.object({
  userId: idSchema,
  type: userVerificationTypeSchema,
  method: userVerificationMethodSchema,
  target: z.string().min(1),
  data: jsonObjectSchema.optional(),
  resend: z.boolean().optional(),
});

/**
 * User verify code request schema
 */
export const userVerifyCodeRequestSchema = z.object({
  userId: idSchema,
  type: userVerificationTypeSchema,
  code: z.string().min(1),
  sessionId: idSchema.optional(),
});

/**
 * User verify document request schema
 */
export const userVerifyDocumentRequestSchema = z.object({
  userId: idSchema,
  documentType: userVerificationDocumentTypeSchema,
  document: z.union([z.string(), z.instanceof(File)]),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER VERIFICATION RESPONSE SCHEMA
// ============================================================

/**
 * User verification response schema
 */
export const userVerificationResponseSchema = z.object({
  success: z.boolean(),
  status: userVerificationStatusSchema,
  record: userVerificationRecordSchema.optional(),
  sessionId: idSchema.optional(),
  requiresAction: z.boolean().optional(),
  requiredAction: z.string().optional(),
  error: z.string().optional(),
  remainingAttempts: z.number().int().min(0).optional(),
  resendCooldown: z.number().int().min(0).optional(),
});

// ============================================================
// USER VERIFICATION FILTER SCHEMA
// ============================================================

/**
 * User verification filter schema
 */
export const userVerificationFilterSchema = z.object({
  userId: idSchema.optional(),
  type: z.union([userVerificationTypeSchema, z.array(userVerificationTypeSchema)]).optional(),
  method: z.union([userVerificationMethodSchema, z.array(userVerificationMethodSchema)]).optional(),
  status: z.union([userVerificationStatusSchema, z.array(userVerificationStatusSchema)]).optional(),
  level: z.union([userVerificationLevelSchema, z.array(userVerificationLevelSchema)]).optional(),
  target: z.string().optional(),
  activeOnly: z.boolean().optional(),
  initiatedDateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
});

// ============================================================
// USER VERIFICATION SUMMARY SCHEMA
// ============================================================

/**
 * User verification summary schema
 */
export const userVerificationSummarySchema = z.object({
  userId: idSchema,
  totalVerifications: z.number().int().min(0),
  verifiedItems: z.object({
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    identity: z.boolean().optional(),
    address: z.boolean().optional(),
    age: z.boolean().optional(),
    business: z.boolean().optional(),
    taxId: z.boolean().optional(),
    bankAccount: z.boolean().optional(),
    social: z.boolean().optional(),
    device: z.boolean().optional(),
    twoFa: z.boolean().optional(),
    biometric: z.boolean().optional(),
  }),
  currentLevel: userVerificationLevelSchema,
  pendingVerifications: z.array(userVerificationRecordSchema),
  completedVerifications: z.array(userVerificationRecordSchema),
  documentVerifications: z.array(userVerificationDocumentSchema),
});

// ============================================================
// USER VERIFICATION CONFIG SCHEMA
// ============================================================

/**
 * User verification configuration schema
 */
export const userVerificationConfigSchema = z.object({
  otpLength: z.number().int().positive().default(USER_VERIFICATION_CONFIG.OTP_LENGTH),
  otpExpiry: z.number().int().positive().default(USER_VERIFICATION_CONFIG.OTP_EXPIRY),
  magicLinkExpiry: z.number().int().positive().default(USER_VERIFICATION_CONFIG.MAGIC_LINK_EXPIRY),
  tokenExpiry: z.number().int().positive().default(USER_VERIFICATION_CONFIG.TOKEN_EXPIRY),
  maxAttempts: z.number().int().positive().default(USER_VERIFICATION_CONFIG.MAX_ATTEMPTS),
  resendCooldown: z.number().int().positive().default(USER_VERIFICATION_CONFIG.RESEND_COOLDOWN),
  timeout: z.number().int().positive().default(USER_VERIFICATION_CONFIG.TIMEOUT),
  maxDocuments: z.number().int().positive().default(USER_VERIFICATION_CONFIG.MAX_DOCUMENTS),
  maxFileSize: z.number().int().positive().default(USER_VERIFICATION_CONFIG.MAX_FILE_SIZE),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserVerificationType = z.infer<typeof userVerificationTypeSchema>;
export type UserVerificationStatus = z.infer<typeof userVerificationStatusSchema>;
export type UserVerificationMethod = z.infer<typeof userVerificationMethodSchema>;
export type UserVerificationLevel = z.infer<typeof userVerificationLevelSchema>;
export type UserVerificationDocumentType = z.infer<typeof userVerificationDocumentTypeSchema>;
export type UserVerificationRecord = z.infer<typeof userVerificationRecordSchema>;
export type UserVerificationDocument = z.infer<typeof userVerificationDocumentSchema>;
export type UserVerificationRequest = z.infer<typeof userVerificationRequestSchema>;
export type UserVerifyCodeRequest = z.infer<typeof userVerifyCodeRequestSchema>;
export type UserVerifyDocumentRequest = z.infer<typeof userVerifyDocumentRequestSchema>;
export type UserVerificationResponse = z.infer<typeof userVerificationResponseSchema>;
export type UserVerificationFilter = z.infer<typeof userVerificationFilterSchema>;
export type UserVerificationSummary = z.infer<typeof userVerificationSummarySchema>;
export type UserVerificationConfig = z.infer<typeof userVerificationConfigSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user verification type is valid
 */
export function isValidUserVerificationType(type: string): type is UserVerificationType {
  return Object.values(USER_VERIFICATION_TYPE).includes(type as UserVerificationType);
}

/**
 * Check if user verification status is valid
 */
export function isValidUserVerificationStatus(status: string): status is UserVerificationStatus {
  return Object.values(USER_VERIFICATION_STATUS).includes(status as UserVerificationStatus);
}

/**
 * Check if user verification method is valid
 */
export function isValidUserVerificationMethod(method: string): method is UserVerificationMethod {
  return Object.values(USER_VERIFICATION_METHOD).includes(method as UserVerificationMethod);
}

/**
 * Check if user verification level is valid
 */
export function isValidUserVerificationLevel(level: string): level is UserVerificationLevel {
  return Object.values(USER_VERIFICATION_LEVEL).includes(level as UserVerificationLevel);
}

/**
 * Check if user verification document type is valid
 */
export function isValidUserVerificationDocumentType(
  type: string
): type is UserVerificationDocumentType {
  return Object.values(USER_VERIFICATION_DOCUMENT_TYPE).includes(
    type as UserVerificationDocumentType
  );
}

/**
 * Get user verification type display name
 */
export function getUserVerificationTypeDisplayName(type: UserVerificationType): string {
  return USER_VERIFICATION_TYPE_LABELS[type] || type;
}

/**
 * Get user verification status display name
 */
export function getUserVerificationStatusDisplayName(status: UserVerificationStatus): string {
  return USER_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Get user verification method display name
 */
export function getUserVerificationMethodDisplayName(method: UserVerificationMethod): string {
  return USER_VERIFICATION_METHOD_LABELS[method] || method;
}

/**
 * Get user verification level display name
 */
export function getUserVerificationLevelDisplayName(level: UserVerificationLevel): string {
  return USER_VERIFICATION_LEVEL_LABELS[level] || level;
}

/**
 * Get user verification document type display name
 */
export function getUserVerificationDocumentTypeDisplayName(
  type: UserVerificationDocumentType
): string {
  return USER_VERIFICATION_DOCUMENT_TYPE_LABELS[type] || type;
}

/**
 * Check if verification is complete
 */
export function isUserVerificationComplete(status: UserVerificationStatus): boolean {
  return status === USER_VERIFICATION_STATUS.VERIFIED;
}

/**
 * Check if verification is pending
 */
export function isUserVerificationPending(status: UserVerificationStatus): boolean {
  const pendingStatuses: UserVerificationStatus[] = ['pending', 'in_progress', 'requires_review'];
  return pendingStatuses.includes(status);
}

/**
 * Check if verification has failed
 */
export function isUserVerificationFailed(status: UserVerificationStatus): boolean {
  const failedStatuses: UserVerificationStatus[] = ['failed', 'expired'];
  return failedStatuses.includes(status);
}

/**
 * Check if verification is active
 */
export function isUserVerificationActive(status: UserVerificationStatus): boolean {
  const activeStatuses: UserVerificationStatus[] = [
    'pending',
    'in_progress',
    'requires_review',
    'verified',
  ];
  return activeStatuses.includes(status);
}

/**
 * Check if verification has expired
 */
export function isUserVerificationExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * Check if verification attempt limit is reached
 */
export function isUserVerificationAttemptsExceeded(
  attempts: number,
  maxAttempts: number = USER_VERIFICATION_CONFIG.MAX_ATTEMPTS
): boolean {
  return attempts >= maxAttempts;
}

/**
 * Check if resend is allowed
 */
export function isUserVerificationResendAllowed(
  lastAttemptAt: Date,
  cooldownSeconds: number = USER_VERIFICATION_CONFIG.RESEND_COOLDOWN
): boolean {
  const now = Date.now();
  const elapsed = (now - lastAttemptAt.getTime()) / 1000;
  return elapsed >= cooldownSeconds;
}

/**
 * Get remaining resend cooldown in seconds
 */
export function getUserVerificationResendCooldown(
  lastAttemptAt: Date,
  cooldownSeconds: number = USER_VERIFICATION_CONFIG.RESEND_COOLDOWN
): number {
  const now = Date.now();
  const elapsed = (now - lastAttemptAt.getTime()) / 1000;
  const remaining = cooldownSeconds - elapsed;
  return Math.max(0, Math.ceil(remaining));
}

/**
 * Get all user verification types
 */
export function getAllUserVerificationTypes(): UserVerificationType[] {
  return Object.values(USER_VERIFICATION_TYPE);
}

/**
 * Get all user verification statuses
 */
export function getAllUserVerificationStatuses(): UserVerificationStatus[] {
  return Object.values(USER_VERIFICATION_STATUS);
}

/**
 * Get all user verification methods
 */
export function getAllUserVerificationMethods(): UserVerificationMethod[] {
  return Object.values(USER_VERIFICATION_METHOD);
}

/**
 * Get all user verification levels
 */
export function getAllUserVerificationLevels(): UserVerificationLevel[] {
  return Object.values(USER_VERIFICATION_LEVEL);
}

/**
 * Get all user verification document types
 */
export function getAllUserVerificationDocumentTypes(): UserVerificationDocumentType[] {
  return Object.values(USER_VERIFICATION_DOCUMENT_TYPE);
}

/**
 * Get identity verification types
 */
export function getIdentityUserVerificationTypes(): UserVerificationType[] {
  return ['identity', 'age'];
}

/**
 * Get document verification types
 */
export function getDocumentUserVerificationTypes(): UserVerificationType[] {
  return ['document', 'business', 'tax_id', 'bank_account'];
}

/**
 * Get contact verification types
 */
export function getContactUserVerificationTypes(): UserVerificationType[] {
  return ['email', 'phone'];
}

/**
 * Get security verification types
 */
export function getSecurityUserVerificationTypes(): UserVerificationType[] {
  return ['two_fa', 'biometric', 'device'];
}

/**
 * Get required documents for verification level
 */
export function getUserVerificationLevelDocuments(
  level: UserVerificationLevel
): UserVerificationType[] {
  const documentMap: Record<UserVerificationLevel, UserVerificationType[]> = {
    level_0: [],
    level_1: ['email', 'phone'],
    level_2: ['email', 'phone', 'identity'],
    level_3: ['email', 'phone', 'identity', 'address'],
    level_4: ['email', 'phone', 'identity', 'address', 'document'],
    level_5: ['email', 'phone', 'identity', 'address', 'document', 'business', 'tax_id'],
  };
  return documentMap[level] || [];
}

/**
 * Get default verification config
 */
export function getUserDefaultVerificationConfig(): UserVerificationConfig {
  return {
    otpLength: USER_VERIFICATION_CONFIG.OTP_LENGTH,
    otpExpiry: USER_VERIFICATION_CONFIG.OTP_EXPIRY,
    magicLinkExpiry: USER_VERIFICATION_CONFIG.MAGIC_LINK_EXPIRY,
    tokenExpiry: USER_VERIFICATION_CONFIG.TOKEN_EXPIRY,
    maxAttempts: USER_VERIFICATION_CONFIG.MAX_ATTEMPTS,
    resendCooldown: USER_VERIFICATION_CONFIG.RESEND_COOLDOWN,
    timeout: USER_VERIFICATION_CONFIG.TIMEOUT,
    maxDocuments: USER_VERIFICATION_CONFIG.MAX_DOCUMENTS,
    maxFileSize: USER_VERIFICATION_CONFIG.MAX_FILE_SIZE,
  };
}

/**
 * Get next verification level
 */
export function getUserVerificationNextLevel(
  currentLevel: UserVerificationLevel
): UserVerificationLevel | null {
  const levels = getAllUserVerificationLevels();
  const currentIndex = levels.indexOf(currentLevel);
  if (currentIndex === -1 || currentIndex >= levels.length - 1) {
    return null;
  }
  return levels[currentIndex + 1];
}
