/**
 * Authentication Verification Schema
 * Zod schemas for email, phone, identity, and document verification
 */

import { z } from 'zod';
import {
  AUTH_VERIFICATION_TYPES,
  AUTH_VERIFICATION_STATUS,
  AUTH_VERIFICATION_METHODS,
  AUTH_VERIFICATION_CONFIG,
  AUTH_VERIFICATION_RULES,
  AUTH_VERIFICATION_STATUS_MESSAGES,
  AUTH_DOCUMENT_TYPES,
  AUTH_DOCUMENT_STATUS,
  FINAL_AUTH_VERIFICATION_STATUSES,
  PENDING_AUTH_VERIFICATION_STATUSES,
  SUCCESSFUL_AUTH_VERIFICATION_STATUSES,
  type AuthVerificationType,
  type AuthVerificationStatus,
  type AuthVerificationMethod,
  type AuthDocumentType,
  type AuthDocumentStatus,
} from '@vubon/shared-constants';
import {
  idSchema,
  urlSchema,
  timestampSchema,
  jsonObjectSchema,
} from '../common/core-primitives.schema';

// ============================================================
// AUTH VERIFICATION TYPE SCHEMAS
// ============================================================

/**
 * Auth verification type schema
 */
export const authVerificationTypeSchema = z.enum([
  AUTH_VERIFICATION_TYPES.EMAIL,
  AUTH_VERIFICATION_TYPES.PHONE,
  AUTH_VERIFICATION_TYPES.IDENTITY,
  AUTH_VERIFICATION_TYPES.ADDRESS,
  AUTH_VERIFICATION_TYPES.DEVICE,
  AUTH_VERIFICATION_TYPES.DOCUMENT,
  AUTH_VERIFICATION_TYPES.TWO_FA,
  AUTH_VERIFICATION_TYPES.AGE,
  AUTH_VERIFICATION_TYPES.BUSINESS,
  AUTH_VERIFICATION_TYPES.TAX_ID,
  AUTH_VERIFICATION_TYPES.BANK_ACCOUNT,
  AUTH_VERIFICATION_TYPES.SOCIAL,
]);

/**
 * Auth verification status schema
 */
export const authVerificationStatusSchema = z.enum([
  AUTH_VERIFICATION_STATUS.PENDING,
  AUTH_VERIFICATION_STATUS.VERIFIED,
  AUTH_VERIFICATION_STATUS.FAILED,
  AUTH_VERIFICATION_STATUS.EXPIRED,
  AUTH_VERIFICATION_STATUS.CANCELLED,
  AUTH_VERIFICATION_STATUS.IN_PROGRESS,
  AUTH_VERIFICATION_STATUS.REQUIRES_REVIEW,
  AUTH_VERIFICATION_STATUS.SKIPPED,
]);

/**
 * Auth verification method schema
 */
export const authVerificationMethodSchema = z.enum([
  AUTH_VERIFICATION_METHODS.SMS_OTP,
  AUTH_VERIFICATION_METHODS.EMAIL_OTP,
  AUTH_VERIFICATION_METHODS.MAGIC_LINK,
  AUTH_VERIFICATION_METHODS.QR_CODE,
  AUTH_VERIFICATION_METHODS.BIOMETRIC,
  AUTH_VERIFICATION_METHODS.DOCUMENT_UPLOAD,
  AUTH_VERIFICATION_METHODS.THIRD_PARTY,
  AUTH_VERIFICATION_METHODS.MANUAL,
  AUTH_VERIFICATION_METHODS.SELFIE,
  AUTH_VERIFICATION_METHODS.VIDEO,
]);

/**
 * Auth document type schema
 */
export const authDocumentTypeSchema = z.enum([
  AUTH_DOCUMENT_TYPES.NATIONAL_ID,
  AUTH_DOCUMENT_TYPES.PASSPORT,
  AUTH_DOCUMENT_TYPES.DRIVERS_LICENSE,
  AUTH_DOCUMENT_TYPES.VOTER_ID,
  AUTH_DOCUMENT_TYPES.BIRTH_CERTIFICATE,
  AUTH_DOCUMENT_TYPES.UTILITY_BILL,
  AUTH_DOCUMENT_TYPES.BANK_STATEMENT,
  AUTH_DOCUMENT_TYPES.TAX_ID,
  AUTH_DOCUMENT_TYPES.BUSINESS_REGISTRATION,
  AUTH_DOCUMENT_TYPES.TRADE_LICENSE,
  AUTH_DOCUMENT_TYPES.TIN_CERTIFICATE,
]);

/**
 * Auth document status schema
 */
export const authDocumentStatusSchema = z.enum([
  AUTH_DOCUMENT_STATUS.UPLOADED,
  AUTH_DOCUMENT_STATUS.PROCESSING,
  AUTH_DOCUMENT_STATUS.VERIFIED,
  AUTH_DOCUMENT_STATUS.REJECTED,
  AUTH_DOCUMENT_STATUS.EXPIRED,
  AUTH_DOCUMENT_STATUS.REQUIRES_REVIEW,
]);

// ============================================================
// AUTH VERIFICATION REQUEST SCHEMAS
// ============================================================

/**
 * Auth verification request schema
 */
export const authVerificationRequestSchema = z.object({
  userId: idSchema,
  type: authVerificationTypeSchema,
  method: authVerificationMethodSchema,
  target: z.string().min(1),
  data: jsonObjectSchema.optional(),
  resend: z.boolean().optional(),
});

/**
 * Auth verify code request schema
 */
export const authVerifyCodeRequestSchema = z.object({
  userId: idSchema,
  type: authVerificationTypeSchema,
  code: z.string().min(1),
  sessionId: idSchema.optional(),
});

/**
 * Auth verify document request schema
 */
export const authVerifyDocumentRequestSchema = z.object({
  userId: idSchema,
  documentType: authDocumentTypeSchema,
  document: z.union([z.string(), z.instanceof(File)]),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// AUTH VERIFICATION RECORD SCHEMA
// ============================================================

/**
 * Auth verification record schema
 */
export const authVerificationRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  type: authVerificationTypeSchema,
  method: authVerificationMethodSchema,
  status: authVerificationStatusSchema,
  target: z.string().min(1),
  codeHash: z.string().optional(),
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().min(1).default(AUTH_VERIFICATION_CONFIG.MAX_ATTEMPTS),
  initiatedAt: timestampSchema,
  completedAt: timestampSchema.optional(),
  expiresAt: timestampSchema,
  lastAttemptAt: timestampSchema.optional(),
  data: jsonObjectSchema.optional(),
  isActive: z.boolean().default(true),
});

// ============================================================
// AUTH DOCUMENT VERIFICATION SCHEMA
// ============================================================

/**
 * Auth document verification schema
 */
export const authDocumentVerificationSchema = z.object({
  id: idSchema,
  userId: idSchema,
  documentType: authDocumentTypeSchema,
  status: authDocumentStatusSchema,
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
// AUTH VERIFICATION RESPONSE SCHEMA
// ============================================================

/**
 * Auth verification response schema
 */
export const authVerificationResponseSchema = z.object({
  success: z.boolean(),
  status: authVerificationStatusSchema,
  record: authVerificationRecordSchema.optional(),
  sessionId: idSchema.optional(),
  requiresAction: z.boolean().optional(),
  requiredAction: z.string().optional(),
  error: z.string().optional(),
  remainingAttempts: z.number().int().min(0).optional(),
  resendCooldown: z.number().int().min(0).optional(),
});

// ============================================================
// AUTH VERIFICATION FILTER SCHEMAS
// ============================================================

/**
 * Auth verification filter schema
 */
export const authVerificationFilterSchema = z.object({
  userId: idSchema.optional(),
  type: z.union([authVerificationTypeSchema, z.array(authVerificationTypeSchema)]).optional(),
  method: z.union([authVerificationMethodSchema, z.array(authVerificationMethodSchema)]).optional(),
  status: z.union([authVerificationStatusSchema, z.array(authVerificationStatusSchema)]).optional(),
  target: z.string().optional(),
  activeOnly: z.boolean().optional(),
  initiatedDateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
});

/**
 * Auth document filter schema
 */
export const authDocumentFilterSchema = z.object({
  userId: idSchema.optional(),
  documentType: z.union([authDocumentTypeSchema, z.array(authDocumentTypeSchema)]).optional(),
  status: z.union([authDocumentStatusSchema, z.array(authDocumentStatusSchema)]).optional(),
  uploadedDateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
});

// ============================================================
// AUTH VERIFICATION SUMMARY SCHEMA
// ============================================================

/**
 * Auth verification summary schema
 */
export const authVerificationSummarySchema = z.object({
  userId: idSchema,
  totalVerifications: z.number().int().min(0),
  verifiedItems: z.object({
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    identity: z.boolean().optional(),
    address: z.boolean().optional(),
    age: z.boolean().optional(),
    business: z.boolean().optional(),
  }),
  pendingVerifications: z.array(authVerificationRecordSchema),
  completedVerifications: z.array(authVerificationRecordSchema),
  documentVerifications: z.array(authDocumentVerificationSchema),
});

// ============================================================
// AUTH VERIFICATION CONFIG SCHEMA
// ============================================================

/**
 * Auth verification config schema
 */
export const authVerificationConfigSchema = z.object({
  otpLength: z.number().int().positive().default(AUTH_VERIFICATION_CONFIG.OTP_LENGTH),
  otpExpiry: z.number().int().positive().default(AUTH_VERIFICATION_CONFIG.OTP_EXPIRY),
  magicLinkExpiry: z.number().int().positive().default(AUTH_VERIFICATION_CONFIG.MAGIC_LINK_EXPIRY),
  tokenExpiry: z.number().int().positive().default(AUTH_VERIFICATION_CONFIG.TOKEN_EXPIRY),
  maxAttempts: z.number().int().positive().default(AUTH_VERIFICATION_CONFIG.MAX_ATTEMPTS),
  resendCooldown: z.number().int().positive().default(AUTH_VERIFICATION_CONFIG.RESEND_COOLDOWN),
  timeout: z.number().int().positive().default(AUTH_VERIFICATION_CONFIG.TIMEOUT),
  maxDocuments: z.number().int().positive().default(AUTH_VERIFICATION_CONFIG.MAX_DOCUMENTS),
  maxFileSize: z.number().int().positive().default(AUTH_VERIFICATION_CONFIG.MAX_FILE_SIZE),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthVerificationRequest = z.infer<typeof authVerificationRequestSchema>;
export type AuthVerifyCodeRequest = z.infer<typeof authVerifyCodeRequestSchema>;
export type AuthVerifyDocumentRequest = z.infer<typeof authVerifyDocumentRequestSchema>;
export type AuthVerificationRecord = z.infer<typeof authVerificationRecordSchema>;
export type AuthDocumentVerification = z.infer<typeof authDocumentVerificationSchema>;
export type AuthVerificationResponse = z.infer<typeof authVerificationResponseSchema>;
export type AuthVerificationFilter = z.infer<typeof authVerificationFilterSchema>;
export type AuthDocumentFilter = z.infer<typeof authDocumentFilterSchema>;
export type AuthVerificationSummary = z.infer<typeof authVerificationSummarySchema>;
export type AuthVerificationConfig = z.infer<typeof authVerificationConfigSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if verification type is valid
 */
export function isValidAuthVerificationType(type: string): type is AuthVerificationType {
  return Object.values(AUTH_VERIFICATION_TYPES).includes(type as AuthVerificationType);
}

/**
 * Check if verification status is valid
 */
export function isValidAuthVerificationStatus(status: string): status is AuthVerificationStatus {
  return Object.values(AUTH_VERIFICATION_STATUS).includes(status as AuthVerificationStatus);
}

/**
 * Check if verification method is valid
 */
export function isValidAuthVerificationMethod(method: string): method is AuthVerificationMethod {
  return Object.values(AUTH_VERIFICATION_METHODS).includes(method as AuthVerificationMethod);
}

/**
 * Check if document type is valid
 */
export function isValidAuthDocumentType(type: string): type is AuthDocumentType {
  return Object.values(AUTH_DOCUMENT_TYPES).includes(type as AuthDocumentType);
}

/**
 * Check if document status is valid
 */
export function isValidAuthDocumentStatus(status: string): status is AuthDocumentStatus {
  return Object.values(AUTH_DOCUMENT_STATUS).includes(status as AuthDocumentStatus);
}

/**
 * Check if verification status is final
 */
export function isAuthVerificationFinal(status: AuthVerificationStatus): boolean {
  return FINAL_AUTH_VERIFICATION_STATUSES.includes(status);
}

/**
 * Check if verification is successful
 */
export function isAuthVerificationSuccessful(status: AuthVerificationStatus): boolean {
  return SUCCESSFUL_AUTH_VERIFICATION_STATUSES.includes(status);
}

/**
 * Check if verification is pending
 */
export function isAuthVerificationPending(status: AuthVerificationStatus): boolean {
  return PENDING_AUTH_VERIFICATION_STATUSES.includes(status);
}

/**
 * Get verification status message
 */
export function getAuthVerificationStatusMessage(status: AuthVerificationStatus): string {
  return AUTH_VERIFICATION_STATUS_MESSAGES[status] || 'Unknown verification status';
}

/**
 * Check if verification has expired
 */
export function isAuthVerificationExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * Check if verification attempt limit is reached
 */
export function isAuthVerificationAttemptsExceeded(
  attempts: number,
  maxAttempts: number = AUTH_VERIFICATION_CONFIG.MAX_ATTEMPTS
): boolean {
  return attempts >= maxAttempts;
}

/**
 * Check if resend is allowed
 */
export function isAuthVerificationResendAllowed(
  lastAttemptAt: Date,
  cooldownSeconds: number = AUTH_VERIFICATION_CONFIG.RESEND_COOLDOWN
): boolean {
  const now = Date.now();
  const elapsed = (now - lastAttemptAt.getTime()) / 1000;
  return elapsed >= cooldownSeconds;
}

/**
 * Get remaining resend cooldown in seconds
 */
export function getAuthVerificationResendCooldown(
  lastAttemptAt: Date,
  cooldownSeconds: number = AUTH_VERIFICATION_CONFIG.RESEND_COOLDOWN
): number {
  const now = Date.now();
  const elapsed = (now - lastAttemptAt.getTime()) / 1000;
  const remaining = cooldownSeconds - elapsed;
  return Math.max(0, Math.ceil(remaining));
}

/**
 * Get verification type label
 */
export function getAuthVerificationTypeLabel(type: AuthVerificationType): string {
  const labels: Record<AuthVerificationType, string> = {
    email: 'Email Verification',
    phone: 'Phone Verification',
    identity: 'Identity Verification',
    address: 'Address Verification',
    device: 'Device Verification',
    document: 'Document Verification',
    two_fa: 'Two-Factor Authentication',
    age: 'Age Verification',
    business: 'Business Verification',
    tax_id: 'Tax ID Verification',
    bank_account: 'Bank Account Verification',
    social: 'Social Media Verification',
  };
  return labels[type] || 'Unknown Type';
}

/**
 * Get verification method label
 */
export function getAuthVerificationMethodLabel(method: AuthVerificationMethod): string {
  const labels: Record<AuthVerificationMethod, string> = {
    sms_otp: 'SMS OTP',
    email_otp: 'Email OTP',
    magic_link: 'Magic Link',
    qr_code: 'QR Code',
    biometric: 'Biometric',
    document_upload: 'Document Upload',
    third_party: 'Third-Party Service',
    manual: 'Manual Review',
    selfie: 'Selfie Verification',
    video: 'Video Verification',
  };
  return labels[method] || 'Unknown Method';
}

/**
 * Get document type label
 */
export function getAuthDocumentTypeLabel(type: AuthDocumentType): string {
  const labels: Record<AuthDocumentType, string> = {
    national_id: 'National ID',
    passport: 'Passport',
    drivers_license: "Driver's License",
    voter_id: 'Voter ID',
    birth_certificate: 'Birth Certificate',
    utility_bill: 'Utility Bill',
    bank_statement: 'Bank Statement',
    tax_id: 'Tax ID',
    business_registration: 'Business Registration',
    trade_license: 'Trade License',
    tin_certificate: 'TIN Certificate',
  };
  return labels[type] || 'Unknown Document Type';
}

/**
 * Get document status label
 */
export function getAuthDocumentStatusLabel(status: AuthDocumentStatus): string {
  const labels: Record<AuthDocumentStatus, string> = {
    uploaded: 'Uploaded',
    processing: 'Processing',
    verified: 'Verified',
    rejected: 'Rejected',
    expired: 'Expired',
    requires_review: 'Requires Review',
  };
  return labels[status] || 'Unknown Status';
}

/**
 * Check if email is allowed for verification
 */
export function isAuthEmailAllowedForVerification(email: string): boolean {
  const domain = email.split('@')[1];
  const blockedDomains = AUTH_VERIFICATION_RULES.EMAIL.blockedDomains;
  return !blockedDomains.includes(domain);
}

/**
 * Check if phone is allowed for verification
 */
export function isAuthPhoneAllowedForVerification(phone: string): boolean {
  const pattern = AUTH_VERIFICATION_RULES.PHONE.pattern;
  return pattern.test(phone);
}

/**
 * Get default verification config
 */
export function getAuthDefaultVerificationConfig(): AuthVerificationConfig {
  return {
    otpLength: AUTH_VERIFICATION_CONFIG.OTP_LENGTH,
    otpExpiry: AUTH_VERIFICATION_CONFIG.OTP_EXPIRY,
    magicLinkExpiry: AUTH_VERIFICATION_CONFIG.MAGIC_LINK_EXPIRY,
    tokenExpiry: AUTH_VERIFICATION_CONFIG.TOKEN_EXPIRY,
    maxAttempts: AUTH_VERIFICATION_CONFIG.MAX_ATTEMPTS,
    resendCooldown: AUTH_VERIFICATION_CONFIG.RESEND_COOLDOWN,
    timeout: AUTH_VERIFICATION_CONFIG.TIMEOUT,
    maxDocuments: AUTH_VERIFICATION_CONFIG.MAX_DOCUMENTS,
    maxFileSize: AUTH_VERIFICATION_CONFIG.MAX_FILE_SIZE,
  };
}

/**
 * Get allowed document types
 */
export function getAuthAllowedDocumentTypes(): AuthDocumentType[] {
  return Object.values(AUTH_DOCUMENT_TYPES);
}

/**
 * Check if document is accepted
 */
export function isAuthDocumentAccepted(status: AuthDocumentStatus): boolean {
  return status === AUTH_DOCUMENT_STATUS.VERIFIED;
}
